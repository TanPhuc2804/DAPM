import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Modal, Typography, Form, Input, Button, Space } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { use } from 'react'
import { openNotification } from '../../../../assets/hooks/notification'
import { useDispatch } from 'react-redux'
import { setCateInProduct } from '../../redux/Product/productSlice'

function ModalCategory({ visible, onClose }) {
    const dispatch = useDispatch()
    const [fields, setFields] = useState([])
    const [isUpdate, setIsUpdate] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/category/get-categorylist ")
            .then(res => res.data)
            .then(data => {
                setFields(data.categories)
                setIsUpdate(data.categories.map((item, index) => (true)))
            })
            .catch(err => console.log(err))
    }, [])

    const handleRemoveField = (index) => {
        const idCate = fields[index]._id
        if (!idCate && isUpdate[index]) {
            openNotification(false, "Không thể xóa danh mục này", "Bị thiếu id")
            return
        }
        if (isUpdate[index]) {
            axios.delete(`http://localhost:3000/category/delete-category/${idCate}`)
                .then(res => res.data)
                .then(data => {
                    if (data.status) {
                        openNotification(true, "Xóa danh mục thành công", "")
                        const newFields = fields.filter((_, i) => i !== index)
                        setFields(newFields)
                        const newIsUpdate = [...isUpdate]
                        newIsUpdate.splice(index, 1)
                        setIsUpdate(newIsUpdate)
                    }
                })
                .catch(err => {
                    openNotification(false, "Không thể xóa danh mục đã có sản phẩm", "")
                })
        } else {
            const newFields = fields.filter((_, i) => i !== index)
            setFields(newFields)
            const newIsUpdate = [...isUpdate]
            newIsUpdate.splice(index, 1)
            setIsUpdate(newIsUpdate)
        }
    }

    const handleAddField = () => {
        setFields([...fields, { name: '' }])
        setIsUpdate([...isUpdate, false])
    }
    const handleAddCategory = (index) => {
        axios.post("http://localhost:3000/category/create-category", { name: fields[index].name })
            .then(res => res.data)
            .then(data => {
                if (data.status) {
                    openNotification(true, "Thêm danh mục thành công", "")
                    const newFields = [...fields]
                    newFields[index] = data.category
                    setFields(newFields)
                    const newIsUpdate = [...isUpdate]
                    newIsUpdate[index] = true
                    setIsUpdate(newIsUpdate)
                }
            }).catch(err => {
                openNotification(false, "Không thể thêm danh mục", err.response?.data?.message ?? "")
            })
    }

    const handleUpdate = (index) => {
        const idCate = fields[index]._id;
        if (!idCate && !isUpdate[index]) {
            openNotification(false, "Không thể cập nhật danh mục này", "Bị thiếu id")
            return
        }
        axios.put(`http://localhost:3000/category/update-category/${idCate}`, { name: fields[index].name })
            .then(res => res.data)
            .then(data => {
                if (data.status) {
                    openNotification(true, "Cập nhật danh mục thành công", "")
                    const newFields = [...fields]
                    newFields[index].name = data.category.name
                    setFields(newFields)
                    dispatch(setCateInProduct({id:idCate,name:data.category.name}))
                }
            }).catch(err => {
                console.log(err)
                openNotification(false, "Không thể cập nhật danh mục", err.response?.data?.message ?? "")
            })
    }

    const handleChange = (index, value) => {
        const newFields = [...fields]
        newFields[index].name = value
        setFields(newFields)
    }

    return (
        <Modal
            title={<Typography style={{ textAlign: "center" }} className='text-lg font-semibold flex items-center justify-center mb-[20px]'>Danh mục sản phẩm</Typography>}
            open={visible}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={() => onClose()}
            width={600}
        >
            {fields.map((category, index) => (
                <Space key={index} align="baseline" className='flex justify-center' style={{ marginBottom: 8 }}>
                    <Form.Item
                        key={index}
                        label={`Danh mục ${index}`}
                    >
                        <Input value={category.name} onChange={(e) => handleChange(index, e.target.value)} />
                    </Form.Item>
                    <Button>
                        <Typography.Text className={isUpdate[index] ? 'text-green-500' : 'text-red-500'} onClick={(e) => { isUpdate[index] ? handleUpdate(index) : handleAddCategory(index) }}>{isUpdate[index] ? 'Update' : 'Thêm sản phẩm'}</Typography.Text>
                    </Button>
                    {fields.length > 1 && (
                        <MinusCircleOutlined
                            onClick={() => handleRemoveField(index)}
                            style={{ color: 'red', marginTop: 8 }}
                        />
                    )}
                </Space>
            ))}
            <Form.Item className='flex justify-center'>
                <Button className="w-[400px] m-auto" type="dashed" onClick={handleAddField} icon={<PlusOutlined />}>
                    Thêm
                </Button>
            </Form.Item>
        </Modal>
    )
}

export default ModalCategory