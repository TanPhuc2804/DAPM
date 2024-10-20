import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import CartItem from './CartItem/CartItem';
import CartSummary from './CartSummary/CartSummary';
import { useCart } from './CartContext/Cartcontext';
import axios from 'axios';

function Cart() {
    const { addToCart, cartItems } = useCart()
    const [items, setItems] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/customer/cart")
            .then(res => res.data)
            .then(data => {
                addToCart(data.cart)
                setItems(data.cart)
            })
            .catch(err => console.log(err))
    }, [])

    return (

        <>
            <Breadcrumb />
            <section className="self-center mt-11 w-full max-w-[2000px] max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                    <div className="flex flex-col w-[69%] max-md:w-full">
                        <div className="relative flex flex-col items-start mx-auto w-full bg-white rounded border border-gray-200">
                            <h2 className="px-6 py-5 text-lg font-medium leading-none text-zinc-900">
                                Shopping Cart
                            </h2>
                            <div className="flex items-center justify-between px-6 py-2 w-full text-lg font-medium uppercase bg-gray-100 border border-gray-200 text-neutral-600">
                                <div className="text-neutral-600 w-[300px]">Products</div>
                                <div className="text-neutral-600 w-[74px]">SIZE</div>
                                <div className="text-neutral-600 w-[78px]">Giá</div>
                                <div className="w-[94px]">Tổng giá</div>
                            </div>
                            {cartItems.length > -1 &&
                                <div className="flex flex-col self-stretch w-full">
                                    {cartItems.map((item, index) => (
                                        <CartItem key={index} {...item} />
                                    ))}
                                </div>
                            }

                            <div className="flex justify-between items-center p-6 text-sm font-bold tracking-normal leading-10 text-sky-400 uppercase">
                                <Link to="/" className="flex gap-2 items-center px-6 my-auto rounded-sm border-2 border-sky-400">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e3d2664b6531c5d056f53b4f347ab1cf6d1c7f1be6eab0ac2500ab85eecba70?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
                                        alt="Trở về trang chủ"
                                        className="w-5 aspect-square"
                                    />
                                    Trở về trang chủ
                                </Link>
                            </div>
                            <div className="absolute left-0 z-0 max-w-full h-0 bg-gray-200 border border-gray-200 bottom-[68px] min-h-[1px]" />
                        </div>
                    </div>
                    <CartSummary cartItems={cartItems} />
                </div>
            </section>
        </>
    );
}

export default Cart;
