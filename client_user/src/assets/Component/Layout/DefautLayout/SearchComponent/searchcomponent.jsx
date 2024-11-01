import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductItem = ({ image, productName }) => {
  return (
    <div className="flex items-center p-3 w-full border-b border-gray-200 last:border-0">
      {/* Hình ảnh sản phẩm */}
      <img 
        loading="lazy" 
        src={image} 
        alt={productName} 
        className="object-contain shrink-0 aspect-square w-8 h-8 mr-3" 
      />
      {/* Thông tin sản phẩm */}
      <div className="flex-1 text-sm text-zinc-800">
        {productName}
      </div>
    </div>
  );
};

const SearchComponent = () => {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    axios.get('http://localhost:3000/products/list-product')
      .then(res => {
        if (res.data.status) {
          setProducts(res.data.products); 
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase(); 
    setSearchTerm(searchValue);

    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchValue)
    );

    setFilteredProducts(filtered); 
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <input
          type="text"
          className="form-input pl-10 pr-4 py-2 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring focus:ring-green-200 focus:border-green-300 transition-all duration-300 ease-in-out w-48 focus:w-64"
          placeholder="Bạn muốn tìm gì?"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Hiển thị sản phẩm sau khi tìm kiếm */}
      {searchTerm && (
        <section className="absolute flex flex-col max-w-[400px] bg-white rounded-3xl shadow-2xl p-2 mt-2 w-full z-50">
          <div className="flex flex-col w-full">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductItem
                  key={index}
                  imageSrc={product.imageSrc}
                  productName={product.name}
                />
              ))
            ) : (
              <p className="p-3 text-center text-gray-500">Không tìm thấy sản phẩm phù hợp.</p>
            )}
          </div>
        </section>
)}
    </div>
  );
};

export default SearchComponent;
