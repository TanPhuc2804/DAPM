import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVoucher, selectVoucher, updateVoucher } from '../../redux/Voucher/voucherSlice'
import axios from 'axios'
import { openNotification } from '../../../../assets/hooks/notification'

function ModalVoucher({ visible, onClose }) {
    const [form] = Form.useForm()
    const voucher = useSelector(state => state.voucher.selectVoucher)
    const dispatch = useDispatch()

    useEffect(() => {
        if (voucher._id) {
            form.setFieldsValue({
                ...voucher,
                expiryDate: dayjs(voucher.expiryDate)
            })
        } else {
            form.resetFields()
        }
    }, [form, voucher])

    const handleSubmit = async () => {
        const validate = await form.validateFields()
        if (!validate) return
        const values = await form.getFieldsValue()
        if (voucher._id) {
            axios.put(`http://localhost:3000/Voucher/upt-voucher/${voucher._id}`, values)
                .then(res => res.data)
                .then(data => {
                    dispatch(updateVoucher({ id: voucher._id, voucher: data.voucher }))
                    openNotification(true, "Cập nhật thành công voucher", "")
                    onClose()
                })
                .catch(err => {
                    console.log(err)
                    openNotification(false, "Không cập nhật thành công voucher", err.response?.data?.error ?? "")
                })
        } else {
            axios.post("http://localhost:3000/Voucher/create-voucher/", values)
                .then(res => res.data)
                .then(data => {
                    dispatch(addVoucher(data.voucher))
                    openNotification(true, "Tạo thành công voucher", "")
                    onClose()
                })
                .catch(err => {
                    console.log(err)
                    openNotification(false, "Không tạo thành công voucher", err.response?.data?.message ?? "")
                })
        }
    }

    return (
        <Modal
            title={(<Typography className='text-center font-bold text-[20px]'>{voucher._id ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá"}</Typography>)}
            open={visible}
            onCancel={() => {
                onClose()
                dispatch(selectVoucher({}))
            }}
            okText={(voucher._id ? "Cập nhật" : "Thêm")}
            onOk={handleSubmit}
        >
            <Form
                form={form}
                layout='vertical'
            >
                <Form.Item
                    name={"nameVoucher"}
                    label="Tên mã giảm giá"
                    rules={[{ required: true, message: 'Vui lòng nhập tên mã giảm giá!' }]}

                >
                    <Input style={{ width: '100%' }} placeholder='Nhập tên mã giảm giá '></Input>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name={"discount"}
                            label="Nhập discount"
                            rules={[{ required: true, message: 'Vui lòng nhập discount!' }]}
                        >
                            <InputNumber style={{ width: '100%' }} placeholder='Nhập discount ' max={60}></InputNumber>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name={"quantity"}
                            label="Số lượng"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}

                        >
                            <InputNumber style={{ width: '100%' }} placeholder='Nhập số lượng'></InputNumber>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name={"expiryDate"}
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Vui lòng chọn hạn giảm giá!' }]}

                >
                    <DatePicker
                        style={{ width: '100%' }}
                        placeholder='Chọn hạn giảm giá '
                        format={"DD-MM-YYYY"}
                        disabledDate={(current) => {
                            return current && current < dayjs().endOf('day');
                        }}
                    ></DatePicker>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default ModalVoucher