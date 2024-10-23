import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { message } from 'antd';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const ImageContainer = styled.div`
  width: 400px;
  height: 400px;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 100%;

  & > label {
    flex: 0.3;
    margin-right: 10px;
  }

   & > input, & > select {
    flex: 0.7; /* Chiếm 70% không gian */
  }
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  flex: 1;

  &.back {
    background-color: magenta;
    margin-right: 10px;
  }

  &.add {
    background-color: green;
  }
`;
const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    size: '',
    category: '',
    supplier: '',
    status: 'còn hàng',
    images: []
});

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [images, setImages] = useState([]);

  // useEffect(() => {
  //   // Lấy danh sách categories từ server
  //   axios.get("http://localhost:3000/category/get-categorylist")
  //     .then(res => setCategories(res.data.categories))
  //     .catch(err => console.log(err));
  
  //   // Lấy danh sách suppliers từ server
  //   axios.get("http://localhost:3000/supplier/list-supplier")
  //     .then(res => setSupplier(res.data.suppliers))
  //     .catch(err => console.log(err));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [categoriesRes, suppliersRes] = await Promise.all([
                axios.get('http://localhost:3000/category/get-categorylist'),
                axios.get('http://localhost:3000/supplier/list-supplier')
            ]);
            setCategories(categoriesRes.data.categories);
            setSuppliers(suppliersRes.data.suppliers);
        } catch (error) {
            message.error('Failed to load categories or suppliers');
        }
    };
    fetchData();
}, []);

const handleImageUpload = (e) => {
  
};

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('price', productData.price);
  formData.append('quantity', productData.quantity);
  formData.append('description', productData.description);
  formData.append('size', productData.size);
  formData.append('category', productData.category);
  formData.append('supplier', productData.supplier);
  formData.append('status',productData.status);
  for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
  }

  try {
      await axios.post('http://localhost:3000/products/create-product', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
      message.success('Product added successfully');
  } catch (error) {
      message.error('Failed to add product');
  }
};


  return (
    <Container>
       {/* <ImageContainer onClick={() => document.getElementById('fileInput').click()}>
          {selectedImage ? (
            <Image src={selectedImage} alt="Product" />
          ) : (
            <p>Nhấn để chọn ảnh</p>
          )}
        </ImageContainer>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleImageChange}
          accept="image/*"
        /> */}
         <input type="file" multiple onChange={handleImageUpload} />
      <Form onSubmit={handleSubmit}>
        <h1>Thêm Sản Phẩm</h1>

        <InputField>
          <Label>Tên sản phẩm:</Label>
          <Input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange} 
            placeholder="Nhập tên sản phẩm" 
            required 
          />
        </InputField>
        <InputField>
          <Label>Đơn giá:</Label>
          <Input
            type="number" 
            name="price" 
            value={productData.price} 
            onChange={handleInputChange} 
            placeholder="Nhập giá sản phẩm" 
            required 
          />
        </InputField>

        <InputField>
          <Label>Số lượng:</Label>
          <Input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
            placeholder="Nhập số lượng"
            required
          />
        </InputField>

        <InputField>
          <Label>Mô tả:</Label>
          <Input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Nhập mô tả"
            required
          />
        </InputField>

        <InputField>
          <Label>Size:</Label>
          <Input
            type="text"
            name="size"
            value={productData.size}
            onChange={handleInputChange}
            placeholder="Nhập kích cỡ"
          />
        </InputField>

        <InputField>
          <Label>Danh mục:</Label>
          <Select
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </Select>
        </InputField>

        <InputField>
          <Label>Nhà cung cấp:</Label>
          <Select
            name="supplier" 
            value={productData.supplier} 
            onChange={handleInputChange} 
            required
          >
            <option value="">Chọn nhà cung cấp</option>
            {suppliers.map((supplier) => (
                    <option key={supplier._id} value={supplier._id}>{supplier.companyName}</option>
            ))}
          </Select>
        </InputField>

        <InputField>
          <Label>Trạng thái:</Label>
          <Input
            type="text"
            name="status"
            value={productData.status}
            onChange={handleInputChange}
            placeholder="Nhập trạng thái"
          />
        </InputField>

        <InputField>
          <Label>Ngày nhập:</Label>
          <Input
            type="date"
            name="updatedAt"
            value={new Date().toISOString().substring(0, 10)} // Tự động là ngày hiện tại
            disabled // Vô hiệu hóa input
          />
        </InputField>

        <ButtonContainer>
          <Link to="/admin/viewdetailproduct">
            <Button className="back">Back</Button>
          </Link>
          <Button type="submit" className="add">THÊM</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default AddProduct;
