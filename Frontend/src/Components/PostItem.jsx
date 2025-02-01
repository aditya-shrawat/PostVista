import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart,FaRegComment,FaRegBookmark  } from "react-icons/fa6";
import axios from 'axios';

const PostItem = ({post}) => {
  const [likes,setLikes] = useState(0) ;
  const [comments,setComments] = useState(0) ;

  const fetchCounts = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/post/${post._id}/counts`,{withCredentials:true}) ;
      setLikes(response.data.likeCount) ;
      setComments(response.data.commentCount) ;
    } catch (error) {
      console.log("Error in calculating Counts - ",error);
    }
  }

  useEffect(()=>{
    fetchCounts() ;
  },[]) ;

  return (
    <div className='my-5 h-auto w-full px-3 py-4 sm:py-6 flex flex-col border-b-2 '>
      <div className='mb-3 flex '>
        <div className='bg-green-500 h-6 w-6 rounded-full mr-3 cursor-pointer '></div>
        <div className='w-auto cursor-pointer hover:underline '>{post.createdBy.username}</div>
      </div>
      <Link to={`/post/${post._id}`} className='w-full cursor-pointer '>
        <div className='w-full h-40 flex justify-between items-center cursor-pointer ' >
          <div className='py-3 h-full sm:w-96 w-48 flex flex-col justify-between '>
            <div className='w-full h-auto'>
              <h3 className='text-2xl font-bold mb-2 line-clamp-2 break-words'>{post.title}</h3>
              <p className=' line-clamp-1 sm:line-clamp-2 break-words'>{post.body}</p>
            </div>
            <div className=' mt-3 w-full flex justify-between ' >
              <div className=' flex items-center mr-8 cursor-pointer'><FaRegHeart className='mr-2 text-xl' />{likes}</div>
              <div className=' flex items-center cursor-pointer'><FaRegComment className='mr-2 text-xl' />{comments}</div>
              <div className='text-xl sm:block hidden cursor-pointer'><FaRegBookmark  /></div>
            </div>
          </div>
          <div className=' min-w-24 min-h-24 sm:w-32 sm:h-32 bg-green-500'>

          </div>
        </div>
      </Link> 
    </div>
  )
}

export default PostItem