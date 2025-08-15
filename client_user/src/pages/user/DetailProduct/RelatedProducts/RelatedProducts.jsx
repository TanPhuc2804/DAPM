import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../ProductCard';
import axios from 'axios';

const RelatedProducts = () => {
  const { id } = useParams(); 
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios.get("http://localhost:3000/products/list-product")
      .then(res => {

        if (res.data.status) {
          setRelatedProducts(res.data.products);
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

  if (relatedProducts.length === 0) {
    return <div>Không có sản phẩm liên quan</div>;
  }

  return (
    <section className="flex flex-col p-10 mt-10 w-full  max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <h2 className="self-start ml-12 text-2xl font-medium tracking-normal leading-none text-center text-green-500 max-md:ml-2.5">
        Sản phẩm liên quan
      </h2>
      <div className="mt-1 max-md:mr-2.5 max-md:max-w-full">
        <div className="flex flex-wrap gap-6 max-md:flex-col">
          {relatedProducts.slice(0, 4).map((product, index) => (
            <div key={index} className="flex flex-col w-[22%] max-md:ml-0 my-12 max-md:w-full">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
