import React from 'react';

function InfoSection() {
  return (
    <section className="flex flex-col justify-center items-center px-16 py-20 mt-40 w-full bg-zinc-300 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="ml-4 w-full max-w-[1496px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[73%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-wrap gap-5 justify-between max-w-full text-xl font-bold leading-tight text-black">
                <div className="flex gap-6 flex-1">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bfb33ad30e1261c0b5900c432780319caa1bbf14b628aecb0e37b20945b346f?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" className="object-contain shrink-0 aspect-square w-[68px]" alt="" />
                  <div className="flex-auto my-auto text-left"> {/* Thêm class text-left */}
                    THANH TOÁN & GIAO HÀNG
                  </div>
                </div>
                <div className="flex gap-3.5 flex-1">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/565c6d49c264bc7ea31c9491b52c7043ba000a513b9c35aece9e1470f0d80cb1?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" className="object-contain shrink-0 aspect-square w-[68px]" alt="" />
                  <div className="my-auto basis-auto text-left"> 
                    GIỜ MỞ CỬA
                  </div>
                </div>
              </div>
              <div className="mt-2 ml-6 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="text-xl font-light leading-8 text-black tracking-[4px] max-md:mt-10 text-left"> {/* Thêm class text-left */}
                      Miễn phí vẫn chuyển cho các đơn hàng trên 599.000VNĐ
                      <br />- Giao hàng và thu tiền tận nơi - Chuyển khoản và giao hàng - Mua hàng tại shop
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="text-xl font-light leading-8 text-black tracking-[4px] max-md:mt-10 text-left"> {/* Thêm class text-left */}
                      <span className="font-semibold">8h30 đến 22:00</span> - Tất cả các ngày trong tuần - Áp dụng cho tất cả các chi nhánh hệ thống cửa hàng FMEN
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[27%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full text-xl text-black max-md:mt-10">
              <div className="flex gap-5 self-start font-medium tracking-normal leading-none max-md:ml-2">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/103e82eb673c3d6986c7588429ee24345237cc6016207acf485fe16a2449f647?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" className="object-contain shrink-0 aspect-square w-[68px]" alt="" />
                <div className="my-auto basis-auto text-left"> 
                  Hỗ trợ 24/7
                </div>
              </div>
              <div className="text-xl font-light leading-8 text-black tracking-[4px] max-md:mt-10 text-left">
                <span className="font-semibold">0774218430</span> -  Gọi ngay cho chúng tôi khi bạn có thắc mắc
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
