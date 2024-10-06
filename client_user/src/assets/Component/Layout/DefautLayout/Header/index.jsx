import { useState } from "react"; 
import { FaSearch, FaShoppingCart } from "react-icons/fa"; 

function Header() {
    const [cartItemCount, setCartItemCount] = useState(0); 

    return (
        <nav className="w-full bg-white">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="flex-shrink-0">
                  <img
                    className="h-8 w-auto"
                    src="/logo.svg"
                    alt="Your Company"
                  />
                </a>
              </div>

              <div className="hidden md:block flex-1">
                <div className="flex items-baseline justify-center space-x-12">
                  <a
                    href="/"
                    className="text-[#224F34] hover:text-[#224F34] hover:underline hover:scale-110 transition-all duration-300 ease-in-out"
                  >
                    Trang chủ
                  </a>
                  <a
                    href="/products"
                    className="text-[#224F34] hover:text-[#224F34] hover:underline hover:scale-110 transition-all duration-300 ease-in-out"
                  >
                    Áo
                  </a>
                  <a
                    href="/products"
                    className="text-[#224F34] hover:text-[#224F34] hover:underline hover:scale-110 transition-all duration-300 ease-in-out"
                  >
                    Quần
                  </a>
                  <a
                    href="/products"
                    className="text-[#224F34] hover:text-[#224F34] hover:underline hover:scale-110 transition-all duration-300 ease-in-out"
                  >
                    Phụ kiện
                  </a>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">

                  <div className="relative flex items-center">
                    <FaSearch className="absolute left-3 text-gray-500" />
                    <input
                      type="text"
                      className="form-input pl-10 pr-4 py-2 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring focus:ring-green-200 focus:border-green-300 transition-all duration-300 ease-in-out w-48 focus:w-64"
                      placeholder="Bạn muốn tìm gì?"
                    />
                  </div>
           
                  <button className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600">
                    Đăng nhập
                  </button>

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
        </nav>
    );
}

export default Header;
