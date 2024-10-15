import React, { useState } from 'react';
import Quantity from '../../DetailProduct/Quantity/Quantity';
import { useCart } from '../CartContext/Cartcontext';
import axios from 'axios';
import { openNotification } from '../../../../assets/hooks/notification';

function CartItem({ productId, name, size, price, quantity, image }) {
    const { updateCartItemQuantity, removeFromCart } = useCart();
    // cập nhật số lượng sản phẩm
    const handleQuantityChange = (newQuantity) => {
        console.log(newQuantity)
        updateCartItemQuantity(productId,size,newQuantity)
    };

    // xóa sản phẩm
    const handleRemoveItem = () => {
       axios.delete(`http://localhost:3000/customer/cart/delete/${productId}`,)
        .then(res=>res.data)
        .then(data=>{
            removeFromCart(productId,size)
            openNotification(true,data.message,"Delete product in cart successfull !")
        })
        .catch(err=>{
            console.log(err)
        })
    };

    const total = price * quantity; // 

    return (
        <div className="px-4 py-2 w-full max-md:pr-5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
                    <div className="flex grow gap-5 items-center max-md:mt-10">
                        <button 
                            aria-label="Remove item" 
                            className="bg-transparent border-none cursor-pointer"
                            onClick={handleRemoveItem} 
                        >
                            <img 
                                loading="lazy" 
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b925c80243b74851184bff6598d6e13616e8dad34414177135b3e2bb9ca25896?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" 
                                alt="Remove" 
                                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" 
                            />
                        </button>
                        <img 
                            loading="lazy" 
                            src={image} 
                            alt={name} 
                            className="object-contain shrink-0 self-stretch max-w-full aspect-[0.65] w-[117px]" 
                        />
                        <div className="grow shrink self-stretch my-auto text-3xl font-semibold text-zinc-900 w-[303px]">{name}</div>
                        <div className="self-stretch my-auto text-xl text-black">{size}</div>
                    </div>
                </div>
                <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
                    <div className="flex gap-9 self-stretch my-auto w-full max-md:mt-10 max-md:max-w-full">
                        <div className="grow my-auto text-2xl leading-none text-black">{price} đ</div>
                        <Quantity value={quantity} onChange={handleQuantityChange} small /> {/* Sử dụng Quantity component */}
                        <div className="flex flex-col items-start">
                            <div className="mt-2 text-xl text-black">{total} đ</div> 
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-5 border-gray-300" />
        </div>
    );
}

export default CartItem;
