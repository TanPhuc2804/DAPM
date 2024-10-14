import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";
import Login from "../pages/auth/login"; 
import Register from "../pages/auth/Register"; 
import ListProduct from "../pages/user/ListProduct";
import Cancel from "../pages/checkout/Cancel";
import Success from "../pages/checkout/Success";
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/product/Ao', component: ListProduct },
    { path: '/auth/login', component: Login, layout:null }, 
    { path: '/auth/logup', component: Register, layout:null },
    { path: '/success/:session_id', component: Success },
    { path: '/cancel', component: Cancel },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
