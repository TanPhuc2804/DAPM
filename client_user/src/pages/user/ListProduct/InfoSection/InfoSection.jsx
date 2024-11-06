import React from 'react';

function InfoSection() {
  return (
    <section className="flex flex-col justify-center items-center px-8 py-20 mt-20 w-full bg-zinc-300 max-md:px-4 max-md:mt-10">
      <div className="w-full max-w-[1200px]">
        <div className="flex gap-8 max-md:flex-col">
          <div className="flex flex-col w-[70%] max-md:w-full">
            <div className="flex flex-col w-full gap-6">
              <div className="flex flex-wrap gap-8 text-xl font-bold leading-tight text-black max-md:text-lg">
                <div className="flex items-center gap-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bfb33ad30e1261c0b5900c432780319caa1bbf14b628aecb0e37b20945b346f?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
                    className="object-contain w-16"
                    alt="Thanh toán & giao hàng"
                  />
                  <span>THANH TOÁN & GIAO HÀNG</span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/565c6d49c264bc7ea31c9491b52c7043ba000a513b9c35aece9e1470f0d80cb1?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
                    className="object-contain w-16"
                    alt="Giờ mở cửa"
                  />
                  <span>GIỜ MỞ CỬA</span>
                </div>
              </div>
              <div className="mt-4 max-md:mt-6">
                <div className="flex gap-8 max-md:flex-col">
                  <div className="w-1/2 text-lg font-light tracking-wide max-md:w-full">
                    Miễn phí vận chuyển cho các đơn hàng trên 599.000 VNĐ
                    <br />- Giao hàng và thu tiền tận nơi - Chuyển khoản và giao hàng - Mua hàng tại shop
                  </div>
                  <div className="w-1/2 text-lg font-light tracking-wide max-md:w-full">
                    <span className="font-semibold">8h30 đến 22:00</span> - Tất cả các ngày trong tuần - Áp dụng cho tất cả các chi nhánh hệ thống cửa hàng FMEN
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[30%] max-md:w-full">
            <div className="flex flex-col gap-4 text-xl text-black max-md:text-lg">
              <div className="flex items-center gap-4 font-medium">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/103e82eb673c3d6986c7588429ee24345237cc6016207acf485fe16a2449f647?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
                  className="object-contain w-16"
                  alt="Hỗ trợ 24/7"
                />
                <span>HỖ TRỢ 24/7</span>
              </div>
              <div className="text-lg font-light tracking-wide">
                Gọi ngay cho chúng tôi khi bạn có thắc mắc - 0774218430
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
