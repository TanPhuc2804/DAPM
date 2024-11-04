import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const EditStaff = () => {
  const { id } = useParams();
  const [mastaff, setmastaff] = useState(id);
  const [tenNV, setTenNV] = useState("");
  const [cccd, setCCCD] = useState("");
  const [namsinh, setNamSinh] = useState("");
  const [sdt, setSDT] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [allRoles, setAllRoles] = useState([]);
  const [diachi, setDiaChi] = useState("");
  const [ngayvaolam, setNgayVaoLam] = useState("");
  const [gioitinh, setGioiTinh] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  // Hàm tính tuổi dựa vào ngày sinh
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Điều chỉnh tuổi nếu ngày sinh chưa tới trong năm hiện tại
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/staff/get-staff/${id}`);
        const staff = response.data.staff;
        
        setTenNV(staff.fullname);
        setCCCD(staff.cccd);
        setSDT(staff.numberphone);
        setCurrentRole(staff.role);
        setDiaChi(staff.address);
        setGioiTinh(staff.gender);
        setEmail(staff.email);
        setUserName(staff.username);
        setNamSinh(new Date(staff.birthday).toISOString().split('T')[0]);
        setNgayVaoLam(new Date(staff.ngaylamviec).toISOString().split('T')[0]);
      } catch (error) {
        console.error("Failed to fetch staff", error);
      }
    };

    if (id) {
      fetchStaff();
    }
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:3000/role/get-allrole")
      .then(res => setAllRoles(res.data.role))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentRole);
    if (!tenNV) return alert("Họ tên nhân viên không được để trống.");
    if (!cccd) return alert("CCCD không được để trống.");
    if (!namsinh) return alert("Năm sinh không được để trống.");
     // Ràng buộc: Tuổi phải đủ 18
     const age = calculateAge(namsinh);
     if (age < 18) {
       return alert("Nhân viên phải đủ 18 tuổi.");
     }
    if (!gioitinh) return alert("Vui lòng chọn giới tính.");
    if (!sdt) return alert("Số điện thoại không được để trống.");
    if (!/^\d{10}$/.test(sdt)) {
      alert("Số điện thoại phải là số và phải có 10 ký tự");
      return;
    }
    if (!sdt.startsWith("0")) {
      alert("SĐT phải bắt đầu là số 0");
      return;
    }
    if (!email) return alert("Email không được để trống.");
    if (!email.endsWith("@gmail.com")) {
      alert("Email phải có đuôi @gmail.com");
      return;
    }
    // if (!currentRole) return alert("Vui lòng chọn chức vụ.");
    if (!diachi) return alert("Địa chỉ không được để trống.");
    if (!ngayvaolam) return alert("Ngày vào làm không được để trống.");
    if (!username) return alert("Tên người dùng không được để trống.");

    try {
      const updatedStaff = {
        fullname: tenNV,
        cccd: cccd,
        birthday: namsinh,
        numberphone: sdt,
        role: currentRole,
        address: diachi,
        ngaylamviec: ngayvaolam,
        gender: gioitinh,
        email: email,
        username: username,
      };

      await axios.put(`http://localhost:3000/staff/upt-staff/${id}`, updatedStaff);
      alert("Cập nhật staff thành công");
      navigate('/admin/staff');
    } catch (error) {
      console.error("Cập nhật staff thất bại", error);
      alert("Cập nhật staff thất bại");
    }
  };

  return (
    <Container>
      <Form>
        <h2 style={{ fontWeight: 'bold' }}>Sửa Thông Tin Nhân Viên</h2>
        <InputField>
          <Label>Mã Nhân Viên:</Label>
          <Input type="text" value={mastaff} disabled />
        </InputField>
        <InputField>
          <Label>Họ Tên NV:</Label>
          <Input type="text" value={tenNV} onChange={(e) => setTenNV(e.target.value)} />
        </InputField>
        <InputField>
          <Label>CCCD:</Label>
          <Input type="text" value={cccd} onChange={(e) => setCCCD(e.target.value)} />
        </InputField>
        <InputField>
          <Label>Năm Sinh:</Label>
          <Input type="date" value={namsinh} onChange={(e) => setNamSinh(e.target.value)} />
        </InputField>
        <InputField>
          <Label>Giới Tính:</Label>
          <Select value={gioitinh} onChange={(e) => setGioiTinh(e.target.value)}>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </Select>
        </InputField>
        <InputField>
          <Label>SĐT</Label>
          <Input type="text" value={sdt} onChange={(e) => setSDT(e.target.value)} />
        </InputField>
        <InputField>
          <Label>Email</Label>
          <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputField>
        <InputField>
          <Label>Chức vụ:</Label>
          <Select value={currentRole} onChange={(e) => setCurrentRole(e.target.value)}>
            {allRoles.map((role) => (
              <option key={role._id} value={role._id}>{role.name}</option>
            ))}
          </Select>
        </InputField>
        <InputField>
          <Label>Địa chỉ</Label>
          <Input type="text" value={diachi} onChange={(e) => setDiaChi(e.target.value)} />
        </InputField>
        <InputField>
          <Label>Ngày vào làm</Label>
          <Input type="date" value={ngayvaolam} onChange={(e) => setNgayVaoLam(e.target.value)} />
        </InputField>
        <InputField>
          <Label>Tên người dùng:</Label>
          <Input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
        </InputField>
        <ButtonContainer>
          <Link to="/admin/staff">
            <Button className="back">Trở Về</Button>
          </Link>
          <Button onClick={handleSubmit} className="update">Cập Nhật</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default EditStaff;
