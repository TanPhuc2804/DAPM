// FinalOrder.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderStatus from './StateStatus/statestatus';
import OrderItem from './StateItems/stateitem';


const FinalOrder = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/order/list-order`);
        if (Array.isArray(response.data.order)) {
          setOrderItems(response.data.order);
        } else {
          console.error('Expected an array, but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };

    fetchOrderItems();
  }, []);

  const filteredOrders = selectedStatus === 'all'
    ? orderItems
    : orderItems.filter((item) => item.stateOrder === selectedStatus);

  return (
  <div className="max-w-7xl mx-auto px-4 py-6">
  <h1 className="text-3xl font-bold text-center">Đơn Hàng Của Bạn</h1>
  <OrderStatus setSelectedStatus={setSelectedStatus} selectedStatus={selectedStatus} />

  <div className="flex flex-wrap gap-5 justify-between mt-5 tracking-normal max-md:max-w-full">
    <div className="flex gap-5 text-4xl">
      <div
        data-layername="mall"
        className="overflow-hidden px-7 py-3.5 leading-none text-white whitespace-nowrap bg-red-600 rounded-md max-md:px-5"
      >
        Mall
      </div>
      <div data-layername="fmen" className="font-bold leading-5 text-black">
        <div className="flex">
          <span className="text-5xl text-green-900 uppercase leading-[63px] tracking-[5px]">F</span>
          <span className="text-5xl text-orange-400 uppercase leading-[63px] tracking-[5px]">M</span>
          <span className="text-5xl text-green-900 uppercase leading-[63px] tracking-[5px]">EN</span>
        </div>
      </div>
    </div>
    <div className="flex gap-8 my-auto text-2xl leading-none">
      <div data-layername="chờXacNhận" className="grow text-emerald-300">
        Chờ xác nhận
      </div>
      <div className="flex gap-2.5 text-orange-600">
        <div className="shrink-0 w-px border border-solid border-neutral-400 h-[25px]" />
        <div data-layername="daThanhToan" className="my-auto basis-auto">
          Đã thanh toán
        </div>
      </div>
    </div>
  </div>
  <div className="border-b border-gray-300 my-4" />
  {filteredOrders.length > 0 ? (
    filteredOrders.map((item) => (
      <div key={item._id} className="border-b border-gray-300 py-4">

        {item.order_details.map(detail => {
          console.log(detail);
          return (
            <OrderItem
              key={detail._idProduct}
              image={detail.img}
              name={detail.name}
              size={detail.size}
              quantity={detail.quantity}
              price={detail.price}
            />
          );
        })}
      </div>
    ))
  ) : (
    <p className="text-center mt-5 text-gray-500">Không có đơn hàng nào.</p>
  )}
</div>

  );
};

export default FinalOrder;