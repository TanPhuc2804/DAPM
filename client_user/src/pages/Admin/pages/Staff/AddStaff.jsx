import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Thêm axios để gửi yêu cầu HTTP
import { Bold } from "lucide-react";

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

 & > input, & > select {
    flex: 0.7; /* Chiếm 70% không gian */
  }
`;

const Label = styled.label`
 font-weight: bold;
`;
const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
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
const AddStaff = () => {
    const [maNV, setMaNV] = useState("");
    const [tenNV, setTenNV] = useState("");
    const [cccd, setCCCD] = useState("");
    const [namsinh, setNamSinh] = useState("");
    const [sdt, setSDT] = useState("");
    const [chucvu, setChucVu] = useState("");
    const [diachi, setDiaChi] = useState("");
    const [ngayvaolam, setNgayVaoLam] = useState(1);
    const [gioitinh, setGioiTinh] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn việc reload trang khi form được submit
        console.log("Form submitted"); // Thêm log để kiểm tra

        // Dữ liệu gửi lên server
        const staffData = {
          staffcode: maNV,
          fullname: tenNV,
          cccd: cccd,
          birthday: namsinh,
          numberphone: sdt,
          chucvu: chucvu,
          address: diachi,
          ngaylamviec: ngayvaolam,
          gender: gioitinh,
          email: email,
          status: "active",
        };

        try {
          // Gửi yêu cầu POST để tạo staff mới
          const response = await axios.post("http://localhost:3000/staff/create-staff/", staffData);
          console.log(response);
          if (response.data.status) {
            alert("Thêm nhân viên thành công!");
            navigate("/admin/staff");
          } else {
            alert("Thêm nhân viên thất bại!");
          }
        } catch (error) {
          console.error("Lỗi khi thêm nhân viên:", error);
          alert("Đã xảy ra lỗi khi thêm nhân viên.");
        }
      };
  return (
    <Container>
        <Form>
            <h2 style={{fontWeight:'bold'}}>Thêm Nhân Viên</h2>
            <InputField>
                <Label>Mã NV:</Label>
                <Input
                    type="text"
                    value={maNV}
                    onChange={(e) => setMaNV(e.target.value)}
                    required
                    style={{marginBottom:"10px"}}
                />
            </InputField>

            <InputField>
          <Label>Họ Tên NV:</Label>
          <Input
            type="text"
            value={tenNV}
            onChange={(e) => setTenNV(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
        </InputField>

        <InputField>
          <Label>CCCD:</Label>
          <Input
            type="text"
            value={cccd}
            onChange={(e) => setCCCD(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
        </InputField>

        <InputField>
          <Label>Năm Sinh:</Label>
          <Input
            type="date"
            value={namsinh}
            onChange={(e) => setNamSinh(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
        </InputField>

        <InputField>
          <Label>Giới Tính:</Label>
          <Select
            value={gioitinh}
            onChange={(e) => setGioiTinh(e.target.value)} // Cập nhật trạng thái giới tính
            required
            style={{ marginBottom: "10px" }}
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </Select>
        </InputField>

        <InputField>
          <Label>SĐT:</Label>
          <Input
            type="text"
            value={sdt}
            onChange={(e) => setSDT(e.target.value)}
            required
            style={{ marginBottom: "10px"}}
          />
        </InputField>

        <InputField>
          <Label>Email</Label>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: "10px"}}
          />
        </InputField>

        <InputField>
          <Label>Chức Vụ:</Label>
          <Select
            type="text"
            value={chucvu}
            onChange={(e) => setChucVu(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          >
            <option value="">Chọn chức vụ</option>
            <option value="Bán hàng">Nhân viên bán hàng</option>
            <option value="Kho">Nhân viên kho</option>
            <option value="Giao hàng">Nhân viên giao hàng</option>
            <option value="Lao công">Nhân viên lao công</option>
            <option value="Bảo vệ">Nhân viên bảo vệ</option>
          </Select>
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
          <Label>Ngày vào làm:</Label>
          <Input
            type="date"
            value={ngayvaolam}
            onChange={(e) => setNgayVaoLam(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
        </InputField>
        <ButtonContainer>
          <Link to="/admin/staff">
            <Button className="back">Back</Button>
          </Link>
          <Button className="add" onClick={handleSubmit}>THÊM</Button>
        </ButtonContainer>
        </Form>
    </Container>
  )
};

export default AddStaff