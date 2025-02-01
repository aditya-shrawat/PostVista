import React, { useEffect, useState } from 'react'

import PostItem from './PostItem'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
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
    <div className='m-auto max-w-[600px]'>
      {
        (!Posts)?
        <>
        </>:
        <>
        { Posts.map((post)=>{
          return <PostItem key={post._id} post={post} />
        }) }
        </>
      }
    </div>
  )
}

export default PostList