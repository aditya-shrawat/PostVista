import React, { useEffect, useState } from 'react'
import PostList from '../Components/PostList'
import CreateBlogBtn from '../Components/CreateBlogBtn'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [Posts,setPosts] = useState([]) ;
  // const [followedPosts,setFollowedPosts] = useState([]) ;
  const [showGeneralList,setShowGeneralList] = useState(true);

   const initialFxn = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      if(showGeneralList){
        const response = await axios.get(`${BackendURL}/home`,{withCredentials:true}) ;
        setPosts(response.data.allPosts) ;
      }
      else{
        const response = await axios.get(`${BackendURL}/home/following`,{withCredentials:true}) ;
        setPosts(response.data.allPosts) ;
      }
    } catch (error) {
      navigate('/user/signin')
    }
   }

   useEffect(()=>{
    initialFxn();
   },[showGeneralList]);

   useEffect(()=>{
    initialFxn();
   },[]);

  return (
    <div className='p-2 pt-0 min-w-screen min-h-screen relative  '>
      <div className='m-auto max-w-[700px]'>
        <div className='w-full flex justify-between text-lg border-b-[1px] '>
          <div onClick={()=>{setShowGeneralList(true)}} className='w-[50%] flex justify-center hover:bg-gray-100 cursor-pointer'>
            <div className={`block py-2 ${showGeneralList?`border-b-4 border-blue-500 text-black font-bold`:`border-none text-gray-500 font-semibold`}`}>
              For you
            </div>
          </div>
          <div onClick={()=>{setShowGeneralList(false)}} className='w-[50%] flex justify-center hover:bg-gray-100 cursor-pointer'>
            <div className={`block py-2 ${!showGeneralList?`border-b-4 border-blue-500 text-black font-bold`:`border-none text-gray-500 font-semibold`}`}>
              Following
            </div>
          </div>
        </div>
        <PostList posts={Posts} pageType={'HomePage'} />
      </div>

      <CreateBlogBtn />
    </div>
  )
}

export default HomePage 