import React from 'react';

const AccountSettings = () => {
  return (
    <section className="flex flex-col items-start min-h-[615px] max-md:mt-9 max-md:max-w-full">
      <div className="flex overflow-hidden flex-col pb-6 max-w-full bg-white rounded border border-gray-200 border-solid w-[984px]">
        <h2 className="px-6 py-6 text-3xl font-medium leading-none uppercase bg-white rounded border border-gray-200 border-solid text-zinc-900 max-md:px-5 max-md:max-w-full">
          Cài đặt tài khoản
        </h2>
        <form className="flex flex-col mt-9 ml-6 max-w-full w-[777px]">
          <div className="flex flex-col items-start min-h-[409px] max-md:max-w-full">
            <div className="flex gap-4 items-start max-w-full w-[360px]">
              <div className="flex flex-col min-w-[240px] w-[360px]">
                <label htmlFor="username" className="text-2xl leading-none text-zinc-900">
                  Tên người dùng
                </label>
                <input
                  type="text"
                  id="username"
                  className="px-4 py-3 mt-2 w-full text-lg leading-none bg-white rounded-sm border border-gray-200 border-solid text-neutral-600 max-md:pr-5"
                  placeholder="Nhập tên người dùng"
                />
              </div>
            </div>
            <div className="flex flex-col mt-3 max-w-full w-[360px]">
              <div className="flex flex-col w-full">
                <label htmlFor="fullname" className="text-2xl leading-none text-zinc-900">
                  Tên đầy đủ
                </label>
                <input
                  type="text"
                  id="fullname"
                  className="px-4 py-3 mt-2 w-full text-lg leading-none bg-white rounded-sm border border-gray-200 border-solid text-neutral-600 max-md:pr-5"
                  placeholder="Nhập tên"
                />
              </div>
              <div className="flex flex-col mt-4 w-full">
                <label htmlFor="email" className="text-2xl leading-none text-zinc-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="px-4 py-3 mt-2 w-full text-lg leading-none bg-white rounded-sm border border-gray-200 border-solid text-neutral-600 max-md:pr-5"
                  placeholder="Nhập email"
                />
              </div>
            </div>
            <div className="flex gap-4 items-start mt-3 max-w-full w-[360px]">
              <div className="flex flex-col min-w-[240px] w-[360px]">
                <label htmlFor="phone" className="text-2xl leading-none text-zinc-900">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="px-4 py-3 mt-2 w-full text-lg leading-none whitespace-nowrap bg-white rounded-sm border border-gray-200 border-solid text-neutral-600 max-md:pr-5"
                  placeholder="+89"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-start self-stretch mt-3 max-md:max-w-full">
              <div className="flex flex-col min-w-[240px] w-[360px]">
                <label htmlFor="country" className="text-2xl leading-none text-zinc-900">
                  Quốc gia/khu vực
                </label>
                <select
                  id="country"
                  className="flex overflow-hidden gap-10 justify-center px-4 py-3 mt-2 w-full text-lg leading-none bg-white rounded-sm border border-gray-200 border-solid text-neutral-600"
                >
                  <option>Việt Nam</option>
                </select>
              </div>
              <div className="flex flex-col w-[213px]">
                <label htmlFor="city" className="text-2xl leading-none text-zinc-900">
                  Tỉnh/Thành phố
                </label>
                <select
                  id="city"
                  className="flex overflow-hidden gap-10 justify-center px-4 py-3 mt-2 w-full text-lg leading-none bg-white rounded-sm border border-gray-200 border-solid text-neutral-600"
                >
                  <option>TP.Hồ Chí Minh</option>
                </select>
              </div>
              <div className="flex flex-col whitespace-nowrap w-[172px]">
                <label htmlFor="district" className="text-2xl leading-none text-zinc-900">
                  Quận/Huyện
                </label>
                <input
                  type="text"
                  id="district"
                  className="px-4 py-3 mt-2 w-full text-lg leading-none bg-white rounded-sm border border-gray-200 border-solid text-neutral-600 max-md:pr-5"
                  placeholder="9"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="gap-2 self-start px-6 mt-4 text-sm font-bold tracking-normal leading-10 text-white uppercase bg-green-900 rounded-sm min-h-[67px] max-md:px-5 max-md:ml-2">
            Cập nhật
          </button>
        </form>
      </div>
    </section>
  );
};

export default AccountSettings;