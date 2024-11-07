import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../assets/hooks/auth.context';
import { openNotification } from "../../../assets/hooks/notification";
import fashion from '../../../assets/video/fashion.mp4'; // Video nền giống trang Login
import { Modal, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'; // Import icon mắt

function Register() {
  const [username, setUsername] = useState('');
  const [fullname, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false); // State quản lý hiện mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State quản lý hiện mật khẩu xác nhận

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.');
      return;
    }
    const otpResponse = await axios.post("http://localhost:3000/auth/send-otp-create", { email: email });
    if (otpResponse.data.status) {
      setVisible(true);
    }
  };

  const onFinish = (values) => {
    const { otp } = values;
    console.log(values)
    axios.post("http://localhost:3000/auth/verify-otp", { inputOTP: otp })
      .then(res => res.data)
      .then(data => {
        if (data.status) {
          setVisible(false);
          axios.post("http://localhost:3000/auth/registerCus", { username, fullname, password, email })
            .then((res) => {
              if (res.data.status) {
                openNotification(true,"Đăng ký thành công","")
                navigate('/auth/login');

              }
            })
            .catch((err) => {
              console.log(err)
              openNotification(false, "Đăng ký thất bại", err.response?.data?.errr || " Đã xảy ra lỗi. Vui lòng thử lại sau");
            });
        }
      })
      .catch(err => {
        
        openNotification(false, "Xác thực OTP thất bại", err.response?.data.message ?? "");
      });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
      {/* Background Video giống phần Login */}
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-[0] opacity-60" src={fashion}></video>

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Form đăng ký */}
      <div className="relative z-10 flex items-center bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg w-[90%] max-w-lg">
        <div className="p-8 w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tạo tài khoản</h1>
          <p className="text-center mb-6">
            Bạn đã có tài khoản?{' '}
            <span
              className="text-orange-500 underline cursor-pointer"
              onClick={() => navigate('/auth/login')}
            >
              Đăng nhập
            </span>
          </p>

          {errorMessage && <div className="text-red-500 mb-4 text-center">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Nhập họ và tên"
                required
              />
            </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Nhập lại mật khẩu"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Nhập email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Tạo tài khoản
            </button>
          </form>
        </div>
      </div>

      {/* Modal xác thực OTP */}
      <Modal
        okText="Xác thực mã OTP"
        cancelText="Quay lại"
        onOk={() => form.submit()}
        open={visible}
        onClose={() => setVisible(false)}
        title={<p className='text-[20px]'>Xác thực email</p>}
      >
        <Form onFinish={onFinish} form={form}>
          <Form.Item label="Nhập mã OTP" name="otp">
            <Input.OTP  />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Register;
