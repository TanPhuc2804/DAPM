import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDropdown = ({ username, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="relative group">
      <button className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600">
        {username}
      </button>
      <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-2 w-48 z-10 hidden group-hover:block transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
        <ul className="flex flex-col">
          <li>
            <button 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => navigate('/auth/profile')}
            >
              Thông Tin Cá Nhân
            </button>
          </li>
          <li>
            <button 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => navigate('/auth/StateOrder')}
            >
              Đơn Hàng
            </button>
          </li>
          <li>
            <button 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={onLogout}
            >
              Đăng Xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;
