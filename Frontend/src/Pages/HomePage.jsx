import React, { useEffect, useState } from 'react'
import PostList from '../Components/PostList'
import CreateBlogBtn from '../Components/CreateBlogBtn'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [Posts,setPosts] = useState([]) ;

   const initialFxn = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}`,{withCredentials:true}) ;
      setPosts(response.data.allPosts) ;
    } catch (error) {
      navigate('/user/signin')   //** */
    }
   }

   useEffect(()=>{
    initialFxn();
   },[]);

  return (
    <div className='p-2 min-w-screen min-h-screen relative  '>
      <div className='m-auto max-w-[700px]'>
        <PostList posts={Posts} pageType={'HomePage'} />
      </div>

      <CreateBlogBtn />
    </div>
  )
}

export default HomePage 