import { useState } from 'react';
import axios from 'axios';


function Register() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [cofirmpassword, setConfirmPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials=true
    axios.post("http://localhost:3000/auth/registerCus ", { username,name, password,cofirmpassword })
      .then(res => console.log(res))
      .catch(err => console.log(err));
      
      
  };

  return (
    <div className="flex justify-center  items-center h-screen">
      <div className="flex bg-white rounded-lg shadow-lg">
        <div className="hidden md:block md:w-[500px]">
          <div className="h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-l-lg"></div>
        </div>
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-4">Tạo tài khoản</h1>
          <p className="mb-4">Bạn đã có tài khoản? <span className="text-orange-500 underline cursor-pointer">Đăng nhập</span></p>
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
                value={cofirmpassword}
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
                className="w-full h-12 px-4 border rounded-lg"
                placeholder="Nhập"
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="robot" className="mr-2" />
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
