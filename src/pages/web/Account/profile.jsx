import { useState } from 'react';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: 'Hà Nội, Việt Nam',
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };
  const handleSave = () => {
    setProfile({ ...formData });
    setIsEditing(false);
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 sm:p-8 bg-white rounded-2xl shadow-lg relative">
      {/* Avatar và thông tin cơ bản */}
      <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md mb-4 md:mb-0">
          <img
            src="https://via.placeholder.com/150"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {profile.name}
          </h1>
          <p className="text-gray-500">{profile.email}</p>
          {!isEditing && (
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
              onClick={handleEdit}
            >
              Edit information
            </button>
          )}
        </div>
      </div>

      {/* Form thông tin cá nhân */}
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['name', 'email', 'phone', 'address'].map(field => (
            <div key={field}>
              <label className="block text-lg font-medium text-gray-600 mb-1">
                {field === 'name'
                  ? 'Full Name'
                  : field === 'email'
                    ? 'Email'
                    : field === 'phone'
                      ? 'Phone Number'
                      : 'Address'}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-lg border ${
                  isEditing
                    ? 'border-blue-500 focus:outline-none focus:ring focus:ring-blue-200'
                    : 'border-gray-300 bg-gray-100 text-gray-500'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Nút lưu và hủy */}
      {isEditing && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition duration-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
