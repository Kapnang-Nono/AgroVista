import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../../redux/orebiSlice';
import { baseURL, MSG_VAR } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const {Users} = useSelector((state) => state.orebiReducer)
  const [users, setUsers] = useState(Users);
  const navigate = useNavigate()

  useEffect(() => {
     dispatch(
       getUsers()
     )
  }, [Users && Users.length])

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const dispatch = useDispatch()
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

  const filteredUsers = users.filter(user => 
    (user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedRole === 'All' || user.role === selectedRole)
  );

  const handleAddOrEditUser = (userData) => {
    if (userData.id) {
      setUsers(users.map(user => user.id === userData.id ? userData : user));
    } else {
      setUsers([...users, { ...userData, id: users.length + 1 }]);
    }
    setIsUserModalOpen(false);
  };

  const handleDeleteUser = async (userId) => {
     try {
      const resp = await fetch(`${baseURL}/api/admin/users/${userId}`, {method: 'DELETE'})
      const data = await resp.json()
      alert(data.message)
      setTimeout(() => {
        window.location.href = "/admindashboard/usermanagement"
      }, 1000)
     } catch (error) {
      console.log(error)
     }
  };

  const openUserModal = (user = null) => {
    setCurrentUser(user || { username: '', lastname: '', email: '', role: '', status: 'Unactive', password: '' });
    setIsUserModalOpen(true);
  };

  const openUserDetails = (user) => {
    setCurrentUser(user);
    setIsUserDetailsOpen(true);
  };

  // const tabs = ['All', 'Client', 'Farmer', 'Consultant', 'Driver'];
  const tabs = []

  const UserModal = ({ isOpen, onClose, onSave, user }) => {
    const [localUser, setLocalUser] = useState({
      firstname: "",
      lastname: "",
      email: "",
      role:"",
      status: "Unactive",
      password: "",
    });

    const handleChange = (e) => {
      const {name, value, type, checked} = e.target
      if(type === 'checkbox'){
        setLocalUser({
          ...localUser,
          status: checked ? 'Active': 'Unactive'
        })
      }else{
        setLocalUser({
          ...localUser,
          [name]: value
        })
      }
    }
  
    useEffect(() => {
      setLocalUser(user); // Reset the form when the modal opens with a new user
    }, [user]);
  
    if (!isOpen) return null;

    const handleEditUser = async () => {
     if(user && user._id){
      try {
        const resp = await fetch(`${baseURL}/api/admin/users/${user._id}`, {method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
           firstname: localUser.firstname,
           email: localUser.email,
           role: localUser.role,
           status: localUser.status,
           lastname: localUser.lastname
          })
        })
        await resp.json().then(() => {
         window.location.reload()
        })
       } catch (error) {
        console.log(error)
       }
     }else{
       await fetch(`${baseURL}/api/admin/users/`, {
         method:"POST",
         headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
         body:JSON.stringify(localUser)
       })
         .then((response) => response.json())
         .then((data) => {
           const {status, message} = data
           if(status === MSG_VAR.ERROR){
             alert(message)
           }else{
            alert(message)
            window.location.reload()
           }
         })
     }
   }; 
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
        <div className="bg-white p-6 rounded-lg w-96 ">
          <h2 className="text-xl font-bold mb-4">{localUser._id ? 'Edit User' : 'Add New User'}</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSave(localUser); // Send local form data to the parent
          }}>
            <div className="space-y-4">
              <input
                className="w-full p-2 border rounded"
                placeholder="first name"
                name='firstname'
                value={localUser.firstname}
                onChange={handleChange}
                // required
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="last name"
                name='lastname'
                value={localUser.lastname}
                onChange={handleChange}
                // required
              />
              <input
                className="w-full p-2 border rounded"
                type="email"
                placeholder="Email"
                value={localUser.email}
                name='email'
                onChange={handleChange}
                // required
              />
              <select
                className="w-full p-2 border rounded"
                value={localUser.role}
                name='role'
                onChange={handleChange}
                // required
              >
                <option value="">Select Role</option>
                <option value="Client">Client</option>
                <option value="Farmer">Farmer</option>
                <option value="Consultant">Consultant</option>
                <option value="Driver">Driver</option>
              </select>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localUser.status === 'Active'}
                  onChange={handleChange}
                />
                <span>{localUser.status}</span>
              </div>
             {!localUser._id && <input
                className="w-full p-2 border rounded"
                type="password"
                placeholder="Password"
                name='password'
                value={localUser.password}
                onChange={handleChange}
                // required
              />}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button type="button" onClick={handleEditUser} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save User</button>
              <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  

  const UserDetailsPage = ({ user, onClose }) => {
    if (!isUserDetailsOpen) return null;

    return (
      <div  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
        <div className="bg-white p-6 rounded-lg w-96 ">
          <h2 className="text-xl font-bold mb-4">User Details</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">Profile</h3>
            <p><strong>Username:</strong> {user.firstname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Status:</strong> {user.status}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">Activity Logs</h3>
            <p>Recent activity will be displayed here.</p>
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={() => openUserModal(user)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit User</button>
            <button onClick={() => {
              handleDeleteUser(user.id);
              onClose();
            }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete User</button>
            <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{height: '590px'}} className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <div className="mb-4">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="my-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Roles</option>
          <option value="Client">Client</option>
          <option value="Farmer">Farmer</option>
          <option value="Consultant">Consultant</option>
          <option value="Driver">Driver</option>
        </select>
        <button
          onClick={() => openUserModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New User
        </button>
      </div>

      <table className="min-w-full bg-white">
        <thead className='text-left'>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">
                <button onClick={() => openUserDetails(user)} className="text-blue-500 hover:underline">
                  {user.firstname} 
                </button>
              </td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => openUserModal(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleAddOrEditUser}
        user={currentUser}
      />

      {currentUser && (
        <UserDetailsPage
          user={currentUser}
          onClose={() => setIsUserDetailsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;