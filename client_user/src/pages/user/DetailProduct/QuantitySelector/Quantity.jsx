import React, { useState } from 'react';

const Quantity = () => {
  const [quantity, setQuantity] = useState(1);

  // Tăng số lượng
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Giảm số lượng
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); 
  };

  return (
    <div className="flex gap-2 items-center justify-center px-4 sm:px-6 mt-2 pt-2 pb-2 text-lg font-bold text-green-900 whitespace-nowrap bg-zinc-100 rounded-[30px] max-md:px-5">
      <button className="bg-zinc-100 text-xl px-4 py-2 " onClick={decreaseQuantity}>-</button>
      <div className="text-2xl flex justify-center items-center">{quantity}</div>
      <button className="bg-zinc-100 text-xl px-4 py-2 " onClick={increaseQuantity}>+</button>
    </div>
  );
};

export default Quantity;
