import { useEffect, useState, useContext } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './assets/Component/Layout';
import { Fragment } from 'react';
import { AuthContext } from './assets/hooks/auth.context';
import { CartProvider } from './pages/user/Card/CartContext/Cartcontext';

function App() {
  const { auth, setAuth } = useContext(AuthContext);
  const [count, setCount] = useState(0);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3000/auth/verify ")
      .then(res => {
        console.log(res);
        setAuth({
          isAuthenticated: true,
          user: {
            id: res.data.user._id,
            email: res.data.user.email,
            name: res.data.user.fullname
          }
        });
      })
      .catch(err => console.log(err));
  }, []);

  console.log(auth);
  return (
    <Router>
      <CartProvider> 
        <div className="App bg-white">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Layout = route.layout === null ? Fragment : DefaultLayout;
              const Page = route.component;
              return (
                <Route key={index}
                  path={route.path}
                  element={<Layout><Page /></Layout>} />
              );
            })}
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
