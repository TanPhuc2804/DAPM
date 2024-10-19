import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../assets/hooks/auth.context';

function Register() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.');
      return;
    }

    axios
  .post("http://localhost:3000/auth/registerCus", { username, name, password, email })
  .then((res) => {
    if (res.data.status) {
      setAuth({
        isAuthenticated: true,
        user: {
          id: res.data.id,
          email: res.data.email,
          name: res.data.name,
        },
      });
      navigate(res.data.redirect || '/');
    } else {
      setErrorMessage(res.data.message || 'Đăng ký thất bại.');
    }
  })
  .catch((err) => {
    console.error('Error response:', err.response);
    setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
  });
  };

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
                value={name}
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
    </div>
  );
}

export default Register;
