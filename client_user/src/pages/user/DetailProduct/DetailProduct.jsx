import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../Card/CartContext/cartcontext';
import axios from 'axios';
import DeliveryInfo from './DeliveryInfo/DeliveryInfo';
import ProductDescription from './ProductDescription/ProductDescription';
import RelatedProducts from './RelatedProducts/RelatedProducts';
import Size from './Size/Size';
import Breadcrumb from '../ListProduct/Breadcrumb/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Quantity from './Quantity/Quantity';
import { AuthContext } from '../../../assets/hooks/auth.context';
import { openNotification } from '../../../assets/hooks/notification';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// LoadingSpinner component
const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center mt-10 my-10 mx-10">
            <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
    );
};

function DetailProduct() {
    const { id } = useParams();  // Lấy ID sản phẩm từ URL
    const { addToCart } = useCart();  // Hook thêm sản phẩm vào giỏ hàng
    const [product, setProduct] = useState({});  // Lưu thông tin sản phẩm
    const [loading, setLoading] = useState(true);  // Trạng thái loading dữ liệu
    const [quantity, setQuantity] = useState(1);  // Số lượng sản phẩm
    const [selectedSize, setSelectedSize] = useState({});  // Kích thước sản phẩm được chọn
    const { auth } = useContext(AuthContext);  // Kiểm tra trạng thái đăng nhập của người dùng

    useEffect(() => {
        // Lấy dữ liệu sản phẩm từ API khi ID thay đổi
        setLoading(true);  
        setTimeout(() => {  
            axios.get(`http://localhost:3000/products/list-product/${id}`)
                .then(res => {
                    if (res.data.status) {
                        setProduct(res.data.product);
                    }
                    setLoading(false);  // Đặt trạng thái loading thành false sau khi dữ liệu được tải xong
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);  // Đặt trạng thái loading thành false nếu có lỗi
                });
        }, 500);  
    }, [id]);  

    // Cấu hình Swiper cho carousel ảnh sản phẩm
    const settings = {
        modules: [Pagination, Navigation, Autoplay],
        spaceBetween: 30,
        slidesPerView: 1,
        navigation: true,
        pagination: { clickable: true },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    };

    // Định nghĩa hàm handleAddToCart
    const handleAddToCart = () => {
        if (!auth) {
            openNotification("Chưa đăng nhập", "Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng.", "error");
            return;
        }
        addToCart(product, quantity, selectedSize);
        openNotification("Thêm vào giỏ hàng thành công", `${product.name} đã được thêm vào giỏ hàng!`, "success");
    };

    if (loading) {
        return <LoadingSpinner />;  // Hiển thị vòng tròn xoay khi loading
    }

    return (
        <div className="container mx-auto px-1">
            <Breadcrumb />
            <div className="flex flex-col lg:flex-row gap-0 mt-10">
                {/* Phần hình ảnh sản phẩm */}
                <div className="flex flex-col items-center lg:w-1/2">
                    <div className="relative w-full max-w-[600px]">
                        <Swiper {...settings} className="mySwiper w-full h-auto shadow-md rounded-md">
                            {product.image && product.image.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={img}
                                        alt={`Product Image ${index + 1}`}
                                        className="object-contain w-full h-auto max-h-[600px] rounded-lg shadow-lg"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                {/* Phần thông tin chi tiết sản phẩm */}
                <div className="lg:w-1/2 flex flex-col items-start p-6 bg-white shadow-lg rounded-md">
                    <h1 className="text-3xl font-extrabold text-gray-800">{product.name}</h1>
                    <p className="text-base mt-2 text-gray-500">Mã SP: {id}</p>
                    <hr className="mt-3 mb-3 border-t-[1px] border-[#E4E4E4] w-[80%] self-start" />
                    <p className="text-3xl font-bold my-4 text-green-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {product.price} đ
                    </p>
                    <hr className="mt-3 mb-3 border-t-[1px] border-[#E4E4E4] w-[80%] self-start" />

                    {/* Kích thước */}
                    <div className="mb-4 w-full">
                        <Size selectedSize={selectedSize} setSelectedSize={setSelectedSize} productSizes={product.productSizes} />
                    </div>
                    <hr className="mt-3 mb-3 border-t-[1px] border-[#E4E4E4] w-[80%] self-start" />

                    {/* Số lượng và nút Thêm vào giỏ hàng */}
                    <div className="flex flex-col sm:flex-row items-center mb-12 mx-5 mt-6 w-full">
                        <Quantity value={quantity} onChange={setQuantity} />
                        <Link
                            onClick={handleAddToCart}  // Gọi hàm handleAddToCart khi nhấn vào nút
                            className="bg-green-500 text-white px-6 py-3 mt-4 sm:mt-0 sm:ml-5 border rounded-md transition-all duration-200 transform hover:bg-green-600 hover:scale-105 flex items-center"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            Thêm vào giỏ hàng
                        </Link>
                    </div>

                    {/* Thông tin giao hàng */}
                    <DeliveryInfo />
                </div>
            </div>

            {/* Mô tả sản phẩm và các sản phẩm liên quan */}
            <hr className="my-10 border-neutral-200" />
            <ProductDescription product={product} />
            <hr className="my-10 border-neutral-200" />
            <RelatedProducts />
        </div>
    );
}

export default DetailProduct;
