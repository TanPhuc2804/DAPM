// OrderStatus.js
import React from 'react';

const statusTabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'waiting', label: 'Chờ xác nhận' },
  { id: 'confirmed', label: 'Đã xác nhận' },
  { id: 'shipping', label: 'Vận chuyển' },
  { id: 'delivered', label: 'Đã giao' },
  { id: 'success', label: 'Hoàn thành' }, 
  { id: 'cancelled', label: 'Đã hủy' },
  { id: 'paymented', label: 'Đã thanh toán' }
];

export default function OrderStatus({ setSelectedStatus, selectedStatus }) {
  return (
    <nav className="flex justify-around  bg-white shadow-md text-xl border-b border-gray-300 w-full">
      {statusTabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setSelectedStatus(tab.id)}
          className={`cursor-pointer flex-1 text-center py-5 transition-all duration-200 ease-in-out ${
            tab.id === selectedStatus ? 'text-orange-600 border-b-2 border-orange-600 font-semibold' : 'text-gray-600'
          }`}
          role="tab"
          aria-selected={tab.id === selectedStatus}
        >
          {tab.label}
        </div>
      ))}
    </nav>
  );
}
