import React from 'react';
import { useCart } from '../CartContext/cartcontext';
import { Link } from 'react-router-dom';
function CartSummary({cartItems}) {
    // tổng giá trị của giỏ hàng
    const total = cartItems.length >-1 ? cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity
    }, 0): 0; // tinh lần lượt từng sản phẩm
    console.log("[Cart Summary]",typeof(cartItems))
    return (
        <div className="flex flex-col ml-5 w-[31%] max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden flex-col justify-center items-center pb-6 mx-auto w-full bg-white rounded border border-gray-200 border-solid min-h-[471px] max-md:max-w-full">
                <h2 className="gap-2.5 px-6 py-5 max-w-full text-3xl font-medium leading-none text-zinc-900 w-[424px] max-md:px-5">
                    Card Totals
                </h2>
                <div className="flex flex-col pb-6 max-w-full w-[376px]">
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
                            <div className="self-stretch my-auto font-medium text-zinc-900">0</div>
                        </div>
                    </div>
                    <div className="mt-4 w-full bg-gray-200 border border-gray-200 border-solid min-h-[1px]" />
                    <div className="flex gap-10 justify-between items-center mt-4 w-full text-3xl leading-none">
                        <div className="self-stretch my-auto text-zinc-900">Tổng cộng</div>
                        <div className="self-stretch my-auto text-green-900">{total} đ</div>
                    </div>
                </div>
                <Link to="/customer/order" state={{ cartItems }} className="flex gap-3 justify-center items-center px-8 max-w-full text-2xl font-bold tracking-wide text-white uppercase bg-green-900 rounded leading-[56px] w-[376px] max-md:px-5">
                    <span className="self-stretch my-auto">Đặt hàng</span>
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/74d0a6f01a231e01c69ace0cdebd528f5732141fec6416bc339330bdc548e330?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" alt="" className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />
                </Link>
            </div>
        </div>
    );
}

export default CartSummary;
