import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../assets/hooks/auth.context';
import axios from 'axios';
import { openNotification } from "../../../../assets/hooks/notification"
import dayjs from 'dayjs';

const AccountSettings = () => {
  const { auth } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    fullname: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    birthday: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.isAuthenticated) {
        const id = auth.user.id;
        try {
          const response = await axios.get(`http://localhost:3000/customer/list-customer/${id}`);
          let user = response.data.message
          user = {
            ...user,
            phone: user.numberphone
          }
          setUserData(user);
        } catch (error) {
          setError('Error fetching user data. Please try again.');
        }
      }
    };
    fetchUserData();
  }, [auth]);

  function calculateAge(birthDate) {
    const today = dayjs();
    const birth = dayjs(birthDate);

    // Tính tuổi bằng cách lấy năm hiện tại trừ năm sinh
    let age = today.year() - birth.year();

    // Kiểm tra nếu ngày hiện tại trước ngày sinh nhật năm nay thì trừ 1 tuổi
    const birthdayThisYear = birth.set('year', today.year());
    if (today.isBefore(birthdayThisYear)) {
      age--;
    }

    return age;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = auth.user.id;
    const age = calculateAge(userData.birthday)

    if(age <16){
      openNotification(false,"Cập nhật thất bại !","Tuổi phải trên 16")
      return
    }

    try {
      const response = await axios.post(`http://localhost:3000/customer/update/${id}`, userData);
      openNotification(true, "Cập nhật thành công !", "")
    } catch (error) {
      openNotification(false, "Cập nhật thất bại !", error.response?.data.message ?? "")
    }
  };

  return (
    <section className="flex flex-col items-start mb-12 min-h-[615px] max-md:mt-9 max-md:max-w-full">
      <div className="flex overflow-hidden flex-col pb-6 max-w-full bg-white rounded-lg shadow-lg border border-gray-300 w-[984px]">
        <h2 className="px-6 py-6 text-3xl font-medium leading-none uppercase bg-white rounded-t-lg border-b border-gray-200 text-gray-800">
          Cài đặt tài khoản
        </h2>
        {error && <div className="text-red-600 px-6">{error}</div>}
        <form className="flex flex-col mt-6 px-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start">
            {/* Username Input */}
            <div className="mb-4 w-full">
              <label htmlFor="username" className="text-xl leading-none text-gray-800">Tên người dùng</label>
              <input
                type="text"
                id="username"
                name="username"
                value={userData.username || ''}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full text-lg leading-none bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập tên người dùng"
              />
            </div>
            {/* Fullname Input */}
            <div className="mb-4 w-full">
              <label htmlFor="fullname" className="text-xl leading-none text-gray-800">Tên đầy đủ</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={userData.fullname || ''}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full text-lg leading-none bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập tên"
              />
            </div>
            {/* Email Input */}
            <div className="mb-4 w-full">
              <label htmlFor="email" className="text-xl leading-none text-gray-800">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email || ''}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full text-lg leading-none bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập email"
              />
            </div>
            {/* Phone Input */}
            <div className="mb-4 w-full">
              <label htmlFor="phone" className="text-xl leading-none text-gray-800">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userData.phone || ''}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full text-lg leading-none bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="+89"
              />
            </div>
            {/* Gender Input */}
            <div className="mb-4 w-full">
              <label htmlFor="gender" className="text-xl leading-none text-gray-800">Giới tính</label>
              <select
                id="gender"
                name="gender"
                value={userData.gender || ''}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full text-lg leading-none bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            {/* Address Input */}
            <div className="mb-4 w-full">
              <label htmlFor="address" className="text-xl leading-none text-gray-800">Địa chỉ</label>
              <input
                type="text"
                id="address"
                name="address"
                value={userData.address || ''}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full text-lg leading-none bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập địa chỉ"
              />
            </div>
            {/* Birthday Input */}
            <div className="mb-4 w-full">
              <label htmlFor="birthday" className="text-xl leading-none text-gray-800">Ngày sinh</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={userData.birthday ? userData.birthday.substring(0, 10) : ''}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full text-lg leading-none bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-3 text-sm font-bold tracking-normal leading-10 text-white uppercase bg-green-700 rounded-md shadow hover:bg-green-800 transition duration-200"
          >
            Cập nhật
          </button>
        </form>
      </div>
    </section>
  );
};

export default AccountSettings;
