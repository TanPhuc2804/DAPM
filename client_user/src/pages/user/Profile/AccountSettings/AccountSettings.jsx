import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../assets/hooks/auth.context';
import axios from 'axios';

const AccountSettings = () => {
  const { auth } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    username: '',
    fullname: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    birthday: '',
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      setUserInfo({
        username: auth.user.name || '',
        fullname: auth.user.fullname || '',
        email: auth.user.email || '',
        phone: auth.user.numberphone || '',
        gender: auth.user.gender || '',
        address: auth.user.address || '',
        birthday: auth.user.birthday || '',
      });
    }
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const customerId = auth.user.id; 
    console.log("Customer ID:", customerId);
    console.log("User Info:", userInfo);
  
    try {
      const response = await axios.post(`http://localhost:3000/customer/update/${customerId}`, );
      console.log('Cập nhật thành công:', response.data);

    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);

      }
    }
  };

  return (
    <section className="flex flex-col items-start min-h-[615px] max-md:mt-9 max-md:max-w-full">
      <div className="flex overflow-hidden flex-col pb-6 max-w-full bg-white rounded border border-gray-200 border-solid w-[984px]">
        <h2 className="px-6 py-6 text-3xl font-medium leading-none uppercase bg-white rounded border border-gray-200 border-solid text-zinc-900 max-md:px-5 max-md:max-w-full">
          Cài đặt tài khoản
        </h2>
        <form className="flex flex-col mt-9 ml-6 max-w-full w-[777px]" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start min-h-[409px] max-md:max-w-full">
            <div className="flex gap-4 items-start max-w-full w-[360px]">
              <div className="flex flex-col min-w-[240px] w-[360px]">
                <label htmlFor="username" className="text-2xl leading-none text-zinc-900">
                  Tên người dùng
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userInfo.username}
                  onChange={handleChange}
                  className="px-4 py-3 mt-2 w-full text-lg leading-none bg-white rounded-sm border border-gray-200 border-solid text-neutral-600 max-md:pr-5"
                  placeholder="Nhập tên người dùng"
                />
              </div>
            </div>
            <div className="flex flex-col mt-3 max-w-full w-[360px]">
              <div className="flex flex-col w-full">
                <label htmlFor="fullname" className="text-2xl leading-none text-zinc-900">
                  Tên đầy đủ
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={userInfo.fullname}
                  onChange={handleChange}
                  className="px-4 py-3 mt-2 w-full text-lg leading-none bg-white rounded-sm border border-gray-200 border-solid text-neutral-600 max-md:pr-5"
                  placeholder="Nhập tên"
                />
              </div>
              <div className="flex flex-col mt-4 w-full">
                <label htmlFor="email" className="text-2xl leading-none text-zinc-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  className="px-4 py-3 mt-2 w-full text-lg leading-none bg-white rounded-sm border border-gray-200 border-solid text-neutral-600 max-md:pr-5"
                  placeholder="Nhập email"
                />
              </div>
            </div>
            <div className="flex gap-4 items-start mt-3 max-w-full w-[360px]">
              <div className="flex flex-col min-w-[240px] w-[360px]">
                <label htmlFor="phone" className="text-2xl leading-none text-zinc-900">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                  className="px-4 py-3 mt-2 w-full text-lg leading-none whitespace-nowrap bg-white rounded-sm border border-gray-200 border-solid text-neutral-600 max-md:pr-5"
                  placeholder="+89"
                />
              </div>
            </div>
            <div className="flex gap-4 items-start mt-3 max-w-full w-[360px]">
              <div className="flex flex-col min-w-[240px] w-[360px]">
                <label htmlFor="gender" className="text-2xl leading-none text-zinc-900">
                  Giới tính
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={userInfo.gender}
                  onChange={handleChange}
                  className="px-4 py-3 mt-2 w-full text-lg leading-none bg-white rounded-sm border border-gray-200 border-solid text-neutral-600 max-md:pr-5"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 items-start mt-3 max-w-full w-[360px]">
              <div className="flex flex-col min-w-[240px] w-[360px]">
                <label htmlFor="address" className="text-2xl leading-none text-zinc-900">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userInfo.address}
                  onChange={handleChange}
                  className="px-4 py-3 mt-2 w-full text-lg leading-none bg-white rounded-sm border border-gray-200 border-solid text-neutral-600 max-md:pr-5"
                  placeholder="Nhập địa chỉ"
                />
              </div>
            </div>
            <div className="flex gap-4 items-start mt-3 max-w-full w-[360px]">
              <div className="flex flex-col min-w-[240px] w-[360px]">
                <label htmlFor="birthday" className="text-2xl leading-none text-zinc-900">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={userInfo.birthday.substring(0, 10)} 
                  onChange={handleChange}
                  className="px-4 py-3 mt-2 w-full text-lg leading-none bg-white rounded-sm border border-gray-200 border-solid text-neutral-600 max-md:pr-5"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="gap-2 self-start px-6 mt-4 text-sm font-bold tracking-normal leading-10 text-white uppercase bg-green-900 rounded-sm min-h-[67px] max-md:px-5 max-md:ml-2">
            Cập nhật
          </button>
        </form>
      </div>
    </section>
  );
};

export default AccountSettings;
