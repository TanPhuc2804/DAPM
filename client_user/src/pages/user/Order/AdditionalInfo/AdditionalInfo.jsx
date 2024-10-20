import React from 'react';

function AdditionalInfo() {
  return (
    <div className="flex flex-col mt-10 max-w-full w-[872px]">
      <h3 className="text-2xl font-medium leading-none text-zinc-900 max-md:max-w-full">Thông tin bổ sung</h3>
      <div className="flex overflow-hidden flex-col mt-6 w-full min-h-[188px]">
        <label htmlFor="orderNotes" className="text-2xl leading-none text-slate-500 max-md:max-w-full">
          Ghi chú đặt hàng <span className="text-slate-500">(Optional)</span>
        </label>
        <textarea
          id="orderNotes"
          placeholder="Ghi chú về đơn đặt hàng của bạn, ví dụ: Ghi chú đặc biệt để giao hàng"
          className="px-4 pt-3 pb-24 mt-2 w-full text-xl leading-none text-gray-400 bg-white rounded-sm border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
        ></textarea>
      </div>
    </div>
  );
}

export default AdditionalInfo;