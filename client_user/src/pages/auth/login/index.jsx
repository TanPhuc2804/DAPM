import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../assets/hooks/auth.context';
import { openNotification } from "../../../assets/hooks/notification";
import fashion from '../../../assets/video/fashion.mp4'; // Video nền giống trang Login
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'; // Import icon mắt

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State để quản lý việc hiển thị mật khẩu

    // Context for authentication
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios
            .post('http://localhost:3000/auth/login', { username, password })
            .then((res) => {
                if (res.data.status) {
                    const userData = {
                        isAuthenticated: true,
                        user: {
                            id: res.data.id,
                            email: res.data.email,
                            name: res.data.fullname,
                        },
                    };

                    // Save user data to localStorage
                    localStorage.setItem('authData', JSON.stringify(userData));

                    setAuth(userData);
                    navigate(res.data.redirect || '/');
                } else {
                    setErrorMessage('Tên đăng nhập hoặc mật khẩu không đúng.');
                }
            })
            .catch((err) => {
                console.error(err);
                openNotification(false, "Đăng nhập thất bại", err.response?.data.message ?? "Đã xảy ra lỗi");
            });
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover z-[0] opacity-60"
                src={fashion}
            ></video>

            {/* Semi-transparent overlay for dimming */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* Login Form */}
            <div className="relative z-10 flex items-center bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg w-[90%] max-w-lg">
                <div className="p-8 w-full">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Đăng nhập</h1>
                    <p className="text-center mb-6">
                        Bạn chưa có tài khoản?{' '}
                        <span
                            className="text-orange-500 underline cursor-pointer"
                            onClick={() => navigate('/auth/register')}
                        >
                            Tạo tài khoản
                        </span>
                    </p>

                    {errorMessage && <div className="text-red-500 mb-4 text-center">{errorMessage}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Nhập tên đăng nhập"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Nhập mật khẩu"
                                    required
                                />
                                <span
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </span>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full h-12 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
