import axios from "axios";
import React, { useEffect, useState } from "react";


const initialPasswordData = {
  currentPassword:'',
  newPassword:'',
  confirmPassword:'',
}

const ChangePass = () => {
    const [errorMsg,setErrorMsg] = useState('') ;
    const [passwordData,setPasswordData] = useState(initialPasswordData)
    const [resetBtnStatus,setResetBtnStatus] = useState(false);

    const onPasswordInputChange = (e)=>{
      setPasswordData({...passwordData,[e.target.name]:e.target.value}) ;
    }

    const checkPasswordLength  = ()=>{
      if(passwordData.newPassword.length < 8){
        setErrorMsg('Password must be at least 8 characters!');
      }
    };

    useEffect(()=>{
      if((passwordData.newPassword.length > 0 && passwordData.newPassword.length < 8) && (passwordData.newPassword.trim()!=='') ){
        checkPasswordLength()
        setResetBtnStatus(true);
      }
      else if(passwordData.newPassword.length <8){
        if(passwordData.newPassword.length !== 0){
          setErrorMsg('Password must be at least 8 characters!');
        }
        setResetBtnStatus(false);
      }
      else{
        setErrorMsg('');
      }
    },[passwordData.newPassword]);

    const isPasswordAndConfirmpasswordSame = ()=>{
      if(passwordData.newPassword<8 || passwordData.newPassword===''){
        setErrorMsg("Password must be at least 8 characters!");
        return false;
      }
      if(passwordData.newPassword !== passwordData.confirmPassword){
       setErrorMsg("Password is not same.");
       return false;
      }
      setErrorMsg('');
      return true;
    }

    const resetPassword = async (e)=>{
      e.preventDefault();
      try {
        if(!isPasswordAndConfirmpasswordSame()){
          return null;
        }

        setResetBtnStatus(false);
        const BackendURL = import.meta.env.VITE_backendURL;
        const response = await axios.put(`${BackendURL}/settings/change-password`,passwordData,{withCredentials:true,});
        setPasswordData(initialPasswordData);
        alert("Password reset successfully.")
      } catch (error) {
        if(error.response && error.response.data.error){
          setErrorMsg(error.response.data.error) ;
        }
        else{
          setErrorMsg("Something went wrong, please try again")
        }
      }
    }

  return (
    <div className="w-full h-full flex flex-col font-plex ">
      <div className="w-full px-2 border-b-[1px] dark:border-gray-500 pb-4 mb-6">
        <h1 className="text-xl font-bold dark:text-white">Change your password</h1>
      </div>
      <div className="w-full dark:border-gray-500 ">
        <form className="w-full px-2 flex flex-col">
          <label className="mb-1 text-gray-500">Current password</label>
          <input
          onChange={onPasswordInputChange}
          value={passwordData.currentPassword}
            type="password"
            name="currentPassword"
            className=" p-1 px-2 text-lg rounded-lg outline-none border-[1px] dark:border-gray-500 dark:bg-black dark:text-white"
          />
        </form>
      </div>
      <div className="w-full px-2 mt-5">
        <form className="w-full flex flex-col">
          <label className="mb-1 text-gray-500">New password</label>
          <input
          onChange={onPasswordInputChange}
          value={passwordData.newPassword}
            type="password"
            name="newPassword"
            className=" mb-5 w-full p-1 px-2 text-lg rounded-lg outline-none border-[1px] dark:border-gray-500 dark:bg-black dark:text-white"
          />

          <label className="mb-1 text-gray-500">Confirm password</label>
          <div className="w-full">
            <input
            onChange={onPasswordInputChange}
            value={passwordData.confirmPassword}
              type="password"
              name="confirmPassword"
              className="w-full mb-2 p-1 px-2 text-lg rounded-lg outline-none border-[1px] dark:border-gray-500 dark:bg-black dark:text-white "
            />
            {errorMsg!=='' && <div className='text-red-500 px-2' >{errorMsg}</div> }
          </div>
        </form>
      </div>
      <div className="w-full">
        <div >
          <button onClick={resetPassword} className={`outline-none px-4 py-1 text-lg mt-5 text-white font-semibold rounded-3xl 
            ${resetBtnStatus?`bg-[#6356E5] hover:bg-[#7166e5] cursor-pointer`:`bg-[#7166e5] cursor-not-allowed`} `} 
            disabled={!resetBtnStatus}>Reset password</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
