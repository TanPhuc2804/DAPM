import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";
import Login from "../pages/auth/Login"; 
import Register from "../pages/auth/Register"; 


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/auth/login', component: Login, layout:null }, 
    { path: '/auth/logup', component: Register, layout:null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
