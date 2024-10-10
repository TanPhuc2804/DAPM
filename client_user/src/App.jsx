import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './assets/Component/Layout';
import { Fragment } from 'react';
function App() {
  const [count, setCount] = useState(0)
  axios.defaults.withCredentials=true
  useEffect(()=>{
    axios.get("http://localhost:3000/") 
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  },[])

  return (
  
    <Router>
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.layout ===null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route key={index}
             path={route.path} 
             element={<Layout><Page /></Layout>} />
          );
        })}
      </Routes>
    </div>
  </Router>
  )
}

export default App
