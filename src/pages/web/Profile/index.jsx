import React, { useState } from 'react';

const Profile = () => {
  // Khởi tạo state với dữ liệu mặc định
  const [profileData, setProfileData] = useState([
    { label: 'First name', type: 'text', value: 'John' },
    { label: 'Last name', type: 'text', value: 'Doe' },
    { label: 'Email address', type: 'email', value: 'johndoe@example.com' },
    { label: 'Username', type: 'text', value: 'johndoe123' },
  ]);

  // Hàm xử lý khi người dùng thay đổi giá trị
  const handleChange = (index, newValue) => {
    const updatedProfileData = [...profileData];
    updatedProfileData[index].value = newValue; // Cập nhật giá trị mới
    setProfileData(updatedProfileData); // Cập nhật state
  };
  const handleSave = () => {
    console.log('Saved data:', profileData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Account</h1>

        {/* Personal Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="flex items-center gap-6 mb-6">
            <img
              src="https://via.placeholder.com/100"
              alt="Avatar"
              className="w-20 h-20 rounded-full border-2 border-gray-500"
            />
            <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
              Change avatar
            </button>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileData.map((field, index) => (
              <div key={index} className="col-span-2 md:col-span-1">
                <label className="block text-gray-400 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={e => handleChange(index, e.target.value)} // Cập nhật giá trị khi nhập
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                />
              </div>
            ))}
            <div className="col-span-2">
              <label className="block text-gray-400 mb-2">Timezone</label>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                defaultValue="Pacific Standard Time"
              >
                <option>Pacific Standard Time</option>
                <option>Eastern Standard Time</option>
                <option>Central European Time</option>
              </select>
            </div>
          </form>
          <button
            onClick={handleSave}
            className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </section>
      </div>
    </div>
  );
};

export default Profile;
