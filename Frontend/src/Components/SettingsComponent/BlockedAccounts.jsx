import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const BlockedAccounts = () => {
  const [blockedAccounts,setBlockedAccounts] = useState([])
  const [loadingBlockedAccounts,setLoadingAccounts] = useState(true);

  const fetchBlockedAccounts = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/settings/blocked-accounts`,{withCredentials:true,});
      setBlockedAccounts(response.data.blockedAccounts);
    } catch (error) {
      console.log("Error in fetching Blocked accounts -",error);
    }
    {
      setLoadingAccounts(false);
    }
  }

  useState(()=>{
    fetchBlockedAccounts()
  },[])

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="w-full px-2 mb-5">
          <h1 className="text-xl font-bold text-black">Blocked accounts</h1>
        </div>
        <div className="w-full">
          {(loadingBlockedAccounts) &&
            [...Array(6)].map((_, index) => (
              <div key={index} className="w-full flex mb-5">
                <div className="w-auto">
                  <div className="skeleton h-12 w-12 mr-3 shrink-0 rounded-full"></div>
                </div>
                <div className="w-full flex justify-between">
                  <div className="w-full ">
                    <div className="skeleton w-[70%] h-4 mb-2"></div>
                    <div className="skeleton w-[60%] h-4"></div>
                  </div>
                  <div className="w-auto">
                    <div className="skeleton w-20 h-8 ml-3"></div>
                  </div>
                </div>
              </div>
            ))
          }
          { (!loadingBlockedAccounts && blockedAccounts.length===0)?
            <>
            <div className="w-full text-center ">
              <h1 className="mt-16 text-xl font-semibold ">You haven't blocked anyone yet.</h1>
            </div>
            </>:
            blockedAccounts.map((account)=>{
              return <AccountItem key={account._id} account={account} />
            })
          }
        </div>
      </div>
    </div>
  );
};

const AccountItem = ({account}) => {
  return (
    <div className="w-full px-2 py-3 rounded-lg flex mb-3 hover:bg-gray-100 ">
      <Link to={`/${account.username}`} >
        <div className="mt-2 h-10 w-10 bg-gray-100 rounded-full cursor-pointer border-[1px] overflow-hidden ">
          <img src={account.profilePicURL} className="h-full w-full object-cover" />
        </div>
      </Link>
      <div className="w-full ml-4 ">
        <div className="w-full flex">
          <Link to={`/${account.username}`} className="w-full flex flex-col  ">
            <h1 className=" text-lg font-semibold hover:underline">
              {account.name}
            </h1>
            <h1 className=" text-gray-500 text-base">
              {`@${account.username}`}
            </h1>
          </Link>
          <div>
            <button 
              className={`ml-2 bg-red-600 text-white border-none rounded-xl px-3 py-1 
                font-semibold cursor-pointer text-[14px] hover:bg-red-500 `}>
              Blocked
            </button>
          </div>
        </div>
        <Link to={`/${account.username}`} className="w-full mt-1 h-auto">
          <p className="break-words text-base">
            {account.bio}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BlockedAccounts;
