import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Bold, Weight } from "lucide-react";
import axios from "axios";

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

/* Styling cho ảnh hiển thị */
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
    color: black;
  }

  &.update {
    background-color: yellow;
    color: black;
  }
`;
const EditSupplier = () => {
  const { id } = useParams();
  const [macongty, setMaCongTy] = useState(id);
  const [tencongty, setTenCongTy] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSDT] = useState("");
  const [diachi, setDiaChi] = useState("");
  const [mota, setMoTa] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/supplier/list-supplier/${id}`);
        console.log(response);
        const suppliers = response.data.supplier;
        setTenCongTy(suppliers.companyName);
        setEmail(suppliers.email);
        setSDT(suppliers.numberphone);
        setDiaChi(suppliers.address);
        setMoTa(suppliers.description);
      } catch (error) {
        console.error("Failed to fetch Supplier", error);
      }
    };
  
    if (id) {
      fetchSupplier();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Kiểm tra từng trường dữ liệu
     if (!tencongty.trim()) {
      alert("Vui lòng nhập tên công ty.");
      return;
  }
  if (!email.trim()) {
      alert("Vui lòng nhập email.");
      return;
  }
  if (!email.endsWith("@gmail.com")) {
    alert("Email phải có đuôi @gmail.com");
    return;
  }
  if (!sdt.trim()) {
      alert("Vui lòng nhập số điện thoại.");
      return;
  }
  if (!/^\d{10}$/.test(sdt)) {
    alert("Số điện thoại phải là số và phải có 10 ký tự");
    return;
  }
  if (!diachi.trim()) {
      alert("Vui lòng nhập địa chỉ.");
      return;
  }
  if (!mota.trim()) {
      alert("Vui lòng nhập mô tả.");
      return;
  }
    try {
      const updatedSupplier = {
        companyName: tencongty,
        email: email,
        numberphone: sdt,
        address: diachi,
        description: mota,
      };
      
      await axios.put(`http://localhost:3000/supplier/update-suppler/${id}`, updatedSupplier);
      alert("Cập nhật supplier thành công");
      navigate('/admin/supplier');
    } catch (error) {
      console.error("Cập nhật supplier thất bại", error);
      alert("Cập nhật supplier thất bại");
    }
  };
  return (
    <Container>
      <Form>
      <h2 style={{ fontWeight: 'bold' }}>Sửa Nhà Cung Cấp</h2>
        <InputField>
        <Label>Mã NCC:</Label>
        <Input type="text" value={macongty} disabled />
        </InputField>
        <InputField>
        <Label>Tên NCC:</Label>
        <Input type="text" value={tencongty} onChange={(e) => setTenCongTy(e.target.value)} />
        </InputField>
        <InputField>
        <Label>Email:</Label>
        <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputField>
        <InputField>
        <Label>SĐT:</Label>
        <Input type="text" value={sdt} onChange={(e) => setSDT(e.target.value)} />
        </InputField>
        <InputField>
        <Label>Địa Chỉ:</Label>
        <Input type="text" value={diachi} onChange={(e) => setDiaChi(e.target.value)} />
        </InputField>
        <InputField>
        <Label>Mô tả:</Label>
        <Input type="text" value={mota} onChange={(e) => setMoTa(e.target.value)} />
        </InputField>
        <ButtonContainer>
          <Link to="/admin/supplier"> {/* Đường link cho nút Back */}
            <Button className="back">Back</Button>
          </Link>
           {/* Đường link cho nút Cập nhật */}
            <Button className="update" onClick={handleSubmit}>Update</Button>
        </ButtonContainer>
    </Form>
    </Container>
  )
}

export default EditSupplier