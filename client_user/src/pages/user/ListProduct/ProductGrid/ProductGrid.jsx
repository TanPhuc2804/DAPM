import React, { useState, useEffect } from 'react';
import ProductCard from '../../Productcard';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductGrid = () => {
    const { id } = useParams();
    const listProduct = useSelector(state=>state.product.productTemps)

    return (
        <section className="mt-custom ml-4 max-md:mt-10 max-md:max-w-full">
            <div className="mt-0 w-full max-w-[1474px] max-md:max-w-full">
                <div className="flex flex-wrap gap-5 max-md:flex-col">
                    {listProduct.map((product, index) => (
                        <div key={index} className="flex flex-col w-[30%] max-md:ml-0 my-0 max-md:w-full">
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
