import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import HeroBanner from './HeroBanner/Banner';
import Sidebar from './sidebar/sidebar';
import ProductGrid from './ProductGrid/ProductGrid';

import { useParams } from 'react-router-dom';

function ListProduct() {
    const { id } = useParams(); 
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/category/get-category/${id}`)
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

    return (
        <div className="flex overflow-hidden flex-col bg-white">
            <main>
                <Breadcrumb />
                <HeroBanner category={id} /> 
                <div className="flex max-w-auto mx-auto p-5">
                    <div className="w-[200px] sticky top">
                        <Sidebar />
                    </div>

                    <div className="flex-1 ml-5">
                        <ProductGrid categoryId={id} /> 
                    </div>
                </div>
                <InfoSection />
            </main>
        </div>
    );
}

export default ListProduct;
