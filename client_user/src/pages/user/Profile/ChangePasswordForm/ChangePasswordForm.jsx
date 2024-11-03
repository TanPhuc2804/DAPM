import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = ({ Id }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
        alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
        return;
    }

    try {
        console.log("Sending password update:", { password: newPassword }); 
        const response = await axios.post(
            `http://localhost:3000/customer/change-password/${Id}`,
            { password: newPassword }
        );
        console.log("Password updated:", response.data);
        alert("Mật khẩu đã được thay đổi thành công.");
    } catch (error) {
        console.error("Error updating password:", error.response?.data || error.message);
        alert("Có lỗi xảy ra khi thay đổi mật khẩu. Vui lòng thử lại.");
    }
};


  return (
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
              className="focus:outline-none"
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
              className="focus:outline-none"
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
              className="focus:outline-none"
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
  );
};

export default ChangePasswordForm;
