import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios';
import moment from 'moment';
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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu sản phẩm
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products/list-product ');

        setProducts(response.data.products);
      } catch (error) {
        console.error("Lay API khong thanh cong", error);
      }
    };

    fetchProducts();
  }, []);
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
            <tr key={product._id}>
              <Td>{index + 1}</Td>
              <Td>{product.productCode}</Td>
              <Td>{product.name}</Td>
              <Td>{product.size}</Td>
              <Td>{product.quantity}</Td>
              <Td>{product.price}</Td>
              <Td>{product.status}</Td>
              <Td>{product.supplier?.name}</Td>
              <Td>{moment(product.updateAt).format("DD/MM/YYYY")}</Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ButtonGroup>
        <Link to="/delete-product">
          <Button style={{ backgroundColor: "red", color: "black", borderRadius: "10px" }}>Xóa</Button>
        </Link>
        <Link to="/admin/updateproduct">
          <Button style={{ backgroundColor: "yellow", color: "black", borderRadius: "10px" }}>Sửa</Button>
        </Link>
        <Link to="/admin/addproduct">
          <Button style={{ backgroundColor: "green", color: "black", borderRadius: "10px" }}>Thêm</Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

export default ViewDetailProduct;