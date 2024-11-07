import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchComponent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false); // Trạng thái hiển thị kết quả tìm kiếm
  const searchRef = useRef(null); // Tham chiếu tới input tìm kiếm
  const resultsRef = useRef(null); // Tham chiếu tới phần kết quả tìm kiếm

  // Lấy danh sách sản phẩm từ API
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

  // Hàm tìm kiếm
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchValue)
    );

    setFilteredProducts(filtered);
    setIsVisible(true); // Hiển thị kết quả khi người dùng nhập gì đó
  };

  // Hàm đóng kết quả khi nhấn ra ngoài
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target) && resultsRef.current && !resultsRef.current.contains(e.target)) {
      setIsVisible(false); // Đóng kết quả tìm kiếm
    }
  };

  // Lắng nghe sự kiện click ra ngoài
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener khi component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Hàm xử lý khi chọn sản phẩm
  const handleProductSelect = () => {
    setIsVisible(false); // Đóng kết quả tìm kiếm
    setSearchTerm(''); // Xóa nội dung của input tìm kiếm
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <input
          ref={searchRef}
          type="text"
          className="form-input pl-10 pr-4 py-2 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring focus:ring-green-200 focus:border-green-300 transition-all duration-300 ease-in-out w-48 focus:w-64 z-999"
          placeholder="Bạn muốn tìm gì?"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Hiển thị sản phẩm sau khi tìm kiếm */}
      {isVisible && searchTerm && (
        <section ref={resultsRef} className="absolute top-full mt-2 max-w-[400px] bg-white rounded-3xl shadow-2xl w-full z-[1000]">
          <div className="flex flex-col w-full">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  onClick={handleProductSelect} // Gọi hàm khi chọn sản phẩm
                  className="flex items-center p-3 border-b border-gray-200 last:border-0 hover:bg-gray-100"
                >
                  <img
                    loading="lazy"
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-16 h-16 mr-3"
                  />
                  <div className="text-sm text-zinc-800">
                    {product.name}
                  </div>
                </Link>
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
