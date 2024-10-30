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
const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Staff = () => {
  const [staff,setStaff] = useState([]);

  useEffect(() =>{
    const fetchstaff = async() => {
      try{
        const response = await axios.get("http://localhost:3000/staff/get-allstaff/");
        console.log(response);
        setStaff(response.data.staffs);
      } catch(error){
        console.error("Lay Voucher that bai", error);
      }
    };
    fetchstaff();
  },[]);
  // Xóa Staff
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa staff này không?')) {
    try {
      await axios.delete(`http://localhost:3000/staff//delete-staff/${id}`);
      setStaff(staff.filter((staff) => staff._id !== id));
      console.log("Xóa thành công");
    } catch (error) {
      console.error("Xóa thất bại", error);
    }
  }
  };
  // Định dạng ngày sang kiểu ngày/tháng/năm
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN'); // hiển thị theo định dạng dd/MM/yyyy
};
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
        {staff.map((staff) => (
             <tr>
             <TableCell>{staff._id}</TableCell>
             <TableCell>{staff.fullname}</TableCell>
             <TableCell>{staff.cccd}</TableCell>
             <TableCell>{formatDate(staff.birthday)}</TableCell>
             <TableCell>{staff.gender}</TableCell>
             <TableCell>{staff.numberphone}</TableCell>
             <TableCell>{staff.role}</TableCell>
             <TableCell>{staff.address}</TableCell>
             <TableCell>{formatDate(staff.ngaylamviec)}</TableCell>
             <TableCell>
              <ActionContainer>
               <Link to = {`/admin/editstaff/${staff._id}`}> 
               <Button className='update'>Sửa</Button>
               </Link>
               <Button className='delete' onClick={() => handleDelete(staff._id)} >Xóa</Button>
               </ActionContainer>
             </TableCell>
           </tr>
          ))}
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
