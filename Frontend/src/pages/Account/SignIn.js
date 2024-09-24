import React, { useState } from "react";
import {baseURL, MSG_VAR, USER_ROLE} from "../../constants/index"
import { Link } from "react-router-dom"
import { Agri2, Facebooklogo, Googlelogo } from "../../assets/images";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgStatus, setMsgStatus] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      const resp = await fetch(`${baseURL}/api/auths/login`, {
         method: 'POST',
         headers:{'Content-Type': 'application/json'},
         body: JSON.stringify({
           email: email,
           password: password,
         })
      })
      const response = await resp.json()
      const {
        status, 
        message, 
        data: {role, userID}
      } = response

      if(status === MSG_VAR.ERROR){
         setMessage(message)
         setMsgStatus(status)
         // toast.error(data.message)
      }else{
         if(status === MSG_VAR.OK){
           setMessage(message)
             setMsgStatus(status)
               setEmail("")
                setPassword("")
             switch (role) {
              case USER_ROLE.FARMER:
                setTimeout(() => {
                   sessionStorage.setItem('userID', userID)
                   window.location.href = "/farmerdashboard"
                }, 2000)
                break;
              case USER_ROLE.DRIVER:
                setTimeout(() => {
                  sessionStorage.setItem('driverId', userID)
                  window.location.href = "/driverdashboard"
               }, 2000)
                break;
              case USER_ROLE.CONSULTANT:
                setTimeout(() => {
                  sessionStorage.setItem('consultantID', userID)
                  window.location.href = "/consultantdashboard"
               }, 2000)
                break;
              case USER_ROLE.ADMIN:
                setTimeout(() => {
                  sessionStorage.setItem('adminID', userID)
                  window.location.href = "/admindashboard"
               }, 2000)
                break;
              default: {/**client status */}
                sessionStorage.setItem('userID', userID)
                window.location.href = "/"
                break;
             }
         }       
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
            {/* {successMsg ? (
              <div className="w-full flex flex-col justify-center">
                <p className="w-full px-4 py-10 text-green-500 font-medium">
                  {successMsg}
                </p>
                <Link to="/signup">
                  <button
                    className="w-full h-10 bg-[#088d34] text-gray-200 rounded-md text-base font-semibold 
                    tracking-wide hover:bg-black hover:text-white duration-300"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : ( */}
              <>
                <h2 className="text-2xl mb-5">Login to AgroVista</h2>
                
                <p className="text-base mb-4 text-gray-500" >Welcome back! login with your data that you entered during registration</p>
                  
               
                <div className="flex flex-col space-y-3 mb-5">
                  <button className="bg-white border border-gray-300 py-1.5 px-1 flex items-center justify-center rounded-md shadow-lg">
                    <img src={Googlelogo} alt="Google" className="w-5 mr-2" />
                    Continue with Google
                  </button>
                  <button className="bg-white border border-gray-300 py-1.5 px-4 flex items-center justify-center rounded-md shadow-lg">
                    <img src={Facebooklogo} alt="Facebook" className="w-5 mr-2" />
                    Continue with Facebook
                  </button>
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
                  {message && (
                    <p className={`${msgStatus === MSG_VAR.ERROR ? 'text-sm text-red-500': 'text-sm text-green-500'}`}>
                      <span className="font-bold italic mr-1">!</span>
                      {message}
                    </p>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Remember me
                    </label>
                    <a href="#" className="text-[#088d34]">Forgot Password?</a>
                  </div>
                  <button
                    type="submit"
                    className="p-3 bg-[#088d34] text-white rounded-md"
                  >
                    Sign In
                  </button>
                </form>
                <div className="text-center mt-5">
                  <p className="text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-[#088d34]">Sign Up</Link>
                  </p>
                </div>
              </>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
