import React, { useState,useContext } from 'react'; // Thêm useState
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"; 
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../hooks/auth.context';
const Navigation = () => {
  const [cartItemCount, setCartItemCount] = useState(0); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  //context
  const {auth,setAuth} = useContext(AuthContext)
  console.log("[Auth navifation]",auth)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0">
              <div className="grow self-stretch text-5xl font-bold text-green-900 uppercase tracking-[5px] max-md:text-4xl">
                F<span className="text-orange-400">M</span>EN
              </div>
            </a>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes className="h-6 w-6 text-gray-800" /> : <FaBars className="h-6 w-6 text-gray-800" />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`flex-1 items-baseline justify-center space-x-12 ${isMenuOpen ? "block" : "hidden"} md:flex`}>
            <a href="/" className="text-[#224F34] transition-all duration-300 ease-in-out text-lg hover:underline hover:scale-110" style={{ fontSize: 'calc(1.5rem - 0.5vw)' }}>
              Trang chủ
            </a>
            <a href="/products" className="text-[#224F34] transition-all duration-300 ease-in-out text-lg hover:underline hover:scale-110" style={{ fontSize: 'calc(1.5rem - 0.5vw)' }}>
              Áo
            </a>
            <a href="/products" className="text-[#224F34] transition-all duration-300 ease-in-out text-lg hover:underline hover:scale-110" style={{ fontSize: 'calc(1.5rem - 0.5vw)' }}>
              Quần
            </a>
            <a href="/products" className="text-[#224F34] transition-all duration-300 ease-in-out text-lg hover:underline hover:scale-110" style={{ fontSize: 'calc(1.5rem - 0.5vw)' }}>
              Phụ kiện
            </a>
          </div>

          {/* Search and Actions */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Search Bar */}
              <div className="relative flex items-center">
                <FaSearch className="absolute left-3 text-gray-500" />
                <input
                  type="text"
                  className="form-input pl-10 pr-4 py-2 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring focus:ring-green-200 focus:border-green-300 transition-all duration-300 ease-in-out w-48 focus:w-64"
                  placeholder="Bạn muốn tìm gì?"
                />
              </div>

              {/* Login Button */}
              <Link to={"/auth/login"} className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600">
                { auth.isAuthenticated ? auth.user.name : "Đăng nhập"}
              </Link>

              {/* Shopping Cart */}
              <button className="ml-4 flex items-center relative text-gray-800">
                <FaShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
                <span className="ml-1">Giỏ hàng</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col items-center py-2">
          <a href="/" className="text-[#224F34] hover:text-[#224F34] hover:underline transition-all duration-300 ease-in-out mb-2">
            Trang chủ
          </a>
          <a href="/products" className="text-[#224F34] hover:text-[#224F34] hover:underline transition-all duration-300 ease-in-out mb-2">
            Áo
          </a>
          <a href="/products" className="text-[#224F34] hover:text-[#224F34] hover:underline transition-all duration-300 ease-in-out mb-2">
            Quần
          </a>
          <a href="/products" className="text-[#224F34] hover:text-[#224F34] hover:underline transition-all duration-300 ease-in-out mb-2">
            Phụ kiện
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
