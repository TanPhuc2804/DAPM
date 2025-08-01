import { Form, Input, Modal, Row, Typography, Col, Button, Select, Image, Upload } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, resetProduct, setProduct ,updateProduct} from '../../redux/Product/productSlice'
import ModalSize from '../../pages/Product/ModalSize'
import { useState } from 'react'
import { useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import CloudinaryImageUpload from '../Upload/UploadImage'
import axios from 'axios'
import { openNotification } from '../../../../assets/hooks/notification'

function ModelFormProduct({ visible, onClose, supliers, categories }) {
    const [visibleSize, setVisibleSize] = useState(false)
    const product = useSelector(state => state.product.selectProduct)
    const [productSizes, setSizes] = useState(product?.productSizes ?? [])
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    useEffect(() => {
        // If product exists, set form values
        if (product._id) {
            form.setFieldsValue({
                ...product,
                category: product.category?._id ?? "1",
                supplier: product.supplier?._id ?? "1",
            })
            setSizes(product.productSizes ?? [])
        } else {
            setSizes([])
            form.resetFields()
        }

    }, [product, form]) 
    const handleSubmit = async () => {
        const validate = await form.validateFields()
        if (!validate) return
        if(productSizes.length < 0) {
            openNotification(false, "Vui lòng thêm kích thước cho sản phẩm", "")
            return
        }

        const formValues = form.getFieldsValue()
        const productData = {
            ...formValues,
            productSizes: productSizes,
        }
        // Update product
        if (product._id) {
            axios.post(`http://localhost:3000/products/update-product/${product._id}`, productData)
                .then(res => res.data)
                .then(data => {
                    const dataProduct = data.product
                    dispatch(updateProduct(dataProduct))
                    openNotification(true, data.message, "")
                    onClose()
                })
                .catch(err => {
                    console.log(err)
                    openNotification(false, err.response?.data?.message ?? "Không cập nhật được sản phẩm", "")
                })

            return
        }
        //Create new product
        axios.post("http://localhost:3000/products/create-product", productData)
            .then(res => res.data)
            .then(data => {
                const dataProduct = data.product
                dispatch(addProduct(dataProduct))
                openNotification(true, data.message, "")
                onClose()
            })
            .catch(err => {
                console.log(err)
                openNotification(false, err.response?.data?.message ?? "Không tạo được sản phẩm", "")
            })
    }


    return (
        <>
            <Modal
                open={visible}
                onCancel={() => {
                    onClose()
                    dispatch(resetProduct())
                }}
                okText="Lưu sản phẩm"
                cancelText="Hủy"
                onOk={handleSubmit}
                title={(<Typography.Title style={{ textAlign: 'center' }} level={3}>{product._id ? "Cập nhật" : "Thêm"} sản phẩm</Typography.Title>)}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Tên sản phẩm"
                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                    >
                        <Input placeholder='Nhập tên sản phẩm' />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Giá sản phẩm"
                                rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                            >
                                <Input type="number" min={10000} placeholder='Nhập giá sản phẩm' />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="size"
                                label="Kích thước"
                            // rules={[{ required: true, message: 'Vui lòng nhập kích thước sản phẩm!' }]}
                            >
                                <Button onClick={() => setVisibleSize(true)} block>
                                    Thêm size
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Mô tả sản phẩm" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label="Danh mục"
                                rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm!' }]}
                            >
                                <Select
                                    placeholder="Chọn danh mục"
                                    options={categories}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="supplier"
                                label="Nhà cung cấp"
                                rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
                            >
                                <Select
                                    placeholder="Chọn nhà cung cấp"
                                    options={supliers}

                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="image"
                        label="Hình ảnh sản phẩm"
                        rules={[{ required: true, message: 'Vui lòng tải lên hình ảnh sản phẩm!' }]}
                    >
                        <CloudinaryImageUpload max={3} imgsUrl={product.image} />
                    </Form.Item>
                </Form>

            </Modal>

            <ModalSize visible={visibleSize} close={() => setVisibleSize(false)} setSizes={setSizes} productSizes={productSizes} idPro={product._id} />
        </>
    )
}

export default ModelFormProduct