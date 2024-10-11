
import Category from "../pages/Category/Category";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Order from "../pages/Order/Order";
import Pricing from "../pages/Pricing/Pricing";
import AddProduct from "../pages/Product/AddProduct";
import EditProduct from "../pages/Product/UpdateProduct";
import Product from "../pages/Product/Product";
import ViewDetailProduct from "../pages/Product/ViewDetailProduct";
import Revenue from "../pages/Revenue/Revenue";
import Staff from "../pages/Staff/Staff";
import Supplier from "../pages/Supplier/Supplier";
import Vourchers from "../pages/Vourchers/Vourchers";
import UpdateProduct from "../pages/Product/UpdateProduct";

export const routes = [
    {
        path: '/',
        page: Product,
        isShowHeader: true
    },
    {
        path: '/category',
        page: Category,
        isShowHeader: true
    },
    {
        path: '/order',
        page: Order,
        isShowHeader: true
    },
    {
        path: '/revenue',
        page: Revenue,
        isShowHeader: true
    },
    {
        path: '/staff',
        page: Staff,
        isShowHeader: true
    },
    {
        path: '/supplier',
        page: Supplier,
        isShowHeader: true
    },
    {
        path: '/vouchers',
        page: Vourchers,
        isShowHeader: true
    },
    {
        path: '/pricing',
        page: Pricing,
        isShowHeader: true
    },
    {
        path: '/viewdetailproduct',
        page: ViewDetailProduct,
        isShowHeader: true
    },
    {
        path: '/addproduct',
        page: AddProduct,
        isShowHeader: true
    },
    {
        path: '/updateproduct',
        page: UpdateProduct,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]