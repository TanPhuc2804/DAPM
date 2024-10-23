import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import HeroBanner from './HeroBanner/Banner';
import Sidebar from './sidebar/sidebar';
import ProductGrid from './ProductGrid/ProductGrid';
import InfoSection from './InfoSection/InfoSection';
import { useParams } from 'react-router-dom';

function ListProduct() {
    const { id } = useParams(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/products/list-product-category/${id}`, {
                    headers: {
                        Authorization: `Bearer ${yourAuthToken}`, // Add your token here
                    }
                });

                if (res.data.status) {
                    setProducts(res.data.products);
                    setCategoryName(res.data.categoryName); 
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex overflow-hidden flex-col bg-white">
            <main>
                <Breadcrumb categoryName={categoryName} />
                <HeroBanner category={categoryName ? categoryName.toLowerCase() : ''} /> 
                <div className="flex max-w-auto mx-auto p-5">
                    <div className="w-[200px] sticky top">
                        <Sidebar />
                    </div>

                    <div className="flex-1 ml-5">
                        <ProductGrid categoryId={id} products={products} /> 
                    </div>
                </div>
                <InfoSection />
            </main>
        </div>
    );
}

export default ListProduct;
