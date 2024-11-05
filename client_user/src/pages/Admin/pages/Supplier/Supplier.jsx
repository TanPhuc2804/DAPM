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
const Supplier = () => {
  const[suppliers,setSupplier] = useState([]);
  //Lay danh sach nha cung cap
  useEffect(() =>{
    const fetchsuppliers = async() => {
      try{
        const response = await axios.get("http://localhost:3000/supplier/list-supplier");
        console.log(response);
        setSupplier(response.data.suppliers);
      } catch(error){
        console.error("Lay Supplier that bai", error);
      }
    };
    fetchsuppliers();
  },[]);

  // Xóa supplier
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này không?')) {
    try {
      await axios.delete(`http://localhost:3000/supplier/delete-supplier/${id}`);
      // sau khi xóa cập nhập lại trang
      setSupplier(suppliers.filter((supplier) => supplier._id !== id));
      console.log("Xóa thành công");
    } catch (error) {
      console.error("Xóa thất bại", error);
    }
  }
  };
  return (
    <div>
      <h2 style={{fontWeight: 'bold'}}>Quản Lý Nhà Cung Cấp</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <TableHeader>Mã NCC</TableHeader>
            <TableHeader>Tên NCC</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>SĐT</TableHeader>
            <TableHeader>Địa Chỉ</TableHeader>
            <TableHeader>Mô tả</TableHeader>
            <TableHeader>Hành động</TableHeader>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr>
              <TableCell>{supplier._id}</TableCell>
              <TableCell>{supplier.companyName}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.numberphone}</TableCell>
              <TableCell>{supplier.address}</TableCell>
              <TableCell>{supplier.description}</TableCell>
              <TableCell>
                <Link to={`/admin/editsupplier/${supplier._id}`}>
                  <Button className='update'>Sửa</Button>
                </Link>
                <Button className='delete' onClick={() => handleDelete(supplier._id)}>Xóa</Button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin/addsupplier">
        <Button style={{marginTop:'10px'}} className='add'>THÊM</Button>
      </Link>
    </div>
  );
};

export default Supplier