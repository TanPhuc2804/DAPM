import React,{ useEffect, useState } from 'react';
import axios from 'axios';
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
const StyledHr = styled.hr`
  border: none;
  border-top: 1px solid black;
  width: 100%;
`;
const Staff = () => {
  return (
    <div style={{ padding: '20px',fontWeight: '20px' }}>
      <h2 style={{fontWeight:'bold'}}>Danh sách nhân viên</h2>
      <StyledHr/>
      <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'flex-end' }}>
        <Link to = {"/admin/addstaff"}>
        <button style={{ backgroundColor: '#00cc66', color: 'white', padding: '10px', border: 'none', borderRadius: '5px',marginTop:'20px' }}>Thêm NV</button>
        </Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <TableHeader>Mã NV</TableHeader>
            <TableHeader>Họ tên</TableHeader>
            <TableHeader>CCCD</TableHeader>
            <TableHeader>Năm sinh</TableHeader>
            <TableHeader>Giới tính</TableHeader>
            <TableHeader>SĐT</TableHeader>
            <TableHeader>Chức vụ</TableHeader>
            <TableHeader>Địa chỉ</TableHeader>
            <TableHeader>Ngày vào làm</TableHeader>
            <TableHeader>Hành động</TableHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell>NV001</TableCell>
            <TableCell>Nguyễn Văn Nam</TableCell>
            <TableCell>0588 345 393</TableCell>
            <TableCell>20/12/2004</TableCell>
            <TableCell>Nam</TableCell>
            <TableCell>0543 334 789</TableCell>
            <TableCell>Giám đốc</TableCell>
            <TableCell>828 Lê Lợi, Q2, TP.HCM</TableCell>
            <TableCell>12/09/2020</TableCell>
            <TableCell>
              <Link to = {"/admin/editstaff"}> 
              <Button className='update'>Sửa</Button>
              </Link>
              <Button className='delete' >Xóa</Button>
            </TableCell>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: '#eee',
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const tableCellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const updateButtonStyle = {
  backgroundColor: '#ffff00',
  color: 'black',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
};

export default Staff;
