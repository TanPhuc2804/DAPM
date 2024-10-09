import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../../ProductCard'; // Sửa tên import nếu cần
import products from '../../Products'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BestSelling = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    <section className="mt-28 max-md:mt-10">
      <h2 className="text-6xl font-medium text-green-900 max-md:text-4xl">Best Selling</h2>
      <p className="mt-9 text-2xl font-medium text-green-900 max-md:max-w-full">
        Get in on the trend with our curated selection of best-selling styles.
      </p>
      <Slider {...settings} className="mt-16 max-md:mt-10">
        {products.BestSelling.length > 0 ? (
          products.BestSelling.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </Slider>
      <button className="flex justify-center py-4 mt-5 w-56 text-2xl font-medium text-green-900 rounded border-2 border-green-900 border-solid max-md:px-5">
        See all
      </button>
    </section>
  );
};

export default BestSelling;
