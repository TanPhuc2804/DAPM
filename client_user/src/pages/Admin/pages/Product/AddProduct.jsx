import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Các Styled Components như bạn đã tạo...
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

  & > input {
    flex: 0.7;
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

const AddProduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [productData, setProductData] = useState({
    name: '',
    productCode: '',
    price: '',
    quantity: '',
    description: '',
    size: '',
    category: '',
    supplier: '',
    status: 'Còn hàng',
    updatedAt: '',
    image: []
  });

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setProductData({ ...productData, image: [file] });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (let key in productData) {
        formData.append(key, productData[key]);
      }
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await axios.post('/api/products', formData);
      alert('Thêm sản phẩm thành công!');
      navigate('/admin/viewdetailproduct');
    } catch (error) {
      console.error('Failed to add product', error);
      alert('Thêm sản phẩm thất bại!');
    }
  };

  return (
    <Container>
       <ImageContainer onClick={() => document.getElementById('fileInput').click()}>
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
        />
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
          <Label>Mã sản phẩm:</Label>
          <Input
            type="text"
            name="productCode"
            value={productData.productCode}
            onChange={handleInputChange}
            placeholder="Nhập mã sản phẩm"
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
            placeholder="Nhập đơn giá"
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
          <Input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            placeholder="Nhập danh mục"
            required
          />
        </InputField>

        <InputField>
          <Label>Nhà cung cấp:</Label>
          <Input
            type="text"
            name="supplier"
            value={productData.supplier}
            onChange={handleInputChange}
            placeholder="Nhập nhà cung cấp"
            required
          />
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
            value={productData.updatedAt}
            onChange={handleInputChange}
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
