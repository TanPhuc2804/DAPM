import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../../hooks/auth.context';
const UserDropdown = ({ username, onLogout }) => {
  const navigate = useNavigate();
  const {setAuth} = useContext(AuthContext)
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
    <div className="relative group">
      <button className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600">
        {username}
      </button>
      <div className="absolute right-0 top-[30px] bg-white shadow-lg rounded-lg mt-2 w-48 z-10 hidden group-hover:block transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
        <ul className="flex flex-col">
          <li>
            <button 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left bg-white"
              onClick={() => navigate('/auth/profile')}
            >
              Thông Tin Cá Nhân
            </button>
          </li>
          <li>
            <button 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left bg-white"
              onClick={() => navigate('/auth/StateOrder')}
            >
              Đơn Hàng
            </button>
          </li>
          <li>
            <button 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left bg-white"
              onClick={handleLogout}
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
