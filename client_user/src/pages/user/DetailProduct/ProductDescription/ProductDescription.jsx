import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDescription = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/list-product/${id}`)
      .then(res => {
        if (res.data.status) {
          setProduct(res.data.product); 
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className="flex flex-col mt-20 w-full max-w-[1367px] min-h-[1428px] max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col items-start pr-20 pb-12 max-w-full rounded-none w-[1054px] max-md:pr-5">
        <h2 className="text-3xl font-medium text-black">MÔ TẢ SẢN PHẨM:</h2>
        <p className="mt-8 text-2xl leading-7 text-gray-500 max-md:max-w-full">
          {product.description} 
        </p>
      </div>
      <h3 id="size-guide" className="mt-10 text-3xl font-medium leading-none text-black">HƯỚNG DẪN CHỌN SIZE</h3>
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a10488d8bcafa3a71a7a7dce8781c31221ccbc8edcf2d2999f1507e13a37a4c?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" 
        alt="Size guide chart" 
        className="object-contain mt-10 max-w-full aspect-[1.29] w-[1333px]" 
      />
    </section>
  );
};

export default ProductDescription;
