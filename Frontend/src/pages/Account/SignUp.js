import React, { useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify"
import { Agri2, Facebooklogo, Googlelogo } from "../../assets/images";
import {baseURL, MSG_VAR} from "../../constants/index"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Client"); // New state for role selection
  const [message, setMessage] = useState("");
  const [msgStatus, setMsgStatus] = useState("");
  

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value); // Capture selected role
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
     
    try {
       const resp = await fetch(`${baseURL}/api/auths/register`, {
          method: 'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email,
            password: password,
            cpass: confirmPassword,
            role: role,
            firstname: firstname,
            lastname: lastname
          })
       })
       const data = await resp.json()
       const {status, message} = data

       if(status === MSG_VAR.ERROR){
          setMessage(message)
          setMsgStatus(status)
          // toast.error(data.message)
       }else{
         setMessage(message)
         setMsgStatus(status)
         setEmail("")
         setPassword("")
         setConfirmPassword("")
         setRole("")
         setTimeout(() => {
            window.location.href = "/signin"
         }, 2500)
       }
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-100 font-sans">
      <div className="w-4/5 md:w-3/5 lg:w-2/3 bg-white flex rounded-lg shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-[#088d34] text-white flex flex-col items-center p-5 relative">
          <img src={Agri2} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col justify-center items-center p-5">
          <div className="w-full max-w-sm">
              <>
                <h2 className="text-2xl mb-5">Sign Up for AgroVista</h2>
                <p className="text-base mb-4 text-gray-500">Create your account to get started !!</p>
                
                <div className="flex flex-col space-y-3 mb-5">
                  <input
                      type="text"
                      placeholder="First Name"
                      name="fistname"
                      value={firstname}
                      onChange={(event) => setFirstName(event.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  <input
                      type="text"
                      placeholder="Last Name"
                      name="lastname"
                      value={lastname}
                      onChange={(event) => setLastName(event.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex items-center mb-5">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-3 text-gray-400">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <form className="flex flex-col space-y-2" onSubmit={handleSignUp}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmail}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  {message && (
                    <p className={`${msgStatus === MSG_VAR.ERROR ? 'text-sm text-red-500': 'text-sm text-green-500'}`}>
                      <span className="font-bold italic mr-1">!</span>
                      {message}
                    </p>
                  )}

                  {/* Role Selection Dropdown */}
                  <select
                    value={role}
                    onChange={handleRoleChange}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Client">Client</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Driver">Driver</option>
                    <option value="Consultant">Consultant</option>
                  </select>

                  <button
                    type="submit"
                    className="p-3 bg-[#088d34] text-white rounded-md hover:bg-blue-500"
                  >
                    Sign Up
                  </button>
                </form>
                <div className="text-center mt-5">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-[#088d34]">Sign In</Link>
                  </p>
                </div>
              </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
