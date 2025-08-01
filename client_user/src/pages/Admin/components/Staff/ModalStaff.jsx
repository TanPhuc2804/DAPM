import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStaff, selectStaff, updateStaffs } from '../../redux/staff/staff'
import dayjs from 'dayjs'
import { openNotification } from '../../../../assets/hooks/notification'
import axios from 'axios'

function ModalStaff({ visble, onClose }) {
    const dispatch = useDispatch()
    const staff = useSelector(state => state.staffs.selectedStaff)
    const [form] = Form.useForm()

    const options = [
        {
            value: "Nam",
            label: "Nam"
        },
        {
            value: "Nữ",
            label: "Nữ"
        }
    ]

    useEffect(() => {
        if (staff._id) {
            form.setFieldsValue({
                ...staff,
                birthday: dayjs(staff.birthday),
                ngaylamviec: dayjs(staff.ngaylamvien)
            })
        } else {
            form.resetFields()
        }
    }, [staff, form])

    const handleSubmit = async () => {
        const validate = await form.validateFields()
        if (!validate) return
        const dataInput = form.getFieldsValue()
        const value = {
            ...dataInput,
            role: "66f8e28b66c55d58fcc3c03f",
            password: "admin123",
            ngaylamviec: dayjs()
        }
        if (staff._id) {
            axios.put(`http://localhost:3000/staff/upt-staff/${staff._id}`, value)
                .then(res => res.data)
                .then(data => {
                    const staff = data.staff
                    dispatch(updateStaffs({ id: staff._id, staff: staff }))

                    openNotification(true, "Cập nhật thành công", "")
                    onClose()
                    dispatch(selectStaff({}))
                })
                .catch(err => {
                    openNotification(false, "Không cập nhật được", err.response?.data?.message ?? "Lỗi hệ thống")
                })
            return
        }
        axios.post("http://localhost:3000/staff/create-staff/", value)
            .then(res => res.data)
            .then(data => {
                const staff = data.staff
                dispatch(addStaff({ staff }))
                onClose()
                dispatch(selectStaff({}))
                openNotification(true, "Tạo nhân viên thành công", "")
            })
            .catch(err => {
                console.log(err)
                openNotification(false, "Không tạo được nhân viên", err.response?.data?.message ?? "Lỗi hệ thống")
            })

    }

    return (
        <Modal
            open={visble}
            onCancel={() => {
                onClose()
                dispatch(selectStaff({}))
            }}
            onOk={handleSubmit}
            title={(<Typography className='text-center font-bold text-[20px]'>{staff._id ? "Cập nhật nhân viên" : "Thêm nhân viên"}</Typography>)}
            okText={staff._id ? "Cập nhật" : "Thêm"}
            cancelText="Hủy"
        >
            <Form

                form={form}
                layout='vertical'
            >
                <Form.Item
                    name={"fullname"}
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}

                >
                    <Input placeholder='Nhập họ và tên '></Input>
                </Form.Item>
                <Form.Item
                    name={"email"}
                    label="Nhập email"
                    rules={[{ required: true, message: 'Vui lòng nhập tên email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}

                >
                    <Input itemType='email' placeholder='Nhập họ và tên '></Input>
                </Form.Item>
                <Form.Item
                    name={"username"}
                    label="Username"
                    rules={[{ required: true, message: 'Vui lòng nhập username!' }]}

                >
                    <Input placeholder='Nhập họ và tên '></Input>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item

                            name={"cccd"}
                            label="Căn cước công dân"
                            rules={[{ required: true, message: 'Vui lòng nhập căn cước công dân!' }]}

                        >
                            <InputNumber style={{ width: "100%" }} placeholder='Nhập căn cước công dân ' maxLength={12}></InputNumber>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"birthday"}
                            label="Ngày sinh"
                            rules={[
                                { required: true, message: 'Vui lòng nhập tên ngày sinh!' },
                                {
                                    validator: (_, value) => {
                                        if (!value) return Promise.resolve();
                                        const age = dayjs().diff(value, 'year');
                                        return age >= 16
                                            ? Promise.resolve()
                                            : Promise.reject(new Error('Người dùng phải đủ 16 tuổi!'));
                                    }
                                }
                            ]}

                        >
                            <DatePicker style={{ width: "100%" }} placeholder='Chọn ngày sinh nhật' />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name={"gender"}
                            label="Giới tính"
                            rules={[{ required: true, message: 'Vui lòng nhập giới tính!' }]}

                        >
                            <Select placeholder="Chọn giới tính" options={options}></Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"numberphone"}
                            label="Số điện thoại"
                            rules={[{ required: true, message: 'Vui lòng nhập tên số điện thoại!' }]}

                        >
                            <InputNumber style={{ width: "100%" }} maxLength={10} placeholder='Nhập số điện thoại'></InputNumber>
                        </Form.Item>
                    </Col>

                </Row>

                <Form.Item
                    name={"address"}
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}

                >
                    <Input placeholder='Nhập địa chỉ '></Input>
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default ModalStaff