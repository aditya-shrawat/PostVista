import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FollowersList from '../Components/FollowersList';

const FollowerPage = () => {
    const navigate = useNavigate() ;
    const accountId = useParams().id ;
    const [showFollowers,setShowFollowers] = useState(true);
    const [accountDetails,setAccountDetails] = useState({}) ;
    const [followersData,setFollowersData] = useState([]) ;
    const [followingData,setFollowingData] = useState([]) ;
    const [loading,setLoading] = useState(true);

    const path = useLocation().pathname ;
    const whichListToshow = ()=>{
        try {
            if(path.includes('follower')){
                setShowFollowers(true);
            }
            else{
                setShowFollowers(false) ;
            }
        } catch (error) {
            console.log("Error",error) ;
        }
    } 

    const fetchFollowerOrFollowing = async ()=>{
        try {
            const BackendURL = import.meta.env.VITE_backendURL;
            if(showFollowers){
                const response = await axios.get(`${BackendURL}/user/${accountId}/follower`,{withCredentials:true,});
                setFollowersData(response.data.followers);
                setAccountDetails(response.data.accountData) ;
            }
            else{
                const response = await axios.get(`${BackendURL}/user/${accountId}/following`,{withCredentials:true,});
                setFollowingData(response.data.following);
                setAccountDetails(response.data.accountData) ;
            }
        } catch (error) {
            console.log("Error is fetching Followers/following -",error) ;
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchFollowerOrFollowing();
    },[showFollowers])

    useEffect(()=>{
        whichListToshow();
    },[]);

    const handleFollowersBtn = ()=>{
        setShowFollowers(true);
        navigate(`/user/${accountId}/follower`)
    } ;

    const handleFollowingBtn = ()=>{
        setShowFollowers(false);
        navigate(`/user/${accountId}/following`)
    } ;

  return (
    <div className='w-full '>
        <div className='w-full py-4 '>
            <div className='w-full px-4 mb-6 border-b-[1px] dark:border-gray-500 '>
                <div>
                    <h1 className=' text-xl font-semibold font-plex'>{accountDetails.name}</h1>
                    <h2 className='text-gray-500 text-base font-plex' >{`@${accountDetails.username}`}</h2>
                </div>
                <div className='w-full mt-3 flex justify-between text-lg '>
                    <div onClick={handleFollowersBtn} className='w-[50%] flex justify-center cursor-pointer '>
                        <div className={`block p-2 ${showFollowers?`border-b-4 border-blue-500 font-bold`:`border-none text-gray-500 font-semibold`} `}>
                            Followers
                        </div>
                    </div>
                    <div onClick={handleFollowingBtn} className='w-[50%] flex justify-center cursor-pointer '>
                        <div className={`block p-2 ${!showFollowers?`border-b-4 border-blue-500 font-bold`:`border-none text-gray-500 font-semibold`}`}>
                            Following
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-full  relative'>
                {
                (loading)?
                <div className='w-full flex justify-center'>
                <span className="loading loading-spinner text-info h-10 w-10 mt-4"></span>
                </div>:
                <>
                {(showFollowers && followersData.length===0)?
                <div className="w-full px-2 text-center">
                    <h1 className="text-xl font-semibold font-plex mt-28 ">No followers yet.</h1>
                </div>:
                (!showFollowers && followingData.length===0)?
                <div className="w-full px-2 text-center  ">
                    <h1 className="text-xl font-semibold font-plex mt-28 ">No following yet.</h1>
                </div>:
                <FollowersList showFollowers={showFollowers} followersData={followersData} followingData={followingData} />
                }
                </>
                }
            </div>
        </div>
    </div>
  )
}

export default FollowerPage