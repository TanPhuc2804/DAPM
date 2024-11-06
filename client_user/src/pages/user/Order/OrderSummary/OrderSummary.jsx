import React, { useEffect, useState } from 'react';
import { useCart } from '../../Card/CartContext/cartcontext';
import { Link, useLocation,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useInfor } from '../../../../assets/hooks/inforOrder.context';
import { openNotification } from '../../../../assets/hooks/notification';
import { useDispatch,useSelector } from 'react-redux';

function OrderSummary() {
    const navigate =useNavigate()
    const {infor }= useInfor()
    const voucher = useSelector(state => state.voucher.selectVoucher)

    const [cartItems, setCartItem] = useState([])
    const location = useLocation()
    useEffect(() => {
        setCartItem(location.state.cartItems)
    }, [])
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const priceDiscount = total*( voucher?.discount ?? 0)/100
    const handleCheckout = () => {
        if (infor.paymentMethod === "Thanh toán khi nhận hàng") {
            axios.post("http://localhost:3000/order/insert-order", { infor: infor, cart: cartItems })
                .then(res=>res.data)
                .then(data=>{
                    if(data.status){
                        navigate('/success')
                    }
                })
                .catch(err => {
                    openNotification(false, err.response.data.message, "Đặt hàng thất bại !");
                });
        } else {
            axios.post("http://localhost:3000/checkout", { infor: infor, cart: cartItems,voucher:voucher })
                .then(res => res.data)
                .then(data => {
                    if (data.status) {
                  
                        navigate('/auth/StateOrder');
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="flex overflow-hidden flex-col grow shrink justify-center items-center pb-6 bg-white rounded border border-gray-200 border-solid min-h-[700px] min-w-[300px] w-[500px] max-md:max-w-full">
            <div className="gap-2.5 px-12 py-5 max-w-full text-4xl font-medium leading-none text-zinc-900 w-[464px] max-md:px-5">
                Đặt hàng
            </div>
            <div className="flex flex-col justify-center items-center pb-6 max-md:max-w-full">
                {cartItems.length > 0 ? (
                    cartItems.map((item,index) => (
                        <div key={index} className="flex gap-4 justify-start items-start max-md:max-w-full">
                            <img loading="lazy" src={item.image} alt={item.name} className="object-contain shrink-0 self-stretch my-auto aspect-[0.65] w-[150px]" />
                            <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[20px]">
                                <div className="text-2xl text-left leading-none text-zinc-900">{item.name}</div>
                                <div className="flex flex-col mt-1.5 text-left">
                                    <div className="flex gap-1 items-start">
                                        <div className="text-lg leading-none text-gray-500">{item.quantity} x</div>
                                        <div className="text-xl font-semibold leading-none text-zinc-900">{item.price} đ</div>
                                    </div>
                                    <div className="mt-1.5 text-xl font-semibold leading-none text-black">Size: {item.size.size}</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-lg text-gray-500">Giỏ hàng trống</div>
                )}
                <div className="flex flex-col pb-6 mt-4 max-w-full w-[376px]">
                    <div className="flex flex-col pb-1 w-full text-2xl max-w-[376px]">
                        <div className="flex gap-10 justify-between items-center w-full">
                            <div className="self-stretch my-auto leading-none text-gray-500">Tổng tiền</div>
                            <div className="self-stretch my-auto font-semibold leading-none text-zinc-900">{total} đ</div>
                        </div>
                        <div className="flex gap-10 justify-between items-center mt-3 w-full leading-none whitespace-nowrap">
                            <div className="self-stretch my-auto text-gray-500">Shipping</div>
                            <div className="self-stretch my-auto font-medium text-zinc-900">Free</div>
                        </div>
                        <div className="flex gap-10 justify-between items-center mt-3 w-full leading-none">
                            <div className="self-stretch my-auto text-gray-500">Giảm giá</div>
                            <div className="self-stretch my-auto font-medium text-zinc-900">{priceDiscount}</div>
                        </div>
                    </div>
                    <div className="mt-4 w-full min-h-0 bg-gray-200 border border-gray-200 border-solid" />
                    <div className="flex gap-10 justify-between items-center mt-4 w-full text-3xl leading-none">
                        <div className="self-stretch my-auto text-zinc-900">Tổng cộng</div>
                        <div className="self-stretch my-auto text-green-900">{total-(priceDiscount)} đ</div>
                    </div>
                </div>
            </div>
            <button onClick={handleCheckout} className="flex gap-3 justify-center items-center px-8 max-w-full text-2xl font-bold tracking-wide text-white uppercase bg-green-900 rounded leading-[56px] w-[376px] max-md:px-5">
                <span className="self-stretch my-auto">Đặt hàng</span>
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/74d0a6f01a231e01c69ace0cdebd528f5732141fec6416bc339330bdc548e330?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" alt="" className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />
            </button>
        </div>
    );
}

export default OrderSummary;
