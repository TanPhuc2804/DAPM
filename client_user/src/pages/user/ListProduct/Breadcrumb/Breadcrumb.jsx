import React from 'react';

function Breadcrumb() {
  return (
    <nav
      className="flex flex-wrap gap-2 items-center px-6 py-1 text-xl rounded-sm bg-slate-100 min-h-[50px] text-green-900 text-opacity-50"
      aria-label="Breadcrumb"
    >
      <a href="http://localhost:3000/" className="self-stretch my-auto">Trang chủ</a>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/946e274fa0d83e8bebc6a4678ac22964fe90e9e1924ee83dcbfdbef6684eefb9?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
        className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
        alt=""
      />
      <a href="#" className="self-stretch my-auto">Quần</a>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/946e274fa0d83e8bebc6a4678ac22964fe90e9e1924ee83dcbfdbef6684eefb9?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
        className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
        alt=""
      />
      <span
        className="self-stretch my-auto font-semibold text-green-900"
        aria-current="page"
      >
        Quần Tây
      </span>
    </nav>
  );
}

export default Breadcrumb;
