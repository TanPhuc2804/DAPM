import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Thêm axios để gửi yêu cầu HTTP

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

const InputField = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 100%;

  & > label {
    flex: 0.3;
    margin-right: 10px;
  }

  & > input {
    flex: 0.7;
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
  }

  &.add {
    background-color: green;
  }
`;
const AddSupplier = () => {
    const [tencongty, setTenCongTy] = useState("");
    const [email, setEmail] = useState("");
    const [sdt, setSDT] = useState("");
    const [diachi, setDiaChi] = useState("");
    const [mota, setMoTa] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn việc reload trang khi form được submit
      console.log("Form submitted"); // Thêm log để kiểm tra
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
    if (!sdt.startsWith("0")) {
      alert("SĐT phải bắt đầu là số 0");
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
        // Dữ liệu gửi lên server
        const supplierData = {
          companyName: tencongty,
          email: email,
          numberphone: sdt,
          address: diachi,
          description: mota,
          status: "active",  // Hoặc tùy theo logic của bạn
        };
    
        try {
          // Gửi yêu cầu POST để tạo supplier mới
          const response = await axios.post("http://localhost:3000/supplier/create-supplier", supplierData);
          console.log(response);
          if (response.data.status) {
            alert("Thêm Supplier thành công!");
            navigate("/admin/supplier");
          } else {
            alert("Thêm Supplier thất bại!");
          }
        } catch (error) {
          console.error("Lỗi khi thêm Supplier:", error);
          alert("Đã xảy ra lỗi khi thêm Supplier.");
        }
      };
  return (
    <Container>
    <Form >
      <h2 style={{ fontWeight: 'bold' }}>Thêm Nhà Cung Cấp</h2>
      <InputField>
        <Label>Tên NCC:</Label>
        <Input
          type="text"
          value={tencongty}
          onChange={(e) => setTenCongTy(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
      </InputField>
      <InputField>
        <Label>Email:</Label>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
      </InputField>
      <InputField>
        <Label>SĐT:</Label>
        <Input
          type="text"
          value={sdt}
          onChange={(e) => setSDT(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
      </InputField>
      <InputField>
        <Label>Địa Chỉ:</Label>
        <Input
          type="text"
          value={diachi}
          onChange={(e) => setDiaChi(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
      </InputField>
      <InputField>
        <Label>Mô tả:</Label>
        <Input
          type="text"
          value={mota}
          onChange={(e) => setMoTa(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
      </InputField>
      <ButtonContainer>
        <Link to="/admin/supplier">
          <Button className="back">Back</Button>
        </Link>
        <Button className="add" onClick={handleSubmit}>THÊM</Button>
      </ButtonContainer>
    </Form>
  </Container>
  )
}

export default AddSupplier