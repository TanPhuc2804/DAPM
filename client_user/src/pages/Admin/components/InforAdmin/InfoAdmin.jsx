import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../assets/hooks/auth.context';
import { openNotification } from '../../../../assets/hooks/notification';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Select } from 'antd';
import ImageUser from '../ImageUser/ImageUser';

function InfoAdmin() {
  const [adminData, setAdminData] = useState(null);
  const [editableData, setEditableData] = useState(null);
  const [imageFile, setImageFile] = useState("");
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { auth,setAuth } = useContext(AuthContext);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/get-admin`, { withCredentials: true });
        setAdminData(response.data.data);
        setImageFile(response.data.data.image)
        setEditableData(response.data.data);
      } catch (error) {
        console.log(err)
        setError(error.response?.data?.message || 'Failed to fetch admin data');
      }
    };
    fetchAdminData();
  }, [auth.user.id]);
  const calculateAge = (birthday) => {
    if (!birthday) return "Birthday not provided";
    try {
      const birthDate = new Date(birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } catch (error) {
      console.error("Error calculating age:", error);
      return "Invalid birthday";
    }
  };
//  <option value="">Select Gender</option>
                  // <option value="Nam">Nam</option>
                  // <option value="Nữ">Nữ</option>
                  // <option value="Khác">Khác</option>
  const options = [
    {value:"Nam",label:"Nam"},
    {value:"Nữ",label:"Nữ"}
  ]

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    let name =""
    let value = ""
    if(!e.target){
      name = "gender"
      value = e
    }else{
      name= e.target.name;
      value = e.target.value
    }

    // Validate phone number length (assuming 10-11 digits)
    if (name === "numberphone" && value.length > 11) return;

    // Allow only numeric input for CCCD
    if (name === "cccd" && !/^\d*$/.test(value)) return;
    setEditableData((prevData) => ({ ...prevData, [name]: value }));

  };
  const handleImageChange = async (e) => {
    const upload_preset = "uploat_data"
    const formData = new FormData()
    formData.append("file", e.target.files[0])
    formData.append('upload_preset', upload_preset)
    const responseImage = await fetch("https://api.cloudinary.com/v1_1/da5mlszld/image/upload", {
      method: "POST",
      body: formData
    })

    const objectImage = await responseImage.json()
    setImageFile(objectImage.url);
  };


  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout")
      .then(res => res.data)
      .then(data => {
        setAuth({
          isAuthenticated: false,
          user: {
            id: '',
            name: '',
            email: ''
          }
        });
        openNotification(true,"Đăng xuất thành công","")
        navigate('/');
      })
      .catch(err => console.log(err));

   
  };

  const handleSave = async () => {
    try {

      const updatedData = { ...editableData, image: imageFile };
      const age = calculateAge(updatedData.birthday)
      if (age < 18) {
        openNotification(false, "Cập nhật thông tin thất bai", "Tuổi phải trên 18")
        return
      }

      const response = await axios.put(
        `http://localhost:3000/admin/update-admin/${adminData._id}`,
        updatedData,
        { withCredentials: true }
      );

      setAdminData(response.data.data);
      setIsEditing(false);
      openNotification(true, "Cập nhật thành công", "")
    } catch (error) {
      console.error('Failed to update admin:', error);
      openNotification(false, "Cập nhật không thành công", "")
    }
  };
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center p-10 bg-gray-100 min-h-auto">
        <div className="w-1/4 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <ImageUser
              urlImage={imageFile}
              size={300}
              className="w-60 h-60 rounded-full object-cover mt-4 mb-4"
            />
            <h2 className="text-xl font-bold">{adminData.fullname}</h2>
            <p className="text-sm text-gray-500">{adminData.role}</p>
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-4"
              />
            )}
          </div>
          <Button onClick={handleLogout} className='mt-[5px]'>Đăng xuất</Button>
        </div>

        <div className="w-[600px] ml-6 bg-white shadow-lg rounded-lg p-6 ">
          <div className="flex justify-between items-center">
            <h4 className="text-2xl font-semibold mb-6">Thông tin Admin</h4>
            <Button
              onClick={toggleEdit}
              className="px-4 py-2 h-[40px] w-[70px] bg-blue-500 text-white rounded-lg"
            >
              {isEditing ? "Hủy" : "Cập nhật"}
            </Button>
          </div>
          <div className="space-y-4">
            {[{ label: "Username", key: "username" },
            { label: "Phone Number", key: "numberphone" },
            { label: "Email", key: "email" },
            { label: "Address", key: "address" },
            { label: "Full Name", key: "fullname" },
            { label: "ID (CCCD)", key: "cccd" }
            ].map(({ label, key }) => (
              <div className="flex" key={key}>
                <label className="w-32 font-medium text-gray-700 text-left">{label}:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name={key}
                    value={editableData[key]}
                    onChange={handleChange}
                    className="border rounded p-2 flex-grow"
                  />
                ) : (
                  <p className="flex">{adminData[key]}</p>
                )}
              </div>
            ))}

            <div className="flex">
              <label className="w-32 font-medium text-gray-700 text-left">Gender:</label>
              {isEditing ? (
                <Select
                  name="gender"
                  value={editableData.gender}
                  onChange={handleChange}
                  className=" flex-grow"
                  options={options}
                >
                  
                </Select>
              ) : (
                <p className="flex">{adminData.gender}</p>
              )}
            </div>

            <div className="flex">
              <label className="w-32 font-medium text-gray-700 text-left">Birthday:</label>
              {isEditing ? (
                <input
                  type="date"
                  name="birthday"
                  value={editableData.birthday ? editableData.birthday.split('T')[0] : ""}
                  onChange={handleChange}
                  className="border rounded p-2 flex-grow"
                />
              ) : (
                <p className="flex">{adminData.birthday ? new Date(adminData.birthday).toLocaleDateString() : "Not provided"}</p>
              )}
            </div>

            <div className="flex">
              <label className="w-32 font-medium text-gray-700 text-left">Start Date:</label>
              {isEditing ? (
                <input
                  type="date"
                  name="ngaylamviec"
                  value={editableData.ngaylamviec ? editableData.ngaylamviec.split('T')[0] : ""}
                  onChange={handleChange}
                  className="border rounded p-2 flex-grow"
                />
              ) : (
                <p className="flex">{new Date(adminData.ngaylamviec).toLocaleDateString()}</p>
              )}
            </div>

            <div className="flex">
              <label className="w-32 font-medium text-gray-700 text-left   ">Age:</label>
              <p className="flex">{calculateAge(adminData.birthday)}</p>
            </div>
          </div>
          {isEditing && (
            <Button
              onClick={handleSave}
              className="mt-6 px-4 py-2 h-[40px] w-[70px] bg-green-500 text-white rounded-lg"
            >
              Lưu
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default InfoAdmin;