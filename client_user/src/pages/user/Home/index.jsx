import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import BestSelling from './BestSelling/bestselling';
import HotFashion from './HotFasion/hotfashion';
import ImageGallery from './ImageGallery/ImageGallery';
import CustomDesign from './CustomDesign/CustomDesign';

function Home() {
  return (
    <div className="flex flex-col items-center ">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://owen.cdn.vccloud.vn/media/amasty/webp/codazon/slideshow/h/e/hero_1366x532_061124_jpg.webp"
            alt="Banner 1"
            className="object-contain w-full aspect-[2.56] max-md:mt-10 max-md:max-w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://owen.cdn.vccloud.vn/media/codazon/slideshow/u/n/untitled-1_kaizen.jpg"
            alt="Banner 2"
            className="object-contain w-full aspect-[2.56] max-md:mt-10 max-md:max-w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://owen.cdn.vccloud.vn/media/codazon/slideshow/a/r/artboard_1-100.jpg"
            alt="Banner 3"
            className="object-contain w-full aspect-[2.56] max-md:mt-10 max-md:max-w-full"
          />
        </SwiperSlide>
      </Swiper>

      
      <BestSelling />
      <ImageGallery/>
      <HotFashion />
      <CustomDesign/>

    </div>
  );
}
export default Home;
