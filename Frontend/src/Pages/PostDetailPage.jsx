import React, { useEffect, useState } from 'react'

import LikeCommentBar from '../Components/LikeCommentBar';
import CommentList from '../Components/CommentList';
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
  const [followStatus,setFollowStatus] = useState(false) ;
  const [isYourAccount,setIsYourAccount] = useState(false) ;
  const [followerCount,setFollowerCount] = useState(0) ;
  const [followingCount,setFollowingCount] = useState(0) ;
  const [loading,setLoading] = useState(true) ;
  const [bookmarkStatus,setBookmarkStatus] = useState(false) ;

  const pathLink = `${window.location.origin}/post/${postId}` ;

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
    finally{
      setLoading(false)
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
    checkBookmarkStatus()
  },[])

  useEffect(()=>{
    fetchCounts();
  },[likeStatus])


  const checkFollowStatus = async ()=>{
      try {
          const BackendURL = import.meta.env.VITE_backendURL;
          const response = await axios.get(`${BackendURL}/user/${writerData._id}/follow/status`,{withCredentials:true,});
          setFollowStatus(response.data.isFollowed) ;
          setIsYourAccount(response.data.isYou) ;
      } catch (error) {
          console.log("Error in checking Followe status -",error) ;
      }
  }

  useEffect(()=>{
      if(writerData && writerData._id){
        checkFollowStatus();
        countFollowers()
      }
  },[writerData]) ;

  const toggleFollowStatus = async ()=>{
      try {
          const BackendURL = import.meta.env.VITE_backendURL;
          const response = await axios.post(`${BackendURL}/user/${writerData._id}/follower`,{},{withCredentials:true,});
          checkFollowStatus();
      } catch (error) {
          console.log("Error in toggling FollowStatus -",error) ;
      }
  };

  const countFollowers = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/user/${writerData._id}/follower/count`,{withCredentials:true,});
      setFollowerCount(response.data.followerCount) ;
      setFollowingCount(response.data.followingCount)
      checkFollowStatus();
    } catch (error) {
      console.log("Error in counting Followers -",error) ;
    }
  };

  const bookmarkPost = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.post(`${BackendURL}/post/${postId}/bookmark-post`,{},{withCredentials:true,});
      setBookmarkStatus(response.data.isSaved) ;
    } catch (error) {
      console.log("error in bookmarking post -",error);
    }
  }

  const checkBookmarkStatus = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/post/${postId}/check-bookmark`,{withCredentials:true,});
      setBookmarkStatus(response.data.bookmarked) ;
    } catch (error) {
      console.log("error in bookmark status -",error);
    }
  }

  return (
    <div className='min-h-screen min-w-screen pt-6  '>
      <div className='w-full max-w-screen-md h-auto p-4 m-auto '>
        {
          (loading)?
          <>
          <div className="flex w-full flex-col gap-4">
            <div>
              <div className="skeleton h-4 w-full mt-3"></div>
              <div className="skeleton h-4 w-full mt-3"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="skeleton h-11 w-11 shrink-0 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="skeleton h-3 w-28"></div> 
                <div className="skeleton h-3 w-20"></div>
              </div>
            </div>
            <div className="skeleton h-4 w-full mt-3"></div>
            <div className="skeleton h-80 w-full"></div>
            <div>
              <div className="skeleton h-4 w-full mt-3"></div>
              <div className="skeleton h-4 w-full mt-3"></div>
              <div className="skeleton h-4 w-full mt-3"></div>
              <div className="skeleton h-4 w-full mt-3"></div>
            </div>
          </div>
          </>:
          <>
          <h1 className='text-4xl font-bold mb-8 break-words '>{postData.title}</h1> 

          <div className='flex items-center border-t-[1px] pt-4 '>
            <div>
              <Link to={`/${writerData.username}`}  className='bg-gray-100 block h-12 w-12 rounded-full cursor-pointer mr-4 border-[1px] overflow-hidden ' >
                <img src={writerData.profilePicURL} className='h-full w-full object-cover' />
              </Link>
            </div>
            <div className=' flex flex-col justify-center ' >
              <div className=' flex items-center'>
                <Link to={`/${writerData.username}`} className=' cursor-pointer flex items-baseline '>
                  {
                    writerData.name!=='' &&
                    <h1 className='text-lg text-black font-semibold line-clamp-1 break-words mr-3'>{writerData.name}</h1>
                  }
                  {/* <h2 className='text-[14px] text-gray-500 line-clamp-1 break-words' >{`@${writerData.username}`}</h2> */}
                </Link> 
                {
                  (!isYourAccount)&&
                  <span onClick={toggleFollowStatus} className={`block ${followStatus?'text-gray-500 hover:text-gray-600':'text-green-600 hover:text-green-800'}
                     font-semibold ml-6 cursor-pointer`}>
                    {followStatus?'Following':'Follow'}
                  </span> 
                }
              </div>
              <div className='text-[14px] flex items-center text-gray-500'>{formatedTime}</div>
            </div>
          </div>

          <LikeCommentBar toggleLike={toggleLike} likeStatus={likeStatus} likes={likesCount} 
            comments={commentCount} bookmarkPost={bookmarkPost} bookmarkStatus={bookmarkStatus} pathLink={pathLink}  />

          { (postData.coverImage) &&
          <div className='w-auto h-auto mt-8 mb-3  '>
            <div className='w-auto h-auto overflow-hidden bg-gray-100'>
              <img className=' h-full w-full object-cover' src={postData.coverImage} />
            </div>
          </div>
          }

          <p className='text-xl break-words mt-4'>{postData.body}</p>

          <LikeCommentBar toggleLike={toggleLike} likeStatus={likeStatus} likes={likesCount} comments={commentCount}
           bookmarkPost={bookmarkPost} bookmarkStatus={bookmarkStatus} pathLink={pathLink}  />

          <div className='flex my-6 '>
            <Link to={`/${writerData.username}`} className='pt-3 mr-4'>
              <div className='bg-gray-100 block h-16 w-16 rounded-full cursor-pointer border-[1px] overflow-hidden ' >
                <img src={writerData.profilePicURL} className='h-full w-full object-cover' />
              </div>
            </Link>
            <div className='w-full flex flex-col'>
              <div className='w-full flex justify-between'>
                <Link to={`/${writerData.username}`} className=' w-full flex flex-col ' >
                  <div className=' cursor-pointer flex flex-col sm:flex-row items-baseline '>
                    <h1 className='text-lg text-black font-semibold line-clamp-1 break-words mr-3'>{writerData.name}</h1>
                    <h2 className='text-[14px] text-gray-500 line-clamp-1 break-words' >{`@${writerData.username}`}</h2>
                  </div> 
                  <span className='text-[14px] my-1 flex items-center text-gray-500'>{`${followerCount} Followers | ${followingCount} following`}</span>
                </Link>
                {
                  (!isYourAccount) &&
                  <button onClick={toggleFollowStatus} className={` ${followStatus?'bg-gray-100 hover:bg-gray-200 text-black border-2':
                    'bg-green-500 hover:bg-green-600 text-white border-none'} h-9 px-3 rounded-2xl font-semibold cursor-pointer `}>
                    {followStatus?"Following":"Follow"}
                  </button>
                }
              </div>
              <span className='text-base font-semibold mt-2 flex items-center break-words '>{writerData.bio}</span>
            </div>
          </div>    
          </>
        }
      </div>
      <hr />
      {(loading)?
      <>
      <div className=' w-full max-w-screen-md h-auto p-2 py-2 m-auto'>
        <div className='w-full flex flex-col gap-3'>
          <div className="skeleton h-6 w-28"></div>
          <div className="skeleton h-10 w-full my-2"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      </>
      :
      <div className='w-full max-w-screen-md h-auto p-2 py-2 m-auto'>
        <div className='w-full '>
          <CommentList postId={postId} />
        </div>
      </div>
      }
    </div>
  )
}

export default PostDetailPage