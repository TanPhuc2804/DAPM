import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Card/CartContext/Cartcontext';
import axios from 'axios';
import DeliveryInfo from './DeliveryInfo/DeliveryInfo';
import ProductDescription from './ProductDescription/ProductDescription';
import RelatedProducts from './RelatedProducts/RelatedProducts';
import Size from './Size/Size';
import Breadcrumb from '../ListProduct/Breadcrumb/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Quantity from './Quantity/Quantity';
import { useAuth } from '../../../assets/hooks/auth.context';

function DetailProduct() {
    const { id } = useParams();
    const { addToCart } = useCart(); 
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(''); 

    useEffect(() => {
        axios.get(`http://localhost:3000/products/list-product/${id}`)
            .then(res => {
                if (res.data.status) {
                    setProduct(res.data.product);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        addToCart({ ...product, quantity, size: selectedSize }); 
    };

    return (
        <div className="container mx-auto px-4">
            <Breadcrumb />
            <div className="flex flex-col lg:flex-row gap-10 mt-10">
                <div className="flex flex-col items-center lg:w-1/2">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-auto mb-5 object-contain max-h-[400px]" 
                    />
                </div>

                <div className="lg:w-1/2 flex flex-col items-start">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-base mt-2" style={{ color: '#B9BBBF' }}>Mã SP: {id}</p>
                    <hr className="mt-3 mb-3 border-t-[1px] border-[#E4E4E4] w-[80%] self-start" />
                    <p className="text-3xl font-bold my-4 text-green-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {product.price} đ
                    </p>
                    <hr className="mt-3 mb-3 border-t-[1px] border-[#E4E4E4] w-[80%] self-start" />

                    <div className="mb-4 w-full">
                        <Size selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                    </div>
                    <hr className="mt-3 mb-3 border-t-[1px] border-[#E4E4E4] w-[80%] self-start" />

                    <div className="flex flex-col sm:flex-row items-center mb-12 mx-5 mt-6 w-full">
                        <Quantity value={quantity} onChange={setQuantity} />
                        <Link 
                            to='/customer/cart'
                            onClick={handleAddToCart}
                            className="bg-gray-300 text-white px-6 py-3 mt-4 sm:mt-0 sm:ml-5 border transition-colors duration-200 hover:bg-green-500 hover:text-white flex items-center"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            Thêm vào giỏ hàng
                        </Link>
                    </div>

                    <DeliveryInfo />
                </div>
            </div>

            <hr className="my-10 border-neutral-200" />
            <ProductDescription product={product} />
            <hr className="my-10 border-neutral-200" />
            <RelatedProducts />
        </div>
    );
}

export default DetailProduct;