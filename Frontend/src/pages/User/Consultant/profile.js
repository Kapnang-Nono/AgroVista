import React, { useState, useRef } from 'react';

const ConsultantProfile = () => {
  const [firstName, setFirstName] = useState('Sarah');
  const [lastName, setLastName] = useState('Johnson');
  const [email, setEmail] = useState('sarah.johnson@consultancy.com');
  const [specialization, setSpecialization] = useState('Management');
  const [yearsOfExperience, setYearsOfExperience] = useState('5-10');
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImage(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-1">Consultant Profile</h1>
      <p className="text-gray-600 mb-6">Manage your ConsultancyPro Account</p>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Profile Picture</h2>
        <div className="flex items-center">
          <div 
            className="w-24 h-24 bg-gray-200 rounded-full mr-4 flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">PNG, JPG, GIF (max size of 5MB)</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Update Photo
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
          <select
            id="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="Crop Selection">Crop Selection</option>
            <option value="Planting Techniwues">Planting Techniques</option>
            <option value="Soil testing">Soil Testing</option>
            <option value="Marketing">Marketing</option>
            <option value="Animal Husbandry">Animal Husbandry</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="changePassword" className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
          <input
            type="password"
            id="changePassword"
            placeholder="Enter new password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            Deactivate Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsultantProfile;