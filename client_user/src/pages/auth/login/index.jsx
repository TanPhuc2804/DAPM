import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    axios.post("http://localhost:3000/auth/login", { username, password })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
        setErrorMessage("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex bg-white rounded-lg shadow-lg">
        <div className="hidden md:block md:w-[600px]">
          <div className="h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-l-lg"></div>
        </div>
        <div className="p-10">
          <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>
          <p className="mb-4">Bạn chưa có tài khoản? <span className="text-orange-500 underline cursor-pointer">Tạo tài khoản</span></p>
          
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Tên đăng nhập</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 px-4 border rounded-lg"
                placeholder="Nhập tên đăng nhập"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 border rounded-lg"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            <button type="submit" className="w-full h-12 bg-orange-500 text-white rounded-lg">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
