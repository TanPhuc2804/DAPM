import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../../../../../pages/user/ListProduct/Breadcrumb/Breadcrumb';

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/list-product-category/${id}`);
        if (res.data.status) {
          setProducts(res.data.products);
          setCategoryName(res.data.categoryName); 
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [id]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <Breadcrumb categoryName={categoryName} />
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
