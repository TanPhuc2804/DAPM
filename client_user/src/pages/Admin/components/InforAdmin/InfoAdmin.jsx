import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import HeaderComponent from '../HeaderComponents/HeaderComponents';
import { AuthContext } from '../../../../assets/hooks/auth.context';

function InfoAdmin() {
  const [adminData, setAdminData] = useState(null);
  const [editableData, setEditableData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { auth } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/get-admin`, { withCredentials: true });
        setAdminData(response.data.data);
        setEditableData(response.data.data);
        setImageUrl(response.data.data.image);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch admin data');
      }
    };
    fetchAdminData();
  }, [auth.user.id]);

  const calculateAge = (birthday) => {
    if (!birthday) return "Birthday not provided";
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validate phone number length (assuming 10-11 digits)
    if (name === "numberphone" && value.length > 11) return;
  
    // Allow only numeric input for CCCD
    if (name === "cccd" && !/^\d*$/.test(value)) return;
    setEditableData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedData = { ...editableData, image: imageUrl };
      const response = await axios.put(
        `http://localhost:3000/admin/update-admin/${adminData.id}`, 
        updatedData, 
        { withCredentials: true }
      );
      setAdminData(response.data.data);
      setIsEditing(false);
      alert('Admin updated successfully');
    } catch (error) {
      console.error('Failed to update admin:', error);
      setError(error.response?.data?.message || 'Failed to update admin');
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
      <HeaderComponent />
      <div className="flex justify-center p-10 bg-gray-100 min-h-screen">
        
        <div className="w-1/4 p-4 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col items-center">
            <img className="w-24 h-24 rounded-full mb-4" src={imageUrl || adminData.image} alt="Profile" />
            <h2 className="text-xl font-bold">{adminData.fullname}</h2>
            <p className="text-sm text-gray-500">{adminData.role}</p>
            {isEditing && (
              <input
                type="text"
                placeholder="Enter image URL"
                className="mt-4 px-4 py-2 border rounded-lg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            )}
          </div>
        </div>

        <div className="w-3/4 ml-6 bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h4 className="text-2xl font-semibold mb-6">Admin Information</h4>
            <button
              onClick={toggleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
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
                <label className="w-32 font-medium text-gray-700">{label}:</label>
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
              <label className="w-32 font-medium text-gray-700">Gender:</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={editableData.gender}
                  onChange={handleChange}
                  className="border rounded p-2 flex-grow"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Female">Khác</option>
                  
                </select>
              ) : (
                <p className="flex">{adminData.gender}</p>
              )}
            </div>

            <div className="flex">
              <label className="w-32 font-medium text-gray-700">Birthday:</label>
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
              <label className="w-32 font-medium text-gray-700">Start Date:</label>
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
              <label className="w-32 font-medium text-gray-700">Age:</label>
              <p className="flex">{calculateAge(adminData.birthday)}</p>
            </div>
          </div>
          {isEditing && (
            <button
              onClick={handleSave}
              className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default InfoAdmin;