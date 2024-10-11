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
  flex-direction: column;
  margin: 10px 0;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 5px;
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
      <div style={{ flex: 1 }}>
        <ImageContainer onClick={handleClick} style={{ backgroundColor: 'blue' }}>
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
          <Input type="text" placeholder="Nhập mã sản phẩm" />
        </InputField>
        <InputField>
          <Label>Tên sản phẩm:</Label>
          <Input type="text" placeholder="Nhập tên sản phẩm" />
        </InputField>
        <InputField>
          <Label>SIZE:</Label>
          <Input type="text" placeholder="Nhập size" />
        </InputField>
        <InputField>
          <Label>Số lượng:</Label>
          <Input type="number" min="1" placeholder="Nhập số lượng" />
        </InputField>
        <InputField>
          <Label>Đơn giá:</Label>
          <Input type="text" placeholder="Nhập đơn giá" />
        </InputField>
        <InputField>
          <Label>Trạng Thái:</Label>
          <Input type="text" placeholder="Nhập trạng thái" />
        </InputField>
        <InputField>
          <Label>Nhà cung cấp:</Label>
          <Input type="text" placeholder="Nhập nhà cung cấp" />
        </InputField>
        <InputField>
          <Label>Ngày nhập:</Label>
          <Input type="date" />
        </InputField>
        <ButtonContainer>
          <Link to="/viewdetailproduct"> {/* Đường link cho nút Back */}
            <Button className="back">Back</Button>
          </Link>
          <Link to="/viewdetailproduct"> {/* Đường link cho nút Thêm */}
            <Button className="add">THÊM</Button>
          </Link>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default AddProduct;
