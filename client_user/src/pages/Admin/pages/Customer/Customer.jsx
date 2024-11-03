import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
    &.block {
    background-color: red;
    color: black;
  }

  &.unblock {
    background-color: green;
    color: black;
  }
`;
const StyledHr = styled.hr`
  border: none;
  border-top: 1px solid black;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 1px;
`;
const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Customer = () => {
    const [customers,setCustomers] = useState([]);
    // lấy danh sách Customers
    useEffect(() => {
        const fetchCustomers = async() => {
            try{
                const respone = await axios.get("http://localhost:3000/customer/list-customer");
                console.log(respone);
                setCustomers(respone.data.message);
            }catch(error){
                console.error("Lấy danh sách khách hàng thất bại",error);
            }
        };
        fetchCustomers();
    },[]);
    // //Khóa Customer
    const handleBlock = async (id) => {
      if (window.confirm('Bạn có chắc chắn muốn khóa customer này không?')) {
          try {
              await axios.post(`http://localhost:3000/customer/list-customer/block/${id}`);
              setCustomers(customers.map(customer =>
                  customer._id === id ? { ...customer, role: "block" } : customer
              ));
              console.log("Khóa thành công");
          } catch (error) {
              console.error("Khóa thất bại", error);
          }
      }
  };
     //Mở khóa Customer
     const handleUnBlock = async (id) => {
      if (window.confirm('Bạn có chắc chắn muốn mở khóa customer này không?')) {
          try {
              await axios.post(`http://localhost:3000/customer/list-customer/unblock/${id}`);
              setCustomers(customers.map(customer =>
                  customer._id === id ? { ...customer, role: "Customer" } : customer
              ));
              console.log("Mở khóa thành công");
          } catch (error) {
              console.error("Mở khóa thất bại", error);
          }
      }
  };
  return (
    <div>
        <h2 style={{fontWeight:'bold'}}>Quản Lý Khách Hàng</h2>
        <StyledHr/>
        <table style={{borderCollapse:'collapse',width:'100%'}}>
            <thead>
                <tr>
                    <TableHeader>Mã KH</TableHeader>
                    <TableHeader>Họ Tên</TableHeader>
                    <TableHeader>SĐT</TableHeader>
                    <TableHeader>Ngày Sinh</TableHeader>
                    <TableHeader>Giới Tính</TableHeader>
                    <TableHeader>Địa Chỉ</TableHeader>
                    <TableHeader>Hành Động</TableHeader>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => (
                    <tr  key={customer._id}>
                        <TableCell>{customer._id}</TableCell>
                        <TableCell>{customer.fullname}</TableCell>
                        <TableCell>{customer.numberphone}</TableCell>
                        <TableCell>{new Date(customer.birthday).toLocaleDateString('vi-VN')}</TableCell>
                        <TableCell>{customer.gender}</TableCell>
                        <TableCell>{customer.address}</TableCell>
                        <TableCell>
                            <ActionContainer>
                        <Link to={`/admin/editcustomer/${customer._id}`}>
                                    <Button className='update'>Sửa</Button>
                                </Link>
                                <Button
                                    onClick={() => {
                                        customer.role === "Customer" ? handleBlock(customer._id) : handleUnBlock(customer._id);
                                    }}
                                    className={customer.role === "Customer" ? 'block' : 'unblock'}
                                >
                                    {customer.role === "Customer" ? 'Block' : 'UnBlock'}
                                </Button>
                            </ActionContainer>
                        </TableCell>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Customer