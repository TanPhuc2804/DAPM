import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';

const TableCell = styled.td`
  border: 1px solid black;
  padding: 8px;
`;

const TableHeader = styled.th`
  border: 1px solid black;
  padding: 8px;
  font-weight: bold;
`;
const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  flex: 1;
  margin:5px;
 &.update {
    background-color: yellow;
    color: black;
  }

  &.delete {
    background-color: red;
    color: black;
  }

  &.add {
    background-color: green;
    color: black;
  }
`;
const Vourchers = () => {
  const [vouchers, setVouchers] = useState([]);
  //lấy danh sách voucher
  useEffect(() =>{
    const fetchvouchers = async() => {
      try{
        const response = await axios.get("http://localhost:3000/Voucher/get-allvoucher/");
        console.log(response);
        setVouchers(response.data.vouchers);
      } catch(error){
        console.error("Lay Voucher that bai", error);
      }
    };
    fetchvouchers();
  },[]);
   // Xóa voucher
   const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa voucher này không?')) {
    try {
      await axios.delete(`http://localhost:3000/Voucher/delete-voucher/${id}`);
      setVouchers(vouchers.filter((voucher) => voucher._id !== id));
      console.log("Xóa thành công");
    } catch (error) {
      console.error("Xóa thất bại", error);
    }
  }
  };
  return (
    <div>
      <h2 style={{fontWeight: 'bold'}}>Quản lý Voucher</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <TableHeader>Mã Voucher</TableHeader>
            <TableHeader>Tên Voucher</TableHeader>
            <TableHeader>Giá trị</TableHeader>
            <TableHeader>Số lượng</TableHeader>
            <TableHeader>Ngày bắt đầu</TableHeader>
            <TableHeader>Ngày kết thúc</TableHeader>
            <TableHeader>Hành động</TableHeader>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher) => (
            <tr key={voucher.maVoucher}>
              <TableCell>{voucher._id}</TableCell>
              <TableCell>{voucher.nameVoucher}</TableCell>
              <TableCell>{voucher.discount}</TableCell>
              <TableCell>{voucher.quantity}</TableCell>
              <TableCell>{new Date(voucher.createdAt).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell>{new Date(voucher.expiryDate).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell>
                <Link to={`/admin/editvoucher/${voucher._id}`}>
                  <Button className='update'>Sửa</Button>
                </Link>
                <Button className='delete' onClick={() => handleDelete(voucher._id)}>Xóa</Button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin/addvoucher">
        <Button style={{marginTop:'10px'}} className='add'>THÊM</Button>
      </Link>
    </div>
  );
};

export default Vourchers