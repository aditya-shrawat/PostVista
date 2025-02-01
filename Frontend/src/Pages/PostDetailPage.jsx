import React, { useEffect, useState } from 'react'

import LikeCommentBar from '../Components/LikeCommentBar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetailPage = () => {
  const postId = useParams().id ;
  const navigate = useNavigate();
  const [postData,setPostData] = useState({}) ;
  const [writerData,setWriterData] = useState({})
  const [likesCount,setLikesCount] = useState(0) ;
  const [commentCount,setCommentCount] = useState(0) ;
  const [likeStatus,setLikeStatus] = useState(false) ;

  const [postTime,setPostTime] = useState('') ;
  const [formatedTime,setFormatedTime] = useState('') ;

  const months = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August", 
    "September", "October", "November", "December"
  ];

  useEffect(()=>{
    const Time = new Date(postTime) ;
    const date = Time.getDate() ;
    const month = Time.getMonth() ;
    const year = Time.getFullYear() ;

    setFormatedTime(`${date} ${months[month]},${year}`) ;
  },[postTime])

  const fetchCounts = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/post/${postId}/counts`,{withCredentials:true}) ;
      setLikesCount(response.data.likeCount) ;
      setCommentCount(response.data.commentCount) ;
    } catch (error) {
      console.log("Error in calculating Counts - ",error);
    }
  }

  const fetchPostData = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/post/${postId}`,{withCredentials:true}) ;
      setPostData(response.data.post) ;
      setWriterData(response.data.post.createdBy)
      setPostTime(response.data.post.createdAt) ;
    } catch (error) {
      console.log("Error in fetching PostData - ",error) ;
    }
  }
  
  const isPostIsLiked = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/post/${postId}/like`,{withCredentials:true}) ;
      setLikeStatus(response.data.isLiked) ;
    } catch (error) {
      console.log("Error in fetching like -",error) ;
    }
  }
  
  const toggleLike = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.post(`${BackendURL}/post/${postId}/like`,{},{withCredentials:true}) ;
      setLikeStatus(response.data.isLiked) ;
    } catch (error) {
      console.log("Error in toggling like -",error) ;
    }
  }

  useEffect(()=>{
    fetchPostData() ;
    fetchCounts();
    isPostIsLiked();
  },[])

  useEffect(()=>{
    fetchCounts();
  },[likeStatus])

  return (
    <div className='min-h-screen min-w-screen p-2 pt-6  '>
      <div className='w-full max-w-screen-md h-auto p-2 m-auto '>
        
        <h1 className='text-4xl font-bold mb-8 break-words '>{postData.title}</h1> 

        <div className='flex items-center '>
          <Link to={`/${writerData.username}`}  className='bg-green-500 block h-11 w-11 rounded-full cursor-pointer mr-4 ' ></Link>
          <div className=' flex flex-col justify-center ' >
            <div className=' flex items-center'>
              <span className='text-base cursor-pointer hover:underline flex items-center'>
                <Link to={`/${writerData.username}`} >{writerData.username}</Link>
              </span> 
              <span className='text-green-600 hover:text-green-800 font-semibold ml-4 cursor-pointer'>Follow</span> 
            </div>
            <div className='text-[14px] flex items-center text-gray-500'>{formatedTime}</div>
          </div>
        </div>
        
        <LikeCommentBar toggleLike={toggleLike} likeStatus={likeStatus} likes={likesCount} comments={commentCount}  />
        
        <div className='w-auto h-auto my-12  bg-red-300'>
          <img className=' object-contain' src="" alt="" />
        </div>
        
        <p className='text-xl break-words'>{postData.body}</p>

        <LikeCommentBar toggleLike={toggleLike} likeStatus={likeStatus} likes={likesCount} comments={commentCount}  />

        <div className='flex justify-between my-8 '>
          <Link to={`/${writerData.username}`} className='w-full flex mr-6'>
            <div className=' mr-4'>
              <div className='bg-green-500 block h-11 w-11 rounded-full cursor-pointer  ' ></div>
            </div>
            <div className=' w-full flex flex-col ' >
              <span className='text-base cursor-pointer hover:underline flex items-center'>
                {writerData.username}
              </span> 
              <span className='text-[14px] my-1 flex items-center text-gray-500'>2.3K Followers | 22 following</span>
              <span className='text-[14px] my-1 flex items-center break-words '>This is my Bio.</span>
            </div>
          </Link>
          <button className='bg-black text-white h-9 px-3 rounded-2xl font-semibold cursor-pointer '>Follow</button>
        </div>
      </div>
    </div>
  )
}

export default PostDetailPage