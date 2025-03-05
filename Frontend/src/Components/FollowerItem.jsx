import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const FollowerItem = ({showFollowers,follower,following}) => {
    const accountId = (showFollowers)?follower.followedBy._id : following.account._id ;
    const [followStatus,setFollowStatus] = useState(false) ;
    const [isYourAccount,setIsYourAccount] = useState(false) ;

    const checkFollowStatus = async ()=>{
        try {
            const BackendURL = import.meta.env.VITE_backendURL;
            const response = await axios.get(`${BackendURL}/user/${accountId}/follow/status`,{withCredentials:true,});
            setFollowStatus(response.data.isFollowed) ;
            setIsYourAccount(response.data.isYou) ;
        } catch (error) {
            console.log("Error in checking Followe status -",error) ;
        }
    }

    useEffect(()=>{
        checkFollowStatus()
    },[]) ;

    const toggleFollowStatus = async ()=>{
        try {
            const BackendURL = import.meta.env.VITE_backendURL;
            const response = await axios.post(`${BackendURL}/user/${accountId}/follower`,{},{withCredentials:true,});
            checkFollowStatus();
        } catch (error) {
            console.log("Error in toggling FollowStatus -",error) ;
        }
    }

  return (
    <div className='w-full px-2 py-3 my-2 rounded-lg flex mb-2 hover:bg-gray-100 '>
        <Link to={`/${(showFollowers)?follower.followedBy.username : following.account.username}`} >
            <div className=' h-12 w-12 bg-gray-100 rounded-full cursor-pointer border-[1px] overflow-hidden '>
                <img src={(showFollowers)?follower.followedBy.profilePicURL : following.account.profilePicURL} className="h-full w-full object-cover" />
            </div>
        </Link>
        <div className='w-full ml-4 '>
            <div className='w-full flex'>
                <Link to={`/${(showFollowers)?follower.followedBy.username : following.account.username}`} className='w-full flex flex-col  '>
                    <h1 className=' text-lg font-semibold hover:underline'>{(showFollowers)?follower.followedBy.name : following.account.name}</h1>
                    <h1 className=' text-gray-500 text-[15px] '>{(showFollowers)?follower.followedBy.username : following.account.username}</h1>
                </Link>
                <div>
                    <button onClick={toggleFollowStatus} className={`ml-4 ${followStatus?'bg-gray-100 text-black hover:bg-gray-200 border-2':
                'bg-green-500 hover:bg-green-600 text-white border-none'} z-10 rounded-xl px-3 py-1 font-semibold cursor-pointer 
                text-[14px] ${isYourAccount?'hidden':'block'} `}>{(followStatus)?'Following':'Follow'}
                    </button>
                </div>
            </div>
            <Link to={`/${(showFollowers)?follower.followedBy.username : following.account.username}`} className='w-full mt-1 h-auto'>
                <p className='break-words text-base'>{(showFollowers)?follower.followedBy.bio : following.account.bio}</p>
            </Link>
        </div>
    </div>
  )
}

export default FollowerItem