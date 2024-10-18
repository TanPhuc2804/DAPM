import React, { useState } from 'react';

function Sidebar() {
  const [price, setPrice] = useState(0);

  const handleSliderChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div className="flex flex-col px-2 pt-3 mt-0 max-w-full bg-white rounded-lg border border-solid border-zinc-100 pb-24 w-[280px] max-md:pb-24 max-md:mt-0"> {/* Giảm width và padding */}
      <div className="flex flex-col pl-2.5 w-full">
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl font-medium text-indigo-950">GIÁ TỐT</h2> 
            <a href="#" className="self-start mt-2 ml-2 text-lg font-light text-black max-md:ml-2.5"> 
              Quần tây
            </a>
          </div>
          <button aria-label="Toggle price filter" className="self-start mt-2.5">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/004cf0c20619e8b5f5b81040c858f694ef630e03314600a2322cfc0c76feba8b?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" className="object-contain shrink-0 w-3 aspect-[1.56] fill-indigo-950" alt="" /> {/* Giảm kích thước img */}
          </button>
        </div>
        <a href="#" className="self-start mt-3 ml-2 text-lg font-light text-black max-md:ml-2.5"> {/* Giảm kích thước font */}
          Áo sơ mi
        </a>
        <a href="#" className="self-start mt-2 ml-2 text-lg font-light text-black max-md:ml-2.5"> {/* Giảm kích thước font */}
          áo polo
        </a>
        <div className="flex shrink-0 mt-5 h-px bg-zinc-300"></div>
      </div>

      <div className="flex flex-col pl-2.5 py-4 w-full"> {/* Giảm padding */}
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl font-medium text-indigo-950">Áo</h2> {/* Giảm kích thước font */}
            <a href="#" className="self-start mt-2 ml-2 text-lg font-light text-black max-md:ml-2.5"> {/* Giảm kích thước font */}
              Áo khoác
            </a>
          </div>
          <button aria-label="Toggle price filter" className="self-start mt-2.5">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/004cf0c20619e8b5f5b81040c858f694ef630e03314600a2322cfc0c76feba8b?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" className="object-contain shrink-0 w-3 aspect-[1.56] fill-indigo-950" alt="" /> {/* Giảm kích thước img */}
          </button>
        </div>
        <a href="#" className="self-start mt-3 ml-2 text-lg font-light text-black max-md:ml-2.5"> {/* Giảm kích thước font */}
          Áo sơ mi
        </a>
        <a href="#" className="self-start mt-2 ml-2 text-lg font-light text-black max-md:ml-2.5"> {/* Giảm kích thước font */}
          áo polo
        </a>
        <div className="flex shrink-0 mt-5 h-px bg-zinc-300"></div>
      </div>

      {/* Phần hiển thị thanh kéo giá tiền */}
      <div className="flex flex-col mt-5 w-full whitespace-nowrap rounded-none">
        <h2 className="text-xl font-medium text-indigo-950 mb-2">Khoảng giá (VND)</h2> {/* Giảm kích thước font */}
        <input
          type="range"
          min="0"
          max="20000000" // Giới hạn giá trị tối đa
          step="100000" // Bước giá trị tăng/giảm
          value={price}
          onChange={handleSliderChange}
          className="w-full mt-2"
        />
        <div className="mt-3 text-lg text-indigo-950"> {/* Giảm kích thước font */}
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
        </div>
        <div className="flex shrink-0 mt-5 h-px bg-zinc-300"></div>
      </div>

      <div className="flex flex-col mt-5 w-full whitespace-nowrap rounded-none">
        <button className="flex gap-5 justify-between text-xl font-medium text-indigo-950" aria-expanded="false">
          <span>Size</span>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c597e878472ffb0e95f10618c75861ab1c33a2e04b1d4cb23bd08c570d7b107?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" className="object-contain shrink-0 self-start mt-2.5 w-3 aspect-[2] fill-indigo-950" alt="" />
        </button>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/647a99b98e667bc78ae1552df51b9dc99e33986ed23eb759c68eb68b83449b55?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" className="object-contain mt-5 w-full rounded-none aspect-[21.74]" alt="Size range slider" />
        <div className="flex gap-8 self-start mt-4 text-sm leading-8 text-indigo-950">
          <div className="px-2 py-1.5 rounded-xl border border-solid border-neutral-200 min-h-[41px]">
            5
          </div>
          <div className="px-2 py-1.5 rounded-xl border border-solid border-neutral-200 min-h-[41px]">
            10
          </div>
        </div>
        <div className="flex shrink-0 mt-5 h-px bg-zinc-300"></div>
      </div>
    </div>
  );
}

export default Sidebar;
