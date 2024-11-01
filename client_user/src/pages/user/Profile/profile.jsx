import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountSettings from './AccountSettings/AccountSettings';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import { AuthContext } from '../../../assets/hooks/auth.context';
import axios from 'axios';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('account');
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout")
      .then(res => res.data)
      .then(data => {
        setAuth({
          isAuthenticated: false,
          user: {
            id: '',
            name: '',
            email: ''
          }
        });
      })
      .catch(err => console.log(err))

    navigate('/');
  };

  return (
    <div className="mt-14 ml-7 w-full max-w-[1539px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <aside className="flex flex-col w-[28%] max-md:ml-0 max-md:w-full">
          <nav className="flex flex-col grow items-start px-14 pt-10 pb-80 mt-4 w-full text-2xl leading-none text-black bg-white max-md:px-5 max-md:pb-24 max-md:mt-10">
            <a href="#" onClick={() => handleSectionChange('account')} className="px-5 py-3 bg-white">Thông tin tài khoản</a>
            <a href="#" onClick={() => handleSectionChange('password')} className="px-5 pt-2.5 pb-1 mt-10 bg-white">Thay đổi mật khẩu</a>
            <a href="#" onClick={handleLogout} className="px-5 pt-2.5 pb-1 mt-10 max-w-full bg-white w-[235px] max-md:pr-5">Đăng xuất</a>
          </nav>
        </aside>

        {activeSection === 'account' && <AccountSettings />}
        {activeSection === 'password' && <ChangePasswordForm />}
      </div>
    </div>
  );
};

export default Profile;
