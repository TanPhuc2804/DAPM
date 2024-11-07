import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../assets/hooks/auth.context';
import { Form, Modal, Input } from 'antd'
import { openNotification } from '../../../assets/hooks/notification';
function Register() {
  const [username, setUsername] = useState('');
  const [fullname, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.');
      return;
    }
    const otpResponse = await axios.post("http://localhost:3000/auth/send-otp-create",{email:email})
    if (otpResponse.data.status) {
      setVisible(true)
    }
  };


  const onFinish = (values) => {
    const { otp } = values
    axios.post("http://localhost:3000/auth/verify-otp", { inputOTP: otp })
      .then(res => res.data)
      .then(data => {
        if (data.status) {
          setVisible(false)
          axios.post("http://localhost:3000/auth/registerCus", { username, fullname, password, email })
            .then((res) => {
              if (res.data.status) {
                navigate('/auth/login');
              }
            })
            .catch((err) => {
              openNotification(false,"Đăng ký thất bại",err.response?.data?.message || " Đã xảy ra lỗi. Vui lòng thử lại sau")
            });
        }
      })
      .catch(err => {
        openNotification(false, "Xác thực OTP th", err.response?.data.message ?? "")
      })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex bg-white rounded-lg shadow-lg">
        <div className="hidden md:block md:w-[500px]">
          <div className="h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-l-lg"></div>
        </div>
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-4">Tạo tài khoản</h1>
          <p className="mb-4">
            Bạn đã có tài khoản?{' '}
            <span
              className="text-orange-500 underline cursor-pointer"
              onClick={() => navigate('/auth/login')}
            >
              Đăng nhập
            </span>
          </p>
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm text-left font-medium">Họ và tên</label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 border rounded-lg"
                placeholder="Nhập"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-left font-medium">Tên đăng nhập</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 px-4 border rounded-lg"
                placeholder="Nhập"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm  text-left font-medium">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 border rounded-lg"
                placeholder="Nhập"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm  text-left font-medium">Nhập lại mật khẩu</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 border rounded-lg"
                placeholder="Nhập"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-left font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border rounded-lg"
                placeholder="Nhập"
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="robot" className="mr-2" required />
              <label htmlFor="robot" className="text-sm">I'm not a robot</label>
            </div>
            <button type="submit" className="w-full h-12 bg-orange-500 text-white rounded-lg">
              Tạo một tài khoản
            </button>
          </form>
          <p className="mt-4 text-sm">
            By creating an account, you agree to our <span className="text-blue-500 underline">Terms of use</span> and <span className="text-blue-500 underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
      <Modal
        okText="Xác thực mã OTP"
        cancelText="Quay lại"
        onOk={() => form.submit()}
        open={visible}
        onClose={() => setVisible(false)}
        title={(<p className='text-[20px]'>Xác thực email</p>)}
      >
        <Form
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Nhập mã OTP"
            name="otp"
          >
            <Input.OTP />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Register;
