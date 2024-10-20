import React from 'react';

function Breadcrumb() {
  return (
    <nav className="flex flex-wrap gap-3.5 items-center px-10 py-8 text-2xl rounded-lg bg-slate-100 min-h-[96px]" aria-label="Breadcrumb">
      <a href="#" className="self-stretch my-auto text-green-900 text-opacity-50">Trang chủ</a>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/946e274fa0d83e8bebc6a4678ac22964fe90e9e1924ee83dcbfdbef6684eefb9?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
      <span className="self-stretch my-auto font-semibold text-green-900">Đặt hàng</span>
    </nav>
  );
}

export default Breadcrumb;