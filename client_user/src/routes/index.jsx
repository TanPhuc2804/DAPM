import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile/profile.jsx";
import Login from "../pages/auth/login"; 
import Register from "../pages/auth/Register"; 
import About from "../assets/Component/Layout/DefautLayout/AboutComponent/about.jsx";
import ListProduct from "../pages/user/ListProduct";
import DetailProduct from "../pages/user/DetailProduct/DetailProduct";
import Cart from "../pages/user/Card/Pagecart";
import Cancel from "../pages/checkout/Cancel";
import Success from "../pages/checkout/Success";
import Admin from "../pages/Admin/pages";
import Product from "../pages/Admin/pages/Product/Product";
import OrderCus  from "../pages/user/Order/Order.jsx";
import Pricing from "../pages/Admin/pages/Pricing/Pricing";
import Navigation from "../assets/Component/Layout/DefautLayout/Navigation/index.jsx";
import CategoryPage from "../assets/Component/Layout/DefautLayout/CategoryPage/CategoryPage.jsx";
import FinalOrder from "../pages/user/FinalOrder/FinalOrder.jsx";
import Category from "../pages/Admin/pages/Category/Category.jsx";
import RevernuePage from "../pages/Admin/pages/Revenue/RevernuePage.jsx";
import OrderPage from "../pages/Admin/pages/Order/OrderPage.jsx";
import StaffPage from "../pages/Admin/pages/Staff/StaffPage.jsx";
import CustomerPage from "../pages/Admin/pages/Customer/CustomerPage.jsx";
import SupplierPage from "../pages/Admin/pages/Supplier/SupplierPage.jsx";
import VoucherPage from "../pages/Admin/pages/Vourchers/VoucherPage.jsx";
import AccountPage from "../pages/Admin/pages/Account/AccountPage.jsx";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/auth/profile', component: Profile },
    { path: '/auth/login', component: Login, layout: null }, 
    { path: '/auth/register', component: Register, layout: null }, 
    { path: '/product/:id', component: DetailProduct },
    { path: '/product-category/:id', component: ListProduct },
    { path: '/category/get-categorylist', component: Navigation },
    { path: '/category/get-category/:id', component: CategoryPage },
    { path: '/customer/cart', component: Cart },
    { path: '/customer/order', component: OrderCus },
    { path: '/success', component: Success },
    { path: '/success/:session_id', component: Success },
    { path: '/auth/StateOrder', component: FinalOrder },
    { path: '/cancel', component: Cancel },
    { path: '/about', component: About },
    { path: '/auth/logup', component: Register, layout: null },
    {
        path: "/admin",
        component: Admin,
        isAdmin: true,
        children: [
            { path: "products", page: Product },
            { path: "", page: RevernuePage },
            { path: "revenue", page: RevernuePage },
            { path: "orders", page: OrderPage },
            { path: "staffs", page: StaffPage },
            { path:"customers",page:CustomerPage},
            { path:"suppliers",page:SupplierPage},
            { path:"vouchers",page:VoucherPage},
            { path:"account",page:AccountPage}
            
        ]
    }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
