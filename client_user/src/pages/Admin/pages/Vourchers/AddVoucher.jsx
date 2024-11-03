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

  // Kiểm tra các trường không được để trống
  if (!tenVoucher.trim()) {
    alert("Vui lòng nhập Tên Voucher!");
    return;
  }
  if (!giaTri.trim()) {
    alert("Vui lòng nhập Giá trị Voucher!");
    return;
  }
  if (!soLuong) {
    alert("Vui lòng nhập Số lượng!");
    return;
  }
  if (!ngayBatDau.trim()) {
    alert("Vui lòng chọn Ngày bắt đầu!");
    return;
  }
  if (!ngayKetThuc.trim()) {
    alert("Vui lòng chọn Ngày kết thúc!");
    return;
  }

      // Kiểm tra nếu giá trị nhỏ hơn hoặc bằng 0 và nhỏ hơn 100%
  if (isNaN(giaTri) || Number(giaTri) <= 0 || Number(giaTri) >= 100) {
    alert("Giá trị phải là số, lớn hơn 0 và nhỏ hơn 100%");
    return; // Ngăn chặn việc tiếp tục xử lý khi giá trị không hợp lệ
  }
   // Kiểm tra ràng buộc cho ngày bắt đầu và ngày kết thúc
   const startDate = new Date(ngayBatDau);
   const endDate = new Date(ngayKetThuc);
   const today = new Date();
   today.setHours(0, 0, 0, 0); // Đặt giờ phút giây về 0 để chỉ so sánh ngày
 
   // Kiểm tra ngày bắt đầu không nhỏ hơn ngày kết thúc
   if (startDate > endDate) {
     alert("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
     return;
   }
 
   // Kiểm tra ngày bắt đầu phải là ngày hiện tại hoặc ngày tương lai
   if (startDate < today) {
     alert("Ngày bắt đầu phải là ngày hiện tại hoặc một ngày trong tương lai!");
     return;
   }
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
          <Label>Giá trị (%):</Label>
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
