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
const EditVoucher = () => {
  const { id } = useParams();
  const [maVoucher, setMaVoucher] = useState(id);
  const [tenVoucher, setTenVoucher] = useState("");
  const [giaTri, setGiaTri] = useState("");
  const [soLuong, setSoLuong] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Voucher/get-voucher/${id}`);
        const voucher = response.data.voucher;
        setTenVoucher(voucher.nameVoucher);
        setGiaTri(voucher.discount);
        setSoLuong(voucher.quantity);
        setNgayBatDau(new Date(voucher.createdAt).toISOString().split('T')[0]);
        setNgayKetThuc(new Date(voucher.expiryDate).toISOString().split('T')[0]);
      } catch (error) {
        console.error("Failed to fetch voucher", error);
      }
    };
  
    if (id) {
      fetchVoucher();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedVoucher = {
        nameVoucher: tenVoucher,
        discount: giaTri,
        quantity: soLuong,
        createdAt: ngayBatDau,
        expiryDate: ngayKetThuc
      };
      
      await axios.put(`http://localhost:3000/Voucher/upt-voucher/${id}`, updatedVoucher);
      alert("Cập nhật voucher thành công");
      navigate('/admin/vouchers');
    } catch (error) {
      console.error("Cập nhật voucher thất bại", error);
      alert("Cập nhật voucher thất bại");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
      <h2 style={{ fontWeight: 'bold' }}>Sửa Voucher</h2>
        <InputField>
        <Label>Mã Voucher:</Label>
        <Input type="text" value={maVoucher} disabled />
        </InputField>
        <InputField>
        <Label>Tên Voucher:</Label>
        <Input type="text" value={tenVoucher} onChange={(e) => setTenVoucher(e.target.value)} />
        </InputField>
        <InputField>
        <Label>Giá trị:</Label>
        <Input type="text" value={giaTri} onChange={(e) => setGiaTri(e.target.value)} />
        </InputField>
        <InputField>
        <Label>Số lượng:</Label>
        <Input type="number" value={soLuong} onChange={(e) => setSoLuong(e.target.value)} />
        </InputField>
        <InputField>
        <Label>Ngày bắt đầu:</Label>
        <Input type="date" value={ngayBatDau} onChange={(e) => setNgayBatDau(e.target.value)} />
        </InputField>
        <InputField>
        <Label>Ngày kết thúc:</Label>
        <Input type="date" value={ngayKetThuc} onChange={(e) => setNgayKetThuc(e.target.value)} />
        </InputField>
        <ButtonContainer>
          <Link to="/admin/vouchers"> {/* Đường link cho nút Back */}
            <Button className="back">Back</Button>
          </Link>
           {/* Đường link cho nút Cập nhật */}
            <Button className="update" onClick={handleSubmit}>Update</Button>
        </ButtonContainer>
    </Form>
    </Container>
  );
};

export default EditVoucher;
