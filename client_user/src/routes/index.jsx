import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";
import Login from "../pages/auth/login"; 
import Register from "../pages/auth/Register"; 
import ListProduct from "../pages/user/ListProduct";
import DetailProduct from "../pages/user/DetailProduct/DetailProduct";
import Cart from "../pages/user/Card/Pagecart";
import Order from "../pages/Admin/pages/Order/Order.jsx";
import Cancel from "../pages/checkout/Cancel";
import Success from "../pages/checkout/Success";
import Admin from "../pages/Admin/pages";
import Product from "../pages/Admin/pages/Product/Product";
import Category from "../pages/Admin/pages/Category/Category";
import OrderCus  from "../pages/user/Order/Order.jsx";
import Revenue from "../pages/Admin/pages/Revenue/Revenue";
import Staff from "../pages/Admin/pages/Staff/Staff";
import Supplier from "../pages/Admin/pages/Supplier/Supplier";
import Vourchers from "../pages/Admin/pages/Vourchers/Vourchers";
import Pricing from "../pages/Admin/pages/Pricing/Pricing";
import AddProduct from "../pages/Admin/pages/Product/AddProduct";
import UpdateProduct from "../pages/Admin/pages/Product/UpdateProduct";
import ViewDetailProduct from "../pages/Admin/pages/Product/ViewDetailProduct";
import EditVoucher from "../pages/Admin/pages/Vourchers/EditVoucher";
import AddVoucher from "../pages/Admin/pages/Vourchers/AddVoucher";
import AddOrder from "../pages/Admin/pages/Order/addOrder";
const publicRoutes = [
     { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/auth/login', component: Login, layout: null }, 
    { path: '/auth/register', component: Register, layout: null }, 
    { path: '/product/:id', component: DetailProduct },
    { path: '/product-category/:id', component: ListProduct }, 
    { path: '/customer/cart', component: Cart },
    { path: '/customer/order', component: OrderCus },
    { path: '/success', component: Success },
    { path: '/success/:session_id', component: Success },
    { path: '/cancel', component: Cancel },
    { path: '/auth/logup', component: Register, layout: null },
    {
        path: "/admin",
        component: Admin,
        isAdmin: true,
        children: [
            { path: "", page: Product },
            {
                path: 'category',
                page: Category,
            },
            {
                path: 'order',
                page: OrderAdmin,
            },
            {
                path: 'revenue',
                page: Revenue,
            },
            {
                path: 'staff',
                page: Staff,
            },
            {
                path: 'supplier',
                page: Supplier,
            },
            {
                path: 'vouchers',
                page: Vourchers,
            },
            {
                path: 'pricing',
                page: Pricing,
            },
            {
                path: 'addproduct',
                page: AddProduct,
            },
            {
                path: 'updateproduct',
                page: UpdateProduct,
                isShowHeader: true
            },
            {
                path: 'viewdetailproduct/:id',
                page: ViewDetailProduct,
            },
            {
                path: 'editvoucher/:id',
                page: EditVoucher,
            },
            {
                path: 'addvoucher',
                page: AddVoucher,
            },
            {
                path: 'addorder',
                page: AddOrder,
            },
        ]
    }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
