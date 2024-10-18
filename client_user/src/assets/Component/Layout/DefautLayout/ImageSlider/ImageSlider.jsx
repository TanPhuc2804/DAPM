import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css'; 
import './ImageSlider.css'; 

const ImageSlider = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      style={{ width: '100%', height: '400px' }} // Điều chỉnh kích thước slider
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Slide ${index}`} className="object-cover w-full h-full" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
