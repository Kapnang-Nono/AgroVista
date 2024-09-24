import React, { useState, useRef, useEffect } from 'react';
import { MSG_VAR, baseURL, USER_ID } from '../../../constants';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const FarmerProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pass, setPassword] = useState('');
  const [confirmNewPassword, setConfirmnewPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [selectedpicture, setSelectedPicture] = useState('')
  const fileInputRef = useRef(null);
  const location = useLocation()

  //@SetAccountUser: To set user account information
  useEffect(() => {
    try {
       fetch(`${baseURL}/api/global/account-details?user=${USER_ID}`)
        .then((response) => response.json())
        .then((responseData) => {
          const {status, data: {
            firstname, lastname, email,
            role
          }} = responseData
           if(status === MSG_VAR.OK){
             setFirstName(firstname)
             setLastName(lastname)
             setEmail(email)
             setTitle(role)
             setSelectedPicture(localStorage.getItem('profilePicture'))
           }
        })
    } catch (error) {
      console.error(error)
    }
  }, [location.pathname === "/farmerdashboard/profile"])


  //@Params function to update only profile picture of user 
  const Updateprofile = async () => {
    const formdata = new FormData()
    formdata.append('file', selectedpicture)
    try {
      const response = await fetch(`${baseURL}/api/global/update-picture/${USER_ID}`, {
        method:'PATCH',
        body: formdata
      })
      const resp = await response.json()
      if(resp.status === MSG_VAR.ERROR){
        alert('Error updating picture: ' + resp.message)
      }
      else if(resp.status === MSG_VAR.OK){
        alert("Great!! : profile picture updated successfully")
        localStorage.setItem('profilePicture', resp.picture)
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  //@Rufus function to update user account info withouth profile picture
  const handleSubmit = async () => {
    console.log('About to send request:...:')
    try {
      const response = await fetch(`${baseURL}/api/farmer/update-profile/${USER_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          fname: firstName,
          lname: lastName,
          password: pass,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword
        })
      })
      const data = await response.json()
      const {status, message} = data
      if(status === MSG_VAR.ERROR){
          alert(message)
      }else{
        alert(message)
        setConfirmnewPassword("")
        setPassword("")
        setNewPassword("")
        window.location.reload()
      }
    } catch (error) {
      console.log('Something went wrong: ', error)
    }
  };

  // @Change to get selected image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedPicture(file)
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
      <h1 className="text-2xl font-bold mb-1">Account Details</h1>

      <div className="mb- mt-2" >
        <h2 className="text-lg font-semibold mb-2">Profile Picture</h2>
        <div className="flex items-center">
          <div 
            className="w-24 h-24 bg-gray-200 rounded-full mr-4 flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            {selectedpicture ? (
              <img src={`${baseURL}/profile/${localStorage.getItem('profilePicture')}`} alt="Profile" className="w-full h-full object-cover" />
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
              onClick={Updateprofile}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Change Photo
            </button>
          </div>
        </div>
      </div>

      <form>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              name='firstName'
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
              name='lastName'
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
            name='email'
            disabled
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            id="title"
            name='title'
            value={title}
            disabled
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option disabled value={title}>{title}</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="changePassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <input
            type="password"
            id="changePassword"
            placeholder="Enter current password"
            name='pass'
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="new Password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter new password"
            name='newPassword'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="changePassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            name='pass'
            value={confirmNewPassword}
            onChange={(e) => setConfirmnewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update
          </button>
          <button
            type="button"
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default FarmerProfile;