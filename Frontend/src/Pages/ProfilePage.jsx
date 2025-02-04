import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import PostList from '../Components/PostList';

const ProfilePage = () => {
  const {username} = useParams();
  const [userDetails,setUserDetails] = useState();
  const navigate = useNavigate() ;
  const [posts,setPosts] = useState([]) ;

  const fetchPosts =async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/user/${userDetails.id}/post`,{
        withCredentials:true,
      });
      setPosts(response.data.allPosts) ;
    } catch (error) {
      console.log("Error in fetching posts - ",error) ;
    }
  }

  useEffect(()=>{
    if (userDetails ){
      fetchPosts() ;
    }
  },[userDetails]) ;

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
      <div className='w-full  '>
        <div className='max-w-[700px] m-auto '>
          <div className=' w-full py-6 mt-3 px-3 flex flex-col sm:flex-row border-b-[1px] ' >
            <div className='mr-6 sm:mr-8 sm:h-32 sm:w-32 h-24 w-24 bg-green-500 rounded-full cursor-pointer '></div>
            <div className='mt-1'>
              <div className=' items-center my-2 flex '>
                <h1 className='sm:text-2xl text-2xl font-semibold'>{userDetails.username}</h1>
                <button className='sm:ml-10 ml-6 bg-green-500 hover:bg-green-600 rounded-xl px-6 py-1 font-semibold cursor-pointer text-white text-[16px] '>Follow</button>
              </div>
              <div className='flex text-gray-500 text-[16px] mb-2 '>
                <span>112M followers</span>
                <span className='ml-6'>3000 following</span>
              </div>
              <h3 className='break-words text-[17px]'>my name is aditya shrawat</h3>
            </div>
          </div>
          <div className={` w-full]  `}>
            <PostList posts={posts} />
          </div>
        </div>
      </div>
    )
  )
}

export default ProfilePage