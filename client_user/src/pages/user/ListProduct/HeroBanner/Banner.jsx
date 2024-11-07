import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

function HeroBanner() {
  // Các ảnh trong slider
  const images = [
    'https://owen.cdn.vccloud.vn/media/codazon/slideshow/s/l/slide_061124.jpg',
    'https://owen.cdn.vccloud.vn/media/codazon/slideshow/s/l/slide2_061124.jpg',
  ];

  return (
    <section className="relative flex items-center justify-between w-full min-h-[100px] bg-white rounded-2xl overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={image}
                alt={`Hero banner ${index + 1}`}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </section>
  );
}

export default HeroBanner;
