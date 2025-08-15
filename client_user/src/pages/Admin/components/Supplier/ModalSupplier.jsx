import { Form, Input, InputNumber, Modal, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSupplier, selectedSupplier, updateSupplier } from '../../redux/supplier/supplierSclice'
import axios from 'axios'
import { openNotification } from '../../../../assets/hooks/notification'

function ModalSupplier({ visible, onClose }) {
    const [form] = Form.useForm()
    const supplier = useSelector(state => state.suppliers.selectedSupplier)
    const dispatch = useDispatch()

    useEffect(() => {
        if (supplier._id) {
            form.setFieldsValue(supplier)
        } else {
            form.resetFields()
        }
    }, [supplier, form])

    const handleSubmit = async () => {
        const validate = await form.validateFields()
        if (!validate) return
        const values = await form.getFieldsValue()
        if (supplier._id) {
            axios.put(`http://localhost:3000/supplier/update-suppler/${supplier._id}`, values)
                .then(res => res.data)
                .then(data => {
                    const supplierUpdate = data.supplier
                    dispatch(updateSupplier({id:supplier._id,supplier:supplierUpdate}))
                    onClose()
                    openNotification(true, "Cập nhật nhà cung cấp thành công!", "")

                })
                .catch(err => {
                    openNotification(false, "Không cập nhật nhà cung cấp thành công!", "")
                })
        } else {
            axios.post("http://localhost:3000/supplier/create-supplier", values)
                .then(res => res.data)
                .then(data => {
                    const supplier = data.supplier
                    dispatch(addSupplier(supplier))
                    onClose()
                    openNotification(True, "Thêm nhà cung cấp thành công !", "")
                })
                .catch(err => {
                    openNotification(false, "Không thêm nhà cung cấp thành công !", "")
                })
        }
    }

    return (
        <Modal
            title={(<Typography className='text-center font-bold text-[20px]'>{supplier._id ? "Cập nhật nhà cung cấp" : "Thêm nhà cung cấp"}</Typography>)}
            open={visible}
            onCancel={() => {
                onClose()
                dispatch(selectedSupplier({}))
            }}
            okText={(supplier._id ? "Cập nhật" : "Thêm")}
            cancelText="Hủy"
            onOk={handleSubmit}
        >
            <Form
                form={form}
                layout='vertical'
            >
                <Form.Item
                    name={"companyName"}
                    label="Tên công  ty"
                    rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}

                >
                    <Input placeholder='Nhập tên công ty '></Input>
                </Form.Item>
                <Form.Item
                    name={"email"}
                    label="Nhập email"
                    rules={[{ required: true, message: 'Vui lòng nhập tên email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}

                >
                    <Input itemType='email' placeholder='Nhập email  '></Input>
                </Form.Item>
                <Form.Item
                    name={"numberphone"}
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập tên số điện thoại!' }]}

                >
                    <InputNumber style={{ width: "100%" }} maxLength={10} placeholder='Nhập số điện thoại'></InputNumber>
                </Form.Item>

                <Form.Item
                    name={"address"}
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}

                >
                    <Input placeholder='Nhập địa chỉ '></Input>
                </Form.Item>
                <Form.Item
                    name={"description"}
                    label="Mô tả"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}

                >
                    <Input.TextArea placeholder='Nhập mô tả '></Input.TextArea>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalSupplier