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
      .catch(err => console.log(err));

    navigate('/');
  };

  return (
    <div className="mt-4 mx-auto w-full max-w-[1539px] p-5 md:p-10">
      <div className="flex gap-4 flex-col md:flex-row">
        <aside className="flex flex-col w-full md:w-1/4">
          <nav className="flex flex-col grow items-start p-4 bg-white shadow-md rounded-lg">
            <a href="#" onClick={() => handleSectionChange('account')} className="px-5 py-3 text-lg font-semibold text-black hover:bg-gray-200 transition-colors duration-200">Thông tin tài khoản</a>
            <a href="#" onClick={() => handleSectionChange('password')} className="px-5 py-3 mt-3 text-lg font-semibold text-black hover:bg-gray-200 transition-colors duration-200">Thay đổi mật khẩu</a>
            <a href="#" onClick={handleLogout} className="px-5 py-3 mt-3 text-lg font-semibold text-red-600 hover:bg-gray-200 transition-colors duration-200">Đăng xuất</a>
          </nav>
        </aside>

        <div className="flex-1 mt-4 md:mt-0">
          {activeSection === 'account' && <AccountSettings />}
          {activeSection === 'password' && <ChangePasswordForm />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
