import React from 'react';

const Quantity = ({ value, onChange, small }) => {
    const increaseQuantity = () => {
        onChange(value + 1);
    };

    const decreaseQuantity = () => {
        onChange(value > 1 ? value - 1 : 1);
    };

    // Tạo các class dựa trên prop 'small'
    const containerClass = small 
        ? "flex gap-1 items-center justify-center px-2 py-1 mt-1 text-sm font-medium text-green-900 bg-zinc-100 rounded-md"
        : "flex gap-2 items-center justify-center px-4 sm:px-6 mt-2 pt-2 pb-2 text-lg font-bold text-green-900 bg-zinc-100 rounded-[30px]";

    const buttonClass = small 
        ? "bg-zinc-100 text-sm px-2 py-1 hover:bg-zinc-200 rounded"
        : "bg-zinc-100 text-xl px-4 py-2 hover:bg-zinc-200 rounded";

    const valueClass = small 
        ? "text-sm px-2"
        : "text-2xl px-4";

    return (
        <div className={containerClass}>
            <button className={buttonClass} onClick={decreaseQuantity}>-</button>
            <div className={valueClass}>{value}</div>
            <button className={buttonClass} onClick={increaseQuantity}>+</button>
        </div>
    );
};

export default Quantity;
