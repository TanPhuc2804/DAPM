import React from 'react';

const SupportBanner = () => {
  return (
    <div className="flex overflow-hidden flex-col justify-center items-start px-3.5 py-1 w-full text-xl bg-stone-500 max-md:pr-5 max-md:max-w-full h-10">
      <div className="flex gap-1">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d0846087c6225d3d5a9744b8e5ed4f6b5c1cffa607de767163d4d95565d487b?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" alt="" className="object-contain shrink-0 aspect-square w-[40px]" />
        <div className="flex flex-auto gap-1.5 my-auto">
          <div className="grow text-white">Hỗ trợ khách hàng:</div>
          <div className="text-yellow-400 border border-solid basis-auto border-black border-opacity-50">
            0774218430
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportBanner;