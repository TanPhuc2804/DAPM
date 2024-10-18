import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled components cho các phần tử trong form
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
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
  }

  &.add {
    background-color: green;
  }
`;


// Component AddOrder
const AddOrder = () => {
  const [maSP, setMaSP] = useState('01'); // Default value for Ma SP
  const [isCustomMaSP, setIsCustomMaSP] = useState(false);

  const handleMaSPChange = (event) => {
    setMaSP(event.target.value);
  };

  return (
    <Container>
         <Form>
      <h2 style={{fontWeight:'bold'}}>Thêm Đơn Hàng</h2>
        <InputField>
          <Label>Họ tên KH:</Label>
          <Input type="text" />
        </InputField>
        <InputField>
          <Label>SDT:</Label>
          <Input type="text" />
        </InputField>
        <InputField>
          <Label>Địa chỉ:</Label>
          <Input type="text" />
        </InputField>
        <InputField>
          <Label>Mã SP:</Label>
          {isCustomMaSP ? (
            <Input type="text" value={maSP} onChange={handleMaSPChange} />
          ) : (
            <Select value={maSP} onChange={handleMaSPChange}>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
            </Select>
          )}
        </InputField>
        <InputField>
          <Label>Số lượng:</Label>
          <Input type="number" min="1" defaultValue="1" />
        </InputField>
        <InputField>
          <Label>Tổng tiền:</Label>
          <Input type="text" placeholder="VND" />
        </InputField>
        <InputField>
          <Label>Ngày lập:</Label>
          <Input type="date" />
        </InputField>
        <InputField>
          <Label>Trạng thái:</Label>
          <Select>
            <option value="Chưa xác nhận">Chưa xác nhận</option>
            <option value="Đã xác nhận">Đã xác nhận</option>
            <option value="Đã hủy">Đã hủy</option>
          </Select>
        </InputField>
        <ButtonContainer>
        <Link to="/admin/order">
        <Button className='back'>Back</Button>
        </Link>
        <Link to="/admin/order">
        <Button className='add'>THÊM</Button>
        </Link>
      </ButtonContainer>
      </Form>
    </Container>
  );
};

export default AddOrder;
