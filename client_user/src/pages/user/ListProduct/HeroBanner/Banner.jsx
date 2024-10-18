import React from 'react';

function HeroBanner() {
  return (
    <section className="relative flex items-center justify-between px-10 pt-15 pb-24 w-full min-h-[400px] bg-white rounded-2xl overflow-hidden max-md:flex-col max-md:px-5 max-md:pt-24 max-md:pb-28 max-md:max-w-full">
      {/* Phần hình ảnh */}
      <div className="absolute inset-0 z-0 ">
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cbf4961d6fea2deb096eec8f2c9ef5cdccf51610b8e75055c48a99c39d881a91?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" 
          className="object-cover w-full h-15" 
          alt="Background image of men's trousers" 
        />
      </div>
      {/* Phần chữ */}
      <div className="relative z-10 flex flex-col w-1/2 p-5 rounded-lg max-md:w-full max-md:bg-white max-md:mt-6">
        <h1 className="font-bold uppercase tracking-[1px] text-left text-3xl max-md:text-2xl">
          Quần tây nam
        </h1>
        <p className="leading-[40px] mt-4 text-left text-xl max-md:text-lg">
          Quần tây nam đa dạng phong cách từ thanh lịch cho đến hiện đại, cùng chất liệu cao cấp của FMEN sẽ giúp bạn xây dựng một phong cách riêng đầy khác biệt.
        </p>
      </div>
    </section>
  );
}

export default HeroBanner;
