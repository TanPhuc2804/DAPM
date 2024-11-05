import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Sidebar({ products = [], setFilteredProducts }) { // Thiết lập giá trị mặc định là mảng rỗng
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:3000/category/get-categorylist');
        if (res.data.status) {
          setCategories(res.data.categories);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/product-category/${categoryId}`);
  };

  const handlePriceRangeClick = (range) => {
    const [minPrice, maxPrice] = range.split('-').map(Number);
    
    // Kiểm tra products có phải là mảng và có dữ liệu
    if (Array.isArray(products) && products.length > 0) {
      const filtered = products.filter(product => {
        if (maxPrice) {
          return product.price >= minPrice && product.price <= maxPrice;
        }
        return product.price > minPrice; 
      });
      setFilteredProducts(filtered); 
      navigate(`/products/price-range/${range}`);
    } else {
      console.log("Không có sản phẩm nào để lọc");
      setFilteredProducts([]); // Đặt sản phẩm đã lọc về mảng rỗng nếu không có sản phẩm
    }
  };

  return (
    <div className="flex flex-col p-4 max-w-[280px] bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-indigo-950 mb-4">Danh Mục Sản Phẩm</h2>
      <div className="flex flex-col space-y-2">
        {categories.length > 0 ? (
          categories.map(category => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className="text-[#224F34] transition-all duration-300 ease-in-out text-lg hover:underline hover:scale-105 p-2 rounded-lg bg-gray-100 hover:bg-indigo-100"
            >
              {category.name}
            </button>
          ))
        ) : (
          <div className="text-gray-500">Không có danh mục nào</div>
        )}
      </div>

      <div className="flex flex-col mt-6">
        <h2 className="text-xl font-medium text-indigo-950 mb-2">Khoảng giá (VND)</h2>
        <div className="flex flex-col space-y-2">
          <button onClick={() => handlePriceRangeClick('0-100000')} className="text-lg text-indigo-950">
            0 - 100,000 VND
          </button>
          <button onClick={() => handlePriceRangeClick('100000-200000')} className="text-lg text-indigo-950">
            100,000 - 200,000 VND
          </button>
          <button onClick={() => handlePriceRangeClick('200000-500000')} className="text-lg text-indigo-950">
            200,000 - 500,000 VND
          </button>
          <button onClick={() => handlePriceRangeClick('500000+')} className="text-lg text-indigo-950">
            Trên 500,000 VND
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
