import React, { useState, useEffect } from 'react';
import ProductCard from '../../Productcard';
import axios from "axios";
import { useParams } from 'react-router-dom';

const ProductGrid = () => {
    const { id } = useParams();
    const [listProduct, setProduct] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(''); 

    useEffect(() => {
        axios.get(`http://localhost:3000/products/list-product-category/${id}`)
            .then(res => {
                console.log(res.data);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
