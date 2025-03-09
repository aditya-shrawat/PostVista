import React from "react";

const ChangePass = () => {
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="w-full px-2 mb-5">
        <h1 className="text-xl font-bold text-black">Change your password</h1>
        <p className="text-base text-gray-500">@username</p>
      </div>
      <div className="w-full border-b-2">
        <form className="w-full px-2 flex flex-col mb-7">
          <label className="mb-1 ">Current password</label>
          <input
            type="password"
            name="currentPassword"
            className=" p-1 px-2 text-lg rounded-lg border-2 outline-blue-400"
          />
        </form>
      </div>
      <div className="w-full px-2 mt-5">
        <form className="w-full flex flex-col">
          <label className="mb-1 ">New password</label>
          <input
            type="password"
            name="newPassword"
            className=" mb-5 w-full p-1 px-2 text-lg rounded-lg border-2 outline-blue-400"
          />

          <label className="mb-1 ">Confirm password</label>
          <div className="w-full">
            <input
              type="password"
              name="confirmPassword"
              className="w-full mb-2 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400"
            />
            {/* {passwordError!=='' && <div className='text-red-500 px-2' >{passwordError}</div> } */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePass;
