import React from 'react';
import ProductCardb from '../../Productcard';
import { useState,useEffect } from 'react';
import axios from "axios"
const HotFashion = () => {
  const[products, setProduct] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:3000/products/list-product")
      .then(res=>{
        if(res.data.status){
          setProduct(res.data.products)
        }
      })
      .catch(err=>console.log(err))
  },[])


  return (
    <section className="mt-32 ml-4 max-md:mt-10 max-md:max-w-full">
      <h2 className="text-5xl font-medium text-green-900 max-md:text-4xl">THỜI TRANG HOT</h2>
      <div className="mt-9 w-full max-w-[1474px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 max-md:flex-col">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <ProductCardb {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotFashion;