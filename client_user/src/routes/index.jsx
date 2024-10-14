import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";
import Login from "../pages/auth/login"; 
import Register from "../pages/auth/Register"; 
import ListProduct from "../pages/user/ListProduct";
import DetailProduct from "../pages/user/DetailProduct/DetailProduct";
import Cart from "../pages/user/Card/Pagecart";
import Order from "../pages/user/Order/Order";
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },

    { path: '/auth/login', component: Login, layout: null }, 
    { path: '/auth/register', component: Register, layout: null }, 
    { path: '/product/:id', component: DetailProduct },
    { path: '/product-category/:id', component: ListProduct }, 
    { path: '/customer/cart', component: Cart },
    { path: '/customer/order', component: Order },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
