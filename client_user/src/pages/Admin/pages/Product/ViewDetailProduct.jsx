import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const ThTd = styled.th`
  border: 1px solid #000;
  text-align: center;
  padding: 10px;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #000;
  text-align: center;
  padding: 10px;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  margin-right: 10px;
  color: white;
  cursor: pointer;
   &:nth-child(1) {
    background-color: green;  /* Màu cho nút THÊM */
  }
  &:nth-child(2) {
    background-color: yellow;  /* Màu cho nút Sửa */
    color: black;              /* Đổi màu chữ cho nút Sửa */
  }
  &:nth-child(3) {
    background-color: red;     /* Màu cho nút Xóa */
  }
`;

const ViewDetailProduct = () => {
    const products = [
        { id: 'A01', name: 'Áo Ba Lô', size: 'L', quantity: 100, price: '55.000', status: 'Sản phẩm cũ', supplier: 'Balenciaga', date: '10/10/2023' },
        { id: 'A02', name: 'Áo khoác da cá sấu', size: 'XXL', quantity: 15, price: '15.000.000', status: 'Sản phẩm mới', supplier: 'Gucci', date: '24/09/2024' },
        { id: 'A03', name: 'Áo thun', size: 'M', quantity: 30, price: '260.000', status: 'Sản phẩm mới', supplier: 'Chanel', date: '30/09/2024' },
        { id: 'A04', name: 'Áo Hoodie', size: 'XXL', quantity: 20, price: '560.000', status: 'Sản phẩm mới', supplier: 'Dior', date: '26/08/2024' },
        { id: 'A05', name: 'Áo chống nắng', size: 'XXL', quantity: 50, price: '499.000', status: 'Sản phẩm mới', supplier: 'Burberry', date: '26/08/2022' },
      ];
  return (
    <div>
    <h1>Áo</h1>
    <Table>
      <thead>
        <tr>
          <ThTd>STT</ThTd>
          <ThTd>Mã SP</ThTd>
          <ThTd>Tên SP</ThTd>
          <ThTd>SIZE</ThTd>
          <ThTd>Số lượng</ThTd>
          <ThTd>Đơn Giá</ThTd>
          <ThTd>Trạng Thái</ThTd>
          <ThTd>Nhà Cung cấp</ThTd>
          <ThTd>Ngày nhập</ThTd>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id}>
            <Td>{index + 1}</Td>
            <Td>{product.id}</Td>
            <Td>{product.name}</Td>
            <Td>{product.size}</Td>
            <Td>{product.quantity}</Td>
            <Td>{product.price}</Td>
            <Td>{product.status}</Td>
            <Td>{product.supplier}</Td>
            <Td>{product.date}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
    
    <ButtonGroup>
      <Link to="/delete-product">
        <Button style={{backgroundColor:"red", color:"black",borderRadius:"10px"}}>Xóa</Button>
      </Link>
       <Link to="/admin/updateproduct">
        <Button style={{backgroundColor:"yellow", color:"black",borderRadius:"10px"}}>Sửa</Button>
      </Link>
      <Link to="/admin/addproduct">
        <Button style={{backgroundColor:"green", color:"black",borderRadius:"10px"}}>Thêm</Button>
      </Link>
    </ButtonGroup>
  </div>
  )
}

export default ViewDetailProduct