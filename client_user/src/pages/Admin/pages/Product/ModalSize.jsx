import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { openNotification } from '../../../../assets/hooks/notification';
function ModalSize({ visible, close, setSizes, productSizes, idPro }) {
    const [fields, setFields] = useState([]);
    const handleAddField = () => {
        setFields([...fields, { size: '', quantity: '' }]);
    };

    const handleRemoveField = (field, index) => {
        axios.post("http://localhost:3000/products/check-size", { idProduct: idPro, size: field.size })
            .then(res => res.data)
            .then(data => {
                if (data.state) {
                    const newFields = fields.filter((_, i) => i !== index);
                    setFields(newFields);
                }
            })
            .catch(err => {
                openNotification(false,err.response.data.message,"")
            })
        return

    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        // Tạo một bản sao của fields và cập nhật giá trị
        const newFields = fields.map((field, i) => {
            if (i === index) {
                return { ...field, [name]: value }; // Cập nhật thuộc tính
            }
            return field; // Giữ nguyên các trường khác
        });
        setFields(newFields); // Cập nhật trạng thái
    };
    useEffect(() => {
        if (productSizes) {
            setFields(productSizes);
        } else {
            setFields([{ size: '', quantity: '' }]); // Khởi tạo với trường mặc định nếu không có productSizes
        }
    }, [productSizes]);
    return (
        <div>
            <Modal
                title="Thêm size cho sản phẩm"
                open={visible}
                onCancel={close}
                onOk={() => {
                    setSizes(fields)
                    close()
                }}
                okText="Xác nhận "
                cancelText="Trở lại"
            >
                <Form>
                    {fields.map((field, index) => (
                        <Space key={index} align="baseline" style={{ marginBottom: 8 }}>
                            <Form.Item
                                label="Size"
                                rules={[{ required: true, message: 'Please input size!' }]}
                            >
                                <Input
                                    name="size"
                                    value={field.size}
                                    onChange={(event) => handleInputChange(index, event)}
                                    placeholder="Size"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Quantity"
                                rules={[{ required: true, message: 'Please input quantity!' }]}
                            >
                                <Input
                                    name="quantity"
                                    value={field.quantity}
                                    onChange={(event) => handleInputChange(index, event)}
                                    placeholder="Quantity"
                                />
                            </Form.Item>
                            {fields.length > 1 && (
                                <MinusCircleOutlined
                                    onClick={() => handleRemoveField(field, index)}
                                    style={{ color: 'red', marginTop: 8 }}
                                />
                            )}
                        </Space>
                    ))}
                    <Form.Item>
                        <Button className="w-full" type="dashed" onClick={handleAddField} icon={<PlusOutlined />}>
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default ModalSize