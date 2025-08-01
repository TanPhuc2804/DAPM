import React, { useState } from 'react';
import axios from 'axios';
import { openNotification } from '../../../../assets/hooks/notification';
import { Modal, Input, Form, Button } from 'antd';
const ChangePasswordForm = ({ Id }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      openNotification(false, "Thay đổi mật khẩu thất bại", "Mật khẩu mới và mật khẩu xác nhận không khớp ")
      return;
    }

    const otpResponse = await axios.get("http://localhost:3000/auth/send-otp")
    if (otpResponse.data.status) {
      setVisible(true)

    }

  };

  const onFinish = (values) => {
    const { otp } = values

    axios.post("http://localhost:3000/auth/verify-otp", { inputOTP: otp })
      .then(res => res.data)
      .then(data => {
        if (data.status) {
          setVisible(false)
          axios.post(
            `http://localhost:3000/customer/change-password`,
            { oldPassword: currentPassword, newPassword: newPassword }
          )
            .then(res => {
              openNotification(true, "Thay đổi mật khẩu thành công", "")
            })
            .catch(err => {
              openNotification(false, "Thay đổi mật khẩu thất bại", err.response?.data.message ?? "")
            })
        }
      })
      .catch(err => {
        openNotification(false, "Xác thực OTP th", err.response?.data.message ?? "")
      })
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center pb-6 max-w-full bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="px-6 py-5 text-3xl font-semibold leading-none uppercase text-zinc-900 border-b border-gray-200">
          Thay đổi mật khẩu
        </h2>
        <div className="flex flex-col p-6">
          <div className="flex flex-col mb-4">
            <label htmlFor="current-password" className="text-lg font-medium text-zinc-900">
              Mật khẩu hiện tại
            </label>
            <div className="flex items-center mt-2 bg-gray-50 rounded border border-gray-300">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border-none rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập mật khẩu hiện tại"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="focus:outline-none bg-white"
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1c244e18483f0d82bcd4076c4971e59a6da9904f719d2b2aa3f7cd20a217e29?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
                  alt="Toggle visibility"
                  className="object-contain w-5 h-5"
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="new-password" className="text-lg font-medium text-zinc-900">
              Mật khẩu mới
            </label>
            <div className="flex items-center mt-2 bg-gray-50 rounded border border-gray-300">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border-none rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập mật khẩu mới"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="focus:outline-none bg-white"
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1c244e18483f0d82bcd4076c4971e59a6da9904f719d2b2aa3f7cd20a217e29?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
                  alt="Toggle visibility"
                  className="object-contain w-5 h-5"
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="confirm-password" className="text-lg font-medium text-zinc-900">
              Xác nhận mật khẩu
            </label>
            <div className="flex items-center mt-2 bg-gray-50 rounded border border-gray-300">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border-none rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Xác nhận mật khẩu mới"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="focus:outline-none bg-white"
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1c244e18483f0d82bcd4076c4971e59a6da9904f719d2b2aa3f7cd20a217e29?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
                  alt="Toggle visibility"
                  className="object-contain w-5 h-5"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-start px-6 pb-6">
          <button
            type="submit"
            className="w-full py-2 text-lg font-bold text-white bg-green-900 rounded hover:bg-green-700 transition duration-300"
          >
            Thay đổi mật khẩu
          </button>
        </div>
      </form>

      <Modal
        okText="Xác thực mã OTP"
        cancelText="Quay lại"
        onOk={() => form.submit()}
        open={visible}
        onClose={() => setVisible(false)}
        title={(<p className='text-[20px]'>Xác thực email</p>)}
      >
        <Form
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Nhập mã OTP"
            name="otp"
          >
            <Input.OTP />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordForm;
