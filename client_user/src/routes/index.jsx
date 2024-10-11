import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";
import Login from "../pages/auth/login";
import Register from "../pages/auth/Register";
import Admin from "../pages/Admin/pages";
import Product from "../pages/Admin/pages/Product/Product";
import Category from "../pages/Admin/pages/Category/Category";
import Order from "../pages/Admin/pages/Order/Order";
import Revenue from "../pages/Admin/pages/Revenue/Revenue";
import Staff from "../pages/Admin/pages/Staff/Staff";
import Supplier from "../pages/Admin/pages/Supplier/Supplier";
import Vourchers from "../pages/Admin/pages/Vourchers/Vourchers";
import Pricing from "../pages/Admin/pages/Pricing/Pricing";
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/auth/login', component: Login, layout: null },
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
                page: Order,
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

        ]
    }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
