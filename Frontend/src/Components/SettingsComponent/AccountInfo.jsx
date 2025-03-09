import React from "react";

const AccountInfo = () => {
  return (
    <div className="w-full ">
        <div className='w-full px-2 mb-5 '>
            <h1 className='text-xl font-bold'>Account information</h1>
            <p className="text-base text-gray-500">@username</p>
        </div>       
        <div className="w-full h-full flex flex-col gap-3 ">
            <div className="w-full flex justify-between p-2 ">
                <p className="font-semibold text-black inline-block ">Email address</p>
                <p className="text-gray-500 line-clamp-1 break-words">
                adityaaslkdjlksjdlgjlajsdlfljgls;lakjflask@gmail.com
                </p>
            </div>
            <div className="w-full flex justify-between p-2 ">
                <p className="font-semibold text-black inline-block">Username</p>
                <p className="text-gray-500 line-clamp-1 break-words">
                adityaaslkdjlksjdlgjlajsdlfljgls;lakjflask
                </p>
            </div>
            <div className="w-full flex justify-between p-2 ">
                <p className="font-semibold text-black inline-block">Name</p>
                <p className="text-gray-500 line-clamp-1 break-words">
                adityaaslkdjlksjdlgjlajsdlfljgls;lakjflask
                </p>
            </div>
            <div className="w-full flex flex-col mt-4 hover:bg-gray-100 p-2 rounded-lg ">
                <p className="text-black font-semibold">Profile information</p>
                <p className="text-gray-500 text-base">
                Edit your photo, name and bio.
                </p>
            </div>
        </div>
    </div>
  );
};

export default AccountInfo;
