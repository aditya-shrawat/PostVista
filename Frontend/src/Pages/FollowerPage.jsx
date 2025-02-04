import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FollowersList from '../Components/FollowersList';
import { IoIosArrowForward } from "react-icons/io";

const FollowerPage = () => {
    const accountId = useParams().id ;
    console.log("accountId - ",accountId);
    const [accountDetails,setAccountDetails] = useState({}) ;
    const [followersData,setFollowersData] = useState([]) ;

    const fetchFollowers = async ()=>{
        try {
            const BackendURL = import.meta.env.VITE_backendURL;
            const response = await axios.get(`${BackendURL}/user/${accountId}/follower`,{withCredentials:true,});
            setFollowersData(response.data.followers);
            setAccountDetails(response.data.accountData) ;
        } catch (error) {
            console.log("Error is fetching Followers -",error) ;
        }
    };

    useEffect(()=>{
        fetchFollowers();
    },[]);

  return (
    <div className='w-full '>
        { followersData.length !== 0 &&
        <div className='max-w-[700px] m-auto py-6 '>
            <div className='w-full px-6 text-xl text-gray-500 font-semibold pb-4 mb-6 border-b-[1px] '>
                <h2 className='flex items-center' >{accountDetails.username}<IoIosArrowForward className='mx-1 text-2xl text-black' /><span className=' text-black'> Followers</span></h2>
            </div>
            <div className='w-full '>
                <FollowersList followersData={followersData} />
            </div>
        </div>
        }
    </div>
  )
}

export default FollowerPage