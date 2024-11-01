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

const EditCustomer = () => {
  const { id } = useParams();
  const [maKH, setMaKH] = useState(id);
  const [username, setUserName] = useState("");
  const [fullname, setFullName] = useState("");
  const [sdt, setSDT] = useState("");
  const [email, setEmail] = useState("");
  const [ngaysinh, setNgaySinh] = useState("");
  const [gioitinh, setGioiTinh] = useState("");
  const [diachi, setDiaChi] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const respone = await axios.get(`http://localhost:3000/customer/list-customer/${id}`);
        const customer = respone.data.message;
        setUserName(customer.username);
        setFullName(customer.fullname);
        setSDT(customer.numberphone);
        setEmail(customer.email);
        // Chuyển đổi định dạng ngày
        const formattedDate = customer.birthday ? customer.birthday.split("T")[0] : "";
        setNgaySinh(formattedDate);
        setGioiTinh(customer.gender);
        setDiaChi(customer.address);
      } catch (error) {
        console.error("Failed to fetch customer", error);
      }
    };
    if (id) {
      fetchCustomers();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra các trường dữ liệu không được để trống
    if (!fullname.trim()) {
      alert("Tên khách hàng không được để trống");
      return;
    }
    if (!username.trim()) {
      alert("Tên đăng nhập không được để trống");
      return;
    }
    if (!ngaysinh.trim()) {
      alert("Ngày sinh không được để trống");
      return;
    }
    if (!sdt.trim()) {
      alert("Số điện thoại không được để trống");
      return;
    }
    if (!/^\d{10}$/.test(sdt)) {
      alert("Số điện thoại phải là số và phải có 10 ký tự");
      return;
    }
    if (!email.trim()) {
      alert("Email không được để trống");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      alert("Email phải có đuôi @gmail.com");
      return;
    }
    if (!diachi.trim()) {
      alert("Địa chỉ không được để trống");
      return;
    }
    // Kiểm tra tuổi
    const today = new Date();
    const birthDate = new Date(ngaysinh);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 16) {
      alert("Khách hàng phải đủ 16 tuổi");
      return;
    }
    try {
      const updateCustomer = {
        fullname: fullname,
        numberphone: sdt,
        email: email,
        birthday: ngaysinh,
        gender: gioitinh,
        address: diachi,
        username: username,
      };
      console.log(updateCustomer)
      await axios.put(`http://localhost:3000/customer/update/${id}`, updateCustomer);
      alert("Cập nhật Customer thành công");
      navigate('/admin/customer');
    } catch (error) {
      console.error("Cập nhật Customer thất bại", error);
      alert("Cập nhật thất bại");
    }
  }
  return (
    <Container>
      <Form >
        <h2 style={{ fontWeight: 'bold' }}>Sửa Khách Hàng</h2>
        <InputField>
          <Label>Mã KH:</Label>
          <Input type="text" value={maKH} disabled />
        </InputField>
        <InputField>
          <Label>Tên KH:</Label>
          <Input type="text" value={fullname} onChange={(e) => setFullName(e.target.value)} />
        </InputField>
        <InputField>
          <Label>UserName:</Label>
          <Input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
        </InputField>
        <InputField>
          <Label>Ngày Sinh:</Label>
          <Input type="date" value={ngaysinh} onChange={(e) => setNgaySinh(e.target.value)} />
        </InputField>
        <InputField>
          <Label>Giới Tính:</Label>
          <Select value={gioitinh} onChange={(e) => setGioiTinh(e.target.value)}>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </Select>
        </InputField>
        <InputField>
          <Label>SĐT:</Label>
          <Input type="text" value={sdt} onChange={(e) => setSDT(e.target.value)} />
        </InputField>
        <InputField>
          <Label>Email:</Label>
          <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputField>
        <InputField>
          <Label>Địa chỉ:</Label>
          <Input type="text" value={diachi} onChange={(e) => setDiaChi(e.target.value)} />
        </InputField>
        <ButtonContainer>
          <Link to="/admin/customer"> {/* Đường link cho nút Back */}
            <Button className="back">Back</Button>
          </Link>
          {/* Đường link cho nút Cập nhật */}
          <Button className="update" onClick={handleSubmit}>Update</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );;
};

export default EditCustomer