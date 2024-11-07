import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Thêm axios để gửi yêu cầu HTTP
import { Bold, User } from "lucide-react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

   /* Wrapper for DatePicker */
  .date-picker-wrapper {
    flex: 0.7;
    display: flex;
  }

  /* DatePicker style */
  .date-picker {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
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
  const [tenNV, setTenNV] = useState("");
  const [cccd, setCCCD] = useState("");
  const [namsinh, setNamSinh] = useState("");
  const [sdt, setSDT] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [diachi, setDiaChi] = useState("");
  const [ngayvaolam, setNgayVaoLam] = useState("");
  const [gioitinh, setGioiTinh] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  // Định dạng lại ngày thành dd/MM/yyyy trước khi hiển thị trên giao diện
  const formattedNamSinh = dayjs(namsinh).format("YYYY-MM-DD");
  const formattedNgayVaoLam = dayjs(ngayvaolam).format("YYYY-MM-DD");
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
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn việc reload trang khi form được submit
    console.log("Form submitted"); // Thêm log để kiểm tra
    // Kiểm tra từng trường dữ liệu
    if (!tenNV) return alert("Họ tên nhân viên không được để trống.");
    if (!cccd) return alert("CCCD không được để trống.");
     // Ràng buộc: CCCD phải là số và có 12 ký tự
     const cccdPattern = /^[0-9]{12}$/;
     if (!cccdPattern.test(cccd)) {
       return alert("CCCD phải là số và có đúng 12 ký tự.");
     }
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
    if (!selectedRole) return alert("Vui lòng chọn chức vụ.");
    if (!diachi) return alert("Địa chỉ không được để trống.");
    if (!ngayvaolam) return alert("Ngày vào làm không được để trống.");
    if (!username) return alert("Tên người dùng không được để trống.");
    if (!password) return alert("Mật khẩu không được để trống.");
    // Ràng buộc: Mật khẩu phải có ít nhất một chữ cái, một số và một ký tự đặc biệt
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      return alert("Mật khẩu phải chứa ít nhất một chữ cái, một số và một ký tự đặc biệt, và có ít nhất 8 ký tự.");
    }
    if (!passwordConfirm) return alert("Vui lòng xác nhận mật khẩu.");
    if (password !== passwordConfirm) {
      alert("Password không trùng khớp với Password Confirm");
      return;
    }
    // Dữ liệu gửi lên server
    const staffData = {
      fullname: tenNV,
      cccd: cccd,
      birthday: formattedNamSinh,
      numberphone: sdt,
      role: selectedRole,
      address: diachi,
      ngaylamviec: formattedNgayVaoLam,
      gender: gioitinh,
      email: email,
      username: username,
      password: password,
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
  // Lấy danh sách role từ server
  useEffect(() => {
    axios.get("http://localhost:3000/role/get-allrole")
      .then(res => setRoles(res.data.role))
      .catch(err => console.log(err));
  }, []);
  return (
    <Container>
      <Form>
        <h2 style={{ fontWeight: 'bold' }}>Thêm Nhân Viên</h2>
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
          <div className="date-picker-wrapper">
          <DatePicker
            selected={namsinh}
            onChange={(date) => setNamSinh(date)}
            dateFormat= "dd/MM/yyy"
            placeholderText="dd/mm/yyyy"
            className="date-picker"
          />
          </div>
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
          </Select>
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
          <Label>Email</Label>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
        </InputField>

        <InputField>
          <Label>Chức vụ:</Label>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)} // Gán selectedRole thay vì role
            required
            style={{ marginBottom: "10px" }}
          >
            <option value="">Chọn chức vụ</option>
            {roles.map((role) => (
              <option key={role._id} value={role._id}>{role.name}</option>
            ))}
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
          <div className="date-picker-wrapper">
          <DatePicker
            selected={ngayvaolam}
            onChange={(date) => setNgayVaoLam(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyy"
            className="date-picker"
          />
          </div>
        </InputField>

        <InputField>
          <Label>User Name:</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
        </InputField>

        <InputField>
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
        </InputField>

        <InputField>
          <Label>Password Confirm:</Label> {/* Thêm trường Password Confirm */}
          <Input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
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