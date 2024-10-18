import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../../ProductCard';
import products from '../../Products'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 bg-green-400 rounded-full text-white vcursor-pointer transition-transform duration-200 ease-in-out hover:bg-green-700 hover:scale-110"
      onClick={onClick}
    >
      &lt;
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 bg-green-400 rounded-full text-white cursor-pointer transition-transform duration-200 ease-in-out hover:bg-green-700 hover:scale-110"
      onClick={onClick}
    >
      &gt;
    </div>
  );
};

const BestSelling = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <section className="mt-20 w-screen flex flex-col items-center justify-center">
      <h2 className="text-6xl font-medium text-green-900 max-md:text-4xl">Best Selling</h2>
      <p className="mt-9 text-2xl font-medium text-green-900 max-md:max-w-full text-center">
        Get in on the trend with our curated selection of best-selling styles.
      </p>
      <div className="w-full h-full flex items-center justify-center mt-16 max-md:mt-10 relative">
        <Slider {...settings} className="w-3/4 h-auto max-md:w-full">
          {products.BestSelling.length > 0 ? (
            products.BestSelling.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </Slider>
      </div>
      <button className="flex justify-center py-4 mt-12 w-56 text-2xl font-medium text-green-900 rounded border-2 border-green-900 border-solid max-md:px-5">
        See all
      </button>
    </section>
  );
};

export default BestSelling;
