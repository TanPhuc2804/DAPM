import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

/* Styling cho khung chứa hình ảnh */
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

const Form = styled.div`
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

/* Styling cho ảnh hiển thị */
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
    flex: 0.3; /* Chiếm 30% không gian */
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
const Select = styled.select`
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
    color: black;
  }

  &.update {
    background-color: yellow;
    color: black;
  }
`;

const UpdateProduct = () => {
  const [selectedImage, setSelectedImage] = useState('../public/anh-mau-xanh-duong.jpg');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <Container>
       <div style={{ flex: 1}}>
        <ImageContainer onClick={handleClick} style={{ backgroundColor:'blue'}}>
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
      </div>
    
      <Form>
        <h1>Áo</h1>
        <InputField>
          <Label>Mã sản phẩm:</Label>
          <Input type="text" defaultValue="A01" readOnly />
        </InputField>
        <InputField>
          <Label>Tên sản phẩm:</Label>
          <Input type="text"  defaultValue="Áo Ba Lô" />
        </InputField>
        <InputField>
          <Label>SIZE:</Label>
          <Input type="text" defaultValue="L" />
        </InputField>
        <InputField>
          <Label>Số lượng:</Label>
          <Input type="number" min="1" defaultValue="100" />
        </InputField>
        <InputField>
          <Label>Đơn giá:</Label>
          <Input type="text" defaultValue="55.000" />
        </InputField>
        <InputField>
          <Label>Trạng Thái:</Label>
          <Select>
            <option value="Sản phẩm cũ">Sản phẩm cũ</option>
            <option value="Sản phẩm mới">Sản phẩm mới</option>
          </Select>
        </InputField>
        <InputField>
          <Label>Nhà cung cấp:</Label>
          <Input type="text" defaultValue="Balenciaga" />
        </InputField>
        <InputField>
          <Label>Ngày nhập:</Label>
          <Input type="date" defaultValue="2023-10-10"/>
        </InputField>
        <ButtonContainer>
          <Link to="/admin/viewdetailproduct"> {/* Đường link cho nút Back */}
            <Button className="back">Back</Button>
          </Link>
          <Link to="/admin/viewdetailproduct"> {/* Đường link cho nút Cập nhật */}
            <Button className="update">Update</Button>
          </Link>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default UpdateProduct;
