import React, { useState } from 'react';
import AccountSettings from './AccountSettings/AccountSettings';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('account'); 
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="mt-14 ml-7 w-full max-w-[1539px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <aside className="flex flex-col w-[28%] max-md:ml-0 max-md:w-full">
          <nav className="flex flex-col grow items-start px-14 pt-10 pb-80 mt-4 w-full text-2xl leading-none text-black bg-white max-md:px-5 max-md:pb-24 max-md:mt-10">
            <a href="#" onClick={() => handleSectionChange('account')} className="px-5 py-3 bg-white">Thông tin tài khoản</a>
            <a href="#" onClick={() => handleSectionChange('password')} className="px-5 pt-2.5 pb-1 mt-10 bg-white">Thay đổi mật khẩu</a>
            <a href="#" className="px-5 pt-2.5 pb-1 mt-10 max-w-full bg-white w-[235px] max-md:pr-5">Đăng xuất</a>
          </nav>
        </aside>

        {/* Render form theo điều kiện */}
        {activeSection === 'account' && <AccountSettings />} 
        {activeSection === 'password' && <ChangePasswordForm />}
      </div>
    </div>
  );
};

export default Profile;
