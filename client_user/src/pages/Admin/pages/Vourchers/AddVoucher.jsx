import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

  & > input {
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
  const [maVoucher, setMaVoucher] = useState("");
  const [tenVoucher, setTenVoucher] = useState("");
  const [giaTri, setGiaTri] = useState("");
  const [soLuong, setSoLuong] = useState(1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giả lập logic thêm voucher thành công
    alert("Thêm thành công");
    navigate("/admin/vouchers");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container>
         <Form onSubmit={handleSubmit}>
      <h2 style={{fontWeight: 'bold'}}>Thêm Voucher</h2>
      <InputField  >
        <Label>Mã Voucher:</Label>
        <Input
          type="text"
          value={maVoucher}
          onChange={(e) => setMaVoucher(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
        </InputField>
        <InputField  >
        <Label>Tên Voucher:</Label>
        <Input
          type="text"
          value={tenVoucher}
          onChange={(e) => setTenVoucher(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
         </InputField>
         <InputField  >
        <Label>Giá trị:</Label>
        <Input
          type="text"
          value={giaTri}
          onChange={(e) => setGiaTri(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
        </InputField>
        <InputField  >
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
        <InputField  >
        <Label>Ngày bắt đầu:</Label>
        <Input
          type="date"
          value={ngayBatDau}
          onChange={(e) => setNgayBatDau(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
       </InputField>
       <InputField  >
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
          <Link to="/admin/vouchers"> {/* Đường link cho nút Thêm */}
            <Button className="add">THÊM</Button>
          </Link>
          </ButtonContainer>
    </Form>
    </Container>
  );
};

export default AddVoucher;
