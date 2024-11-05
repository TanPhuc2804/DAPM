import React from 'react';


const OrderItem = ({ img, name, size, quantity, price }) => {
  return (
    <article className="flex gap-5 max-md:flex-col">
      <img
        loading="lazy"
        src={img}
        className="object-contain shrink-0 max-w-full aspect-[0.65] w-[200px] max-md:mt-10"
      />
      <div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow items-start mt-5 ml-5 text-2xl leading-none max-md:mt-10">
          <h3 className="self-stretch text-left text-4xl font-medium leading-none text-zinc-900">{name}</h3>
          <p className="mt-9 tracking-normal text-center text-zinc-700">Phân loại hàng: {size}</p>
          <p className="mt-5 tracking-normal text-center text-black">x{quantity}</p>
          <button className="px-5 py-1 mt-8 text-base tracking-normal leading-none text-lime-500 border border-lime-500 border-solid">
            Trả hàng miễn phí 15 ngày
          </button>
        </div>
      </div>
      <div className="flex flex-col ml-5 pt-12 w-[24%] max-md:ml-0 max-md:w-full">
        <p className="mt-8 text-2xl font-bold text-right text-lime-800 custom-underline">
          Tổng Tiền: {price} VND
        </p>
      </div>
    </article>
  );
};

export default OrderItem;
