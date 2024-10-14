import React, { useState } from 'react'
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
  const [vouchers, setVouchers] = useState([
    {
      maVoucher: "VC01",
      tenVoucher: "Miễn phí vận chuyển",
      giaTri: "Miễn phí vận chuyển",
      soLuong: 100,
      ngayBatDau: "25/09/2024",
      ngayKetThuc: "25/12/2024",
    },
    {
      maVoucher: "VC02",
      tenVoucher: "Ưu đãi tháng 9",
      giaTri: "200k",
      soLuong: 50,
      ngayBatDau: "01/09/2024",
      ngayKetThuc: "30/09/2024",
    },
    {
      maVoucher: "VC03",
      tenVoucher: "Giảm 20%",
      giaTri: "20%",
      soLuong: 300,
      ngayBatDau: "12/08/2024",
      ngayKetThuc: "12/12/2024",
    },
    {
      maVoucher: "VC04",
      tenVoucher: "Giảm 10K",
      giaTri: "10k",
      soLuong: 10000,
      ngayBatDau: "12/08/2024",
      ngayKetThuc: "12/12/2024",
    },
  ]);

  const handleDelete = (maVoucher) => {
    setVouchers(vouchers.filter((voucher) => voucher.maVoucher !== maVoucher));
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
              <TableCell>{voucher.maVoucher}</TableCell>
              <TableCell>{voucher.tenVoucher}</TableCell>
              <TableCell>{voucher.giaTri}</TableCell>
              <TableCell>{voucher.soLuong}</TableCell>
              <TableCell>{voucher.ngayBatDau}</TableCell>
              <TableCell>{voucher.ngayKetThuc}</TableCell>
              <TableCell>
                <Link to={`/admin/editvoucher`}>
                  <Button className='update'>Sửa</Button>
                </Link>
                <Button className='delete' onClick={() => handleDelete(voucher.maVoucher)}>Xóa</Button>
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