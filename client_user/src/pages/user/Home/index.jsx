import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import ProductCard from '../Productcard';
import products from '../Products';
import BestSelling from './BestSelling/bestselling';
import HotFashion from './HotFasion/hotfashion';
import ImageGallery from './ImageGallery/ImageGallery';
import CustomDesign from './CustomDesign/CustomDesign';
import InfoSection from './InfoSection/InfoSection';
function Home() {
  return (
    <div className="flex flex-col items-center">
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
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d6c1932e7205cd05b749dcf6350cee7f8eea3c2039e669285bfcd113bf0a58b?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
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
  <InfoSection/>
    </div>
  );
}

export default Home;
