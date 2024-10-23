import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// Định dạng bảng
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableRow = styled.tr`
  background-color: ${props => (props.isSelected ? '#c0c0c0' : '#ffffff')};
  &:hover {
    background-color: ${props => (props.isSelected ? '#c0c0c0' : '#e0e0e0')};
  }
`;

const TableHeader = styled.th`
  border: 1px solid black;
  padding: 8px;
  font-weight: bold;
`;

const TableCell = styled.td`
  border: 1px solid black;
  padding: 8px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 10px;
  border: none;
  color: black;
  cursor: pointer;
  margin-right: 5px;
  background-color: ${props => props.color || 'grey'};
  &:hover {
    opacity: 0.8;
  }
`;

// Dữ liệu giả để hiển thị
const initialOrders = [
  { id: 1, name: 'Nguyễn Tùng Dương', phone: '0986 450 694', address: '81 Gia Lai', code: 'A01', quantity: 2, total: '110.000', date: '25/9/2024', status: 'Chưa xác nhận' },
  { id: 2, name: 'Nguyễn Gia Tính', phone: '0986 422 345', address: '59 Sài Gòn', code: 'A02', quantity: 1, total: '15.000.000', date: '24/09/2024', status: 'Đã xác nhận' },
  { id: 3, name: 'Biện Ngọc Sơn', phone: '0987 644 567', address: '79 Khánh Hòa', code: 'A03', quantity: 3, total: '780.000', date: '30/09/2024', status: 'Chưa xác nhận' }
];

const OrderAdmin = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Xử lý khi nhấp chọn một hàng
  const handleRowClick = (order) => {
    setSelectedOrder(order.id);
  };

  // Xử lý xóa đơn hàng
  const handleDelete = () => {
    if (selectedOrder != null) {
      setOrders(orders.filter(order => order.id !== selectedOrder));
      setSelectedOrder(null); // Bỏ chọn sau khi xóa
    }
  };

  // Xử lý cập nhật đơn hàng
  const handleUpdate = () => {
    if (selectedOrder != null) {
      alert(`Cập nhật đơn hàng ${selectedOrder}`);
    }
  };

  // Xử lý bỏ chọn khi nhấp ra ngoài bảng và nút
  const handleOutsideClick = (e) => {
    // Kiểm tra xem nơi nhấp có phải là bảng hoặc nút không
    if (e.target.tagName !== 'TD' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'TH' && e.target.tagName !== 'SELECT') {
      setSelectedOrder(null);
    }
  };

  return (
    <div onClick={handleOutsideClick}>
      <h2 style={{ fontWeight: 'bold' }}>Đơn Hàng</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>STT</TableHeader>
            <TableHeader>Họ Tên KH</TableHeader>
            <TableHeader>SDT</TableHeader>
            <TableHeader>Địa chỉ</TableHeader>
            <TableHeader>Mã SP</TableHeader>
            <TableHeader>SL</TableHeader>
            <TableHeader>Tổng tiền</TableHeader>
            <TableHeader>Ngày lập</TableHeader>
            <TableHeader>Trạng thái</TableHeader>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <TableRow 
              key={order.id} 
              isSelected={selectedOrder === order.id}
              onClick={() => handleRowClick(order)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.phone}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>{order.code}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <select defaultValue={order.status}>
                  <option value="Chưa xác nhận">Chưa xác nhận</option>
                  <option value="Đã xác nhận">Đã xác nhận</option>
                </select>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      
      {/* Các nút Thêm, Xóa và Cập nhật */}
      <div style={{ marginTop: '10px' }}>
        <Button color="red" onClick={handleDelete}>Xóa</Button>
        <Button color="yellow" onClick={handleUpdate}>Sửa</Button>
        <Link to="/admin/addorder">
        <Button color="green">THÊM</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderAdmin