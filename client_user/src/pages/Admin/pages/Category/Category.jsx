import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex, Input } from 'antd';
// Thành phần cho từng danh mục
const CategoryItem = ({ name, onClick, isSelected }) => (
  <div 
    onClick={(e) => { 
      e.stopPropagation(); // Ngăn sự kiện lan ra ngoài khi nhấn vào danh mục
      onClick();
    }} 
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '120px', 
      height: '60px', 
      backgroundColor: '#f0f0f0', 
      margin: '10px', 
      borderRadius: '10px', 
      borderLeft: '5px solid blue', 
      cursor: 'pointer',
      boxShadow: isSelected ? 'inset 0 0 0 1000px rgba(0, 0, 0, 0.1)' : 'none' // Hiệu ứng màu sẫm khi chọn
    }}
  >
    <span>{name}</span>
  </div>
);

// Thành phần thêm danh mục mới
const AddCategory = ({ onAdd, onCancelAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  
  const handleAddClick = () => {
    if (isAdding && newCategory) {
      onAdd(newCategory);
      setNewCategory('');
    }
    setIsAdding(!isAdding);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewCategory('');
    onCancelAdd(); // Gọi hàm để đặt lại trạng thái
  };

  return (
    <div 
      onClick={(e) => e.stopPropagation()} // Ngăn sự kiện lan ra ngoài khi nhấn vào phần thêm
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '120px', 
        height: '60px', 
        backgroundColor: '#f0f0f0', 
        margin: '10px', 
        borderRadius: '10px', 
        borderLeft: '5px solid #ff00ff' 
      }}
    >
      {isAdding ? (
        <>
         <Flex vertical gap={12}>
            <Input 
            type="text" 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)} 
            placeholder="Nhập tên danh mục" 
            style={{ border: 'none', outline: 'none', width: '80px' }}
          />
         </Flex>
          <button onClick={handleCancel} style={{marginRight: '10px', backgroundColor:'#FF3399',marginLeft: '10px'}}> Hủy </button>
          <button onClick={handleAddClick} style={{ marginLeft: '10px', backgroundColor: '#D8F3DC' }}>Thêm</button>
        </>
      ) : (
        <span style={{ fontSize: '24px', color: '#00cc0', cursor: 'pointer' }} onClick={handleAddClick}>
          +
        </span>
      )}
    </div>
  );
};

// Thành phần chính chứa danh sách danh mục
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3000/category/get-categorylist")
    .then(res => res.data)
    .then(data => {
       setCategories(data.categories)
    })
    .catch(err => console.log(err))
  },[])
 
  const handleAddCategory = async (name) => {
    try {
      const res = await axios.post("http://localhost:3000/category/create-category", { name });
      if (res.data.status) {
        // Thêm danh mục mới vào danh sách sau khi API thành công
        setCategories([...categories, res.data.category]);
        setIsAddingCategory(false);
      } else {
        alert("Thêm danh mục thất bại: " + res.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi thêm danh mục: ", error);
    }
  };
  

  const handleDeleteCategory = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      try {
        const categoryId = categories[selectedIndex]._id;
        const res = await axios.delete(`http://localhost:3000/category/delete-category/${categoryId}`);
        if (res.data.status) {
          // Xóa danh mục khỏi danh sách trong giao diện
          setCategories(categories.filter((_, i) => i !== selectedIndex));
          setSelectedIndex(null);
          alert("Xóa danh mục thành công");
        } else {
          alert("Xóa danh mục thất bại: " + res.data.message);
        }
      } catch (error) {
        console.error("Lỗi khi xóa danh mục: ", error);
        alert("Có lỗi xảy ra khi xóa danh mục.");
      }
    }
  };

  const handleEditCategory = async () => {
  const newName = prompt("Nhập tên mới cho danh mục:", categories[selectedIndex].name);
  if (newName) {
    try {
      const categoryId = categories[selectedIndex]._id;
      const res = await axios.put(`http://localhost:3000/category/update-category/${categoryId}`, { name: newName });
      if (res.data.status) {
        // Cập nhật danh mục trong danh sách
        const updatedCategories = categories.map((category, i) =>
          i === selectedIndex ? { ...category, name: newName } : category
        );
        setCategories(updatedCategories);
        alert("Cập nhật danh mục thành công");
      } else {
        alert("Cập nhật danh mục thất bại: " + res.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục: ", error);
      alert("Có lỗi xảy ra khi cập nhật danh mục.");
    }
  }
  setSelectedIndex(null);
};


  const handleCategoryClick = (index) => {
    setSelectedIndex(index);
    setIsAddingCategory(false); // Ẩn phần nhập liệu khi chọn danh mục khác
  };

  const handleOutsideClick = () => {
    setSelectedIndex(null);
    setIsAddingCategory(false); // Đặt lại khi nhấn vào khoảng trống
  };

  return (
    <div onClick={handleOutsideClick} style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        marginTop: '20px' 
      }}>
        {categories.map((category, index) => (
          <CategoryItem 
            key={index} 
            name={category.name} 
            onClick={() => handleCategoryClick(index)} 
            isSelected={index === selectedIndex} 
          />
        ))}
        <AddCategory 
          onAdd={handleAddCategory} 
          onCancelAdd={() => setIsAddingCategory(false)} 
        />
      </div>

      {/* Nút Sửa và Xóa */}
      {selectedIndex !== null && (
        <div style={{ 
          position: 'fixed', 
          top: '120px', 
          right: '10px', 
          display: 'flex', 
          gap: '10px' 
        }}>
          <button 
            onClick={handleEditCategory} 
            style={{ 
              backgroundColor: '#ffeb3b', 
              border: 'none', 
              padding: '10px 15px', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}
          >
            Sửa
          </button>
          <button 
            onClick={handleDeleteCategory} 
            style={{ 
              backgroundColor: '#f44336', 
              color: '#fff', 
              border: 'none', 
              padding: '10px 15px', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}
          >
            Xóa
          </button>
        </div>
      )}
    </div>
  );
}

export default Category;
