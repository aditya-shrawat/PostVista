import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProfilePage = () => {
  const {username} = useParams();
  const [userDetails,setUserDetails] = useState();
  const navigate = useNavigate() ;

  useEffect(()=>{
    const fetchingUser = async ()=>{
      try {
        const BackendURL = import.meta.env.VITE_backendURL;
        const response = await axios.get(`${BackendURL}/${username}`,{
          withCredentials:true,
        });
        setUserDetails(response.data) ;
      } catch (error) {
        console.log("Error :",error) ;
        if(error.response && error.response.status === 400){
          navigate('*');
        }
      }
    }
    fetchingUser();
  },[username]);

  return (
    (!userDetails) ? (
      <div  className='bg-blue-500 text-9xl h-1/2 '>Loading....</div>
    ) : (
      <div className='bg-red-500 text-9xl h-1/2 ' >{userDetails.username}</div>
    )
  )
}

export default ProfilePage