import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"; 
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../hooks/auth.context';
import SearchComponent from '../SearchComponent/searchcomponent';
import UserDropdown from '../UserMenu';

const Navigation = () => {
    const [cartItemCount, setCartItemCount] = useState(0); 
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); // State lưu trữ category đã chọn
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    // Lấy danh sách danh mục sản phẩm
    useEffect(() => {
        axios.get('http://localhost:3000/category/get-categorylist')
            .then(res => {
                if (res.data.status) {
                    setCategories(res.data.categories);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    // Lấy số lượng sản phẩm trong giỏ hàng
    useEffect(() => {
        if (auth.isAuthenticated) {
            axios.get('http://localhost:3000/cart/get-cart-item-count', { 
                headers: { Authorization: `Bearer ${auth.token}` }
            })
            .then(res => {
                if (res.data.status) {
                    setCartItemCount(res.data.count);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [auth.isAuthenticated]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId); // Cập nhật category đã chọn
        navigate(`/product-category/${categoryId}`); 
    };

    const handleLogout = () => {
        navigate('/auth/login');
    };

    return (
        <nav className="relative w-full bg-white shadow-md">
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
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <FaTimes className="h-6 w-6 text-gray-800" /> : <FaBars className="h-6 w-6 text-gray-800" />}
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className={`flex-1 items-baseline justify-center space-x-12 ${isMenuOpen ? "block" : "hidden"} md:flex z-50`}>
                        <Link to="/" className="text-[#224F34] transition-all duration-300 ease-in-out text-lg hover:underline hover:scale-110" style={{ fontSize: 'calc(1.5rem - 0.5vw)' }}>
                            Trang chủ
                        </Link>

                        {/* Dropdown for Product Categories */}
                        <div className="relative group">
                            <Link 
                                to="product-category/defauld" 
                                className="text-[#224F34] transition-all duration-300 ease-in-out text-lg hover:underline hover:scale-110" 
                                style={{ fontSize: 'calc(1.5rem - 0.5vw)' }}
                            >
                                Sản phẩm
                            </Link>

                            {/* Dropdown Content */}
                            <div 
                                className="absolute  mt-2 bg-white shadow-xl rounded-lg w-48 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300"
                            >
                                <ul>
                                    {categories.map(category => (
                                        <li key={category._id} className="p-2 hover:bg-green-100 rounded-md transition-all duration-300 ease-in-out">
                                            <button
                                                onClick={() => handleCategoryClick(category._id)}
                                                className={`w-full bg-white text-[#224F34] transition-all duration-300 ease-in-out text-lg border-none bg-none rounded-md py-2 px-4 focus:outline-none 
                                                    ${selectedCategory === category._id ? 'bg-green-200' : 'hover:bg-green-100'}
                                                `}
                                            >
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <Link to="/about" className="text-[#224F34] transition-all duration-300 ease-in-out text-lg hover:underline hover:scale-110" style={{ fontSize: 'calc(1.5rem - 0.5vw)' }}>
                            Giới Thiệu
                        </Link>
                    </div>

                    {/* Search and Actions */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {/* Search Bar */}
                            <SearchComponent />

                            {/* Login Button */}
                            {auth.isAuthenticated ? (
                                <UserDropdown 
                                    username={auth.user.name} 
                                    onLogout={handleLogout} 
                                />
                            ) : (
                                <Link to={"/auth/login"} className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600">
                                    Đăng nhập
                                </Link>
                            )}

                            {/* Shopping Cart */}
                            <Link to={'/customer/cart'} className="ml-4 flex items-center relative text-gray-800">
                                <FaShoppingCart className="h-5 w-5" />
                                {cartItemCount > 0 && (
                                    <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                                <span className="ml-1">Giỏ hàng</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Responsive Menu for Mobile */}
                <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
                    <div className="flex flex-col items-center space-y-2">
                        <Link to="/" className="text-[#224F34] transition-all duration-300 ease-in-out text-lg hover:underline hover:scale-110">
                            Trang chủ
                        </Link>
                        {/* Mobile dropdown for products */}
                        <div>
                            <button className="text-[#224F34] transition-all duration-300 ease-in-out text-lg">
                                Sản phẩm
                            </button>
                            <ul className="space-y-2">
                                {categories.map(category => (
                                    <li key={category._id}>
                                        <button
                                            onClick={() => handleCategoryClick(category._id)}
                                            className={`text-[#224F34] transition-all duration-300 ease-in-out text-lg hover:underline hover:scale-110 
                                                ${selectedCategory === category._id ? 'bg-green-200' : ''}
                                            `}
                                        >
                                            {category.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
