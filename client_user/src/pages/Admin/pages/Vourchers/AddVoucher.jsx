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

const AddVoucher = () => {
  const [tenVoucher, setTenVoucher] = useState("");
  const [giaTri, setGiaTri] = useState("");
  const [soLuong, setSoLuong] = useState(1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn việc reload trang khi form được submit
  console.log("Form submitted"); // Thêm log để kiểm tra

    // Dữ liệu gửi lên server
    const voucherData = {
      nameVoucher: tenVoucher,
      discount: giaTri,
      quantity: soLuong,
      createdAt: ngayBatDau,
      expiryDate: ngayKetThuc,
      status: "active",  // Hoặc tùy theo logic của bạn
    };

    try {
      // Gửi yêu cầu POST để tạo voucher mới
      const response = await axios.post("http://localhost:3000/Voucher/create-voucher/", voucherData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Thêm xác thực nếu cần
        }
      });
      console.log(response);
      if (response.data.status) {
        alert("Thêm voucher thành công!");
        navigate("/admin/vouchers");
      } else {
        alert("Thêm voucher thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm voucher:", error);
      alert("Đã xảy ra lỗi khi thêm voucher.");
    }
  };

  return (
    <Container>
      <Form >
        <h2 style={{ fontWeight: 'bold' }}>Thêm Voucher</h2>
        <InputField>
          <Label>Tên Voucher:</Label>
          <Input
            type="text"
            value={tenVoucher}
            onChange={(e) => setTenVoucher(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
        </InputField>
        <InputField>
          <Label>Giá trị:</Label>
          <Input
            type="text"
            value={giaTri}
            onChange={(e) => setGiaTri(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
        </InputField>
        <InputField>
          <Label>Số lượng:</Label>
          <Input
            type="number"
            min={1}
            value={soLuong}
            onChange={(e) => setSoLuong(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
        </InputField>
        <InputField>
          <Label>Ngày bắt đầu:</Label>
          <Input
            type="date"
            value={ngayBatDau}
            onChange={(e) => setNgayBatDau(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
        </InputField>
        <InputField>
          <Label>Ngày kết thúc:</Label>
          <Input
            type="date"
            value={ngayKetThuc}
            onChange={(e) => setNgayKetThuc(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
        </InputField>
        <ButtonContainer>
          <Link to="/admin/vouchers">
            <Button className="back">Back</Button>
          </Link>
          <Button className="add" onClick={handleSubmit}>THÊM</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default AddVoucher;
