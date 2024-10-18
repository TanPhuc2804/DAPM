import React, { useState } from 'react';

// Thành phần cho từng danh mục
const CategoryItem = ({ name, color, onClick, isSelected }) => (
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
      borderLeft: `5px solid ${color}`, 
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
          <input 
            type="text" 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)} 
            placeholder="Nhập tên danh mục" 
            style={{ border: 'none', outline: 'none', width: '80px' }}
          />
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
  const [categories, setCategories] = useState([
    { name: 'Áo', color: '#ff0000' },
    { name: 'Quần', color: '#00ff00' },
    { name: 'Giày', color: '#ffff00' },
    { name: 'Phụ kiện', color: '#00ccff' },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleAddCategory = (name) => {
    setCategories([...categories, { name, color: '#ff00ff' }]);
    setIsAddingCategory(false);
  };

  const handleDeleteCategory = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      setCategories(categories.filter((_, i) => i !== selectedIndex));
      setSelectedIndex(null);
    }
  };

  const handleEditCategory = () => {
    const newName = prompt("Nhập tên mới cho danh mục:", categories[selectedIndex].name);
    if (newName) {
      const updatedCategories = categories.map((category, i) =>
        i === selectedIndex ? { ...category, name: newName } : category
      );
      setCategories(updatedCategories);
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
            color={category.color} 
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
