import axios from "axios";
import React, { useEffect, useState } from "react";
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
        <div className="w-full px-2 pb-4 border-b-[1px] dark:border-gray-500 ">
          <h1 className="text-xl font-bold font-plex">Blocked accounts</h1>
        </div>
        <div className="w-full mt-4">
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
            <div className="w-full h-screen text-center relative ">
              <h1 className=" text-xl font-semibold font-plex mt-28">You haven't blocked anyone yet!</h1>
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
  const [blockStatus,setBlockStatus] = useState(true) ;
  const [followStatus,setFollowStatus] = useState(false) ;

  const blockUnblockAccount = async (e)=>{
    e.preventDefault();
    try {
        const BackendURL = import.meta.env.VITE_backendURL;
        const response = await axios.post(`${BackendURL}/user/${account._id}/block`,{},{withCredentials:true,});
        setBlockStatus(response.data.blockStatus);
    } catch (error) {
      console.log("Error in block-Unblock - ",error);
    }
  }

  const checkFollowStatus = async ()=>{
      try {
          const BackendURL = import.meta.env.VITE_backendURL;
          const response = await axios.get(`${BackendURL}/user/${account._id}/follow/status`,{withCredentials:true,});
          setFollowStatus(response.data.isFollowed) ;
      } catch (error) {
          console.log("Error in checking Followe status -",error) ;
      }
  }

  useEffect(()=>{
    if(!blockStatus){
      checkFollowStatus();
    }
  },[blockStatus]) ;

  const toggleFollowStatus = async ()=>{
    try {
        const BackendURL = import.meta.env.VITE_backendURL;
        const response = await axios.post(`${BackendURL}/user/${account._id}/follower`,{},{withCredentials:true,});
        checkFollowStatus();
    } catch (error) {
        console.log("Error in toggling FollowStatus -",error) ;
    }
  }


  return (
    <div className="w-full px-2 py-2 flex items-center mb-1">
      <Link to={`/${account.username}`} >
        <div className="mt-2 h-10 w-10 rounded-full cursor-pointer overflow-hidden ">
          <img src={account.profilePicURL} className="h-full w-full object-cover" />
        </div>
      </Link>
      <div className="w-full ml-4 font-plex">
        <div className="w-full flex items-center">
          <Link to={`/${account.username}`} className="w-full flex flex-col  ">
            <h1 className=" text-lg font-semibold hover:underline">
              {account.name}
            </h1>
            <h1 className=" text-gray-500 text-base">
              {`@${account.username}`}
            </h1>
          </Link>
          <div>
            {
              (blockStatus)?
              <button  onClick={blockUnblockAccount}
                className={`ml-2 bg-red-600 text-white border-none rounded-xl px-3 py-1 
                  font-semibold cursor-pointer text-[14px] hover:bg-red-500 `}>
                Blocked
              </button> :
              <button onClick={toggleFollowStatus} className={`ml-2 ${followStatus?' border-2 dark:border-gray-500':
                'bg-green-500 hover:bg-green-600 text-white border-none'} rounded-xl px-3 py-1 font-semibold cursor-pointer 
                text-[14px] `}>{(followStatus)?'Following':'Follow'}
              </button>
            }
          </div>
        </div>
        {/* <Link to={`/${account.username}`} className="w-full mt-1 h-auto">
          <p className="break-words text-base">
            {account.bio}
          </p>
        </Link> */}
      </div>
    </div>
  );
};

export default BlockedAccounts;
