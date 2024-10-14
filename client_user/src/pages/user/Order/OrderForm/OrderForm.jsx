import React from 'react';

function OrderForm() {
  return (
    <form className="flex flex-col grow shrink items-start min-w-[240px] w-full max-w-[899px]">
      <div className="flex flex-col self-stretch w-full">
        <h2 className="text-3xl font-medium leading-none text-zinc-900">Thông tin đặt hàng</h2>
        <div className="flex flex-col items-start mt-6 w-full max-w-full">
          <div className="flex flex-col sm:flex-row gap-4 items-start max-w-full w-full">
            <div className="flex flex-col min-w-[240px] flex-1">
              <label htmlFor="firstName" className="text-2xl leading-none text-zinc-900">
                Tên người dùng
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First name"
                className="px-4 py-3 mt-2 w-full text-xl leading-none bg-white rounded-sm border border-gray-200 border-solid text-slate-500"
              />
            </div>
            <div className="flex flex-col min-w-[240px] flex-1">
              <label htmlFor="lastName" className="text-2xl leading-none text-zinc-900">
                Họ
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last name"
                className="px-4 py-3 mt-2 w-full text-xl leading-none bg-white rounded-sm border border-gray-200 border-solid text-slate-500"
              />
            </div>
          </div>

          <div className="flex flex-col mt-4 w-full">
            <label htmlFor="address" className="text-2xl leading-none text-zinc-900">Địa chỉ</label>
            <input
              type="text"
              id="address"
              className="mt-2 w-full bg-white rounded-sm border border-gray-200 border-solid min-h-[44px]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start mt-4 w-full">
            <div className="flex flex-col min-w-[240px] flex-1">
              <label htmlFor="country" className="text-2xl leading-none text-zinc-900">Quốc tịch</label>
              <select
                id="country"
                className="mt-2 px-4 py-3 w-full text-sm leading-none text-gray-400 bg-white rounded-sm border border-gray-200 border-solid"
              >
                <option value="">Chọn...</option>
              </select>
            </div>
            <div className="flex flex-col min-w-[240px] flex-1">
              <label htmlFor="city" className="text-2xl leading-none text-zinc-900">Tỉnh/Thành phố</label>
              <select
                id="city"
                className="mt-2 px-4 py-3 w-full text-sm leading-none text-gray-400 bg-white rounded-sm border border-gray-200 border-solid"
              >
                <option value="">Chọn...</option>
              </select>
            </div>
            <div className="flex flex-col min-w-[240px] flex-1">
              <label htmlFor="district" className="text-2xl leading-none text-zinc-900">Xã/Quận</label>
              <select
                id="district"
                className="mt-2 px-4 py-3 w-full text-sm leading-none text-gray-400 bg-white rounded-sm border border-gray-200 border-solid"
              >
                <option value="">Chọn...</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start mt-4 w-full">
            <div className="flex flex-col min-w-[240px] flex-1">
              <label htmlFor="email" className="text-2xl leading-none text-zinc-900">Email</label>
              <input
                type="email"
                id="email"
                className="mt-2 w-full bg-white rounded-sm border border-gray-200 border-solid min-h-[44px]"
              />
            </div>
            <div className="flex flex-col min-w-[240px] flex-1">
              <label htmlFor="phone" className="text-2xl leading-none text-zinc-900">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                className="mt-2 w-full bg-white rounded-sm border border-gray-200 border-solid min-h-[44px]"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default OrderForm;
