import { useState } from 'react';
import axios from 'axios';
import "./App.css"; // Ensure you have global styles if needed

function Login() {
  const [username, setUsername] = useState('');
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/login", { name , username, password,confirmpassword })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex bg-white rounded-lg shadow-lg">
        <div className="hidden md:block md:w-[600px]">
          <div className="h-full bg-gradient-to-br from-purple-400 to-pink-500 rounded-l-lg"></div>
        </div>
        <div className="p-20">
          <h1 className="text-6xl from-lime-800 mb-2">Tạo tài khoản</h1>
          <p className="mb-4 text-1xl text-green-950">Bạn đã có tài khoản? <span className="text-lime-700 underline cursor-pointer">Đăng nhập</span></p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-left text-2xl font-medium">Họ và tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full h-12 px-4 border rounded-lg"
                placeholder="Nhập"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-left text-2xl font-medium">Tên đăng nhập</label>
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
              <label className="block text-left text-2xl font-medium">Mật khẩu</label>
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
              <label className="block text-left text-2xl font-medium"> Nhập lại mật khẩu</label>
              <input
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 border rounded-lg"
                placeholder="Nhập"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-left text-2xl font-medium">Email</label>
              <input
                type="email"
                className="w-full h-12 px-4 border rounded-lg"
                placeholder="Nhập"
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="robot" className="mr-2" />
              <label htmlFor="robot" className="text-start">I'm not a robot</label>
            </div>
            <button type="submit" className="w-full h-15 bg-lime-700 text-white rounded-lg">
              Tạo một tài khoản
            </button>
          </form>
          <p className="mt-4 text-sm">
            By creating an account, you agree to our <span className="text-blue-500 underline cursor-pointer">Terms of use</span> and <span className="text-blue-500 underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
