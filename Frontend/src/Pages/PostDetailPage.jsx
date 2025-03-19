import React, { useEffect, useRef, useState } from 'react'

import CommentList from '../Components/CommentList';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';

import { FaRegBookmark  } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { GoShare } from "react-icons/go";
import { IoIosShareAlt } from "react-icons/io";
import { FaLink } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { VscHeart } from "react-icons/vsc";
import { VscComment } from "react-icons/vsc";

const PostDetailPage = () => {
  const postId = useParams().id ;
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
    <div className='min-h-screen w-full '>
      <Header />
      <div className='w-full max-w-screen-lg h-auto px-4 py-5 m-auto '>
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
          <h1 className='text-3xl md:text-5xl font-bold break-words font-plex '>{postData.title}</h1> 

          <div className='flex items-center mt-5 py-4 md:py-7 '>
            <div>
              <Link to={`/${writerData.username}`}  className='bg-gray-100 block h-12 w-12 rounded-full cursor-pointer mr-4 border-[1px] overflow-hidden ' >
                <img src={writerData.profilePicURL} className='h-full w-full object-cover' />
              </Link>
            </div>
            <div className=' flex flex-col justify-center ' >
              <div className=' flex items-center'>
                <Link to={`/${writerData.username}`} className=' cursor-pointer md:flex items-baseline '>
                  {
                    writerData.name!=='' &&
                    <h1 className='text-lg text-black font-semibold line-clamp-1 break-words mr-3 font-plex hover:underline'>{writerData.name}</h1>
                  }
                  {/* <h2 className='text-base text-gray-500 line-clamp-1 break-words font-plex' >{`@${writerData.username}`}</h2> */}
                </Link> 
                {
                  (!isYourAccount)&&
                  <span onClick={toggleFollowStatus} className={`block ${followStatus?'text-gray-500 hover:text-gray-600':'text-green-600 hover:text-green-800'}
                     font-semibold ml-8 cursor-pointer`}>
                    {followStatus?'Following':'Follow'}
                  </span> 
                }
              </div>
              <div className='text-[14px] mt-1 flex items-center text-gray-500 font-plex '>{formatedTime}</div>
            </div>
          </div>

          <LikeCommentBar toggleLike={toggleLike} likeStatus={likeStatus} likes={likesCount} 
            comments={commentCount} bookmarkPost={bookmarkPost} bookmarkStatus={bookmarkStatus} pathLink={pathLink}  />

          { (postData.coverImage) &&
          <div className='w-auto h-auto mt-12  '>
            <div className='w-auto h-auto overflow-hidden bg-gray-100'>
              <img className=' h-full w-full object-cover' src={postData.coverImage} />
            </div>
          </div>
          }

          <p className='text-xl break-words my-12 font-serif2'>{postData.body}</p>

          <LikeCommentBar toggleLike={toggleLike} likeStatus={likeStatus} likes={likesCount} comments={commentCount}
           bookmarkPost={bookmarkPost} bookmarkStatus={bookmarkStatus} pathLink={pathLink}  />

          <div className='flex my-10 md:my-14 '>
            <Link to={`/${writerData.username}`} className=' mr-4'>
              <div className='bg-gray-100 block h-14 w-14 md:h-20 md:w-20 rounded-full cursor-pointer border-[1px] overflow-hidden ' >
                <img src={writerData.profilePicURL} className='h-full w-full object-cover' />
              </div>
            </Link>
            <div className='w-full flex flex-col'>
              <div className='w-full flex justify-between'>
                <Link to={`/${writerData.username}`} className=' w-full flex flex-col ' >
                  <div className=' cursor-pointer flex flex-col sm:flex-row items-baseline '>
                    <h1 className='text-lg text-black font-semibold line-clamp-1 break-words mr-3 font-plex'>{writerData.name}</h1>
                    <h2 className='text-base text-gray-500 line-clamp-1 break-words font-plex' >{`@${writerData.username}`}</h2>
                  </div> 
                </Link>
                {
                  (!isYourAccount) &&
                  <div>
                    <button onClick={toggleFollowStatus} className={` ${followStatus?'bg-gray-100 text-base hover:bg-gray-200 text-black border-2':
                      'bg-green-500 hover:bg-green-600 text-white border-none'} py-1 px-3 rounded-2xl font-semibold cursor-pointer `}>
                      {followStatus?"Following":"Follow"}
                    </button>
                  </div>
                }
              </div>
              <Link Link to={`/${writerData.username}`} className='w-full' >
                <span className='text-[14px] my-1 flex items-center text-gray-500'>{`${followerCount} Followers | ${followingCount} following`}</span>
                <span className='text-base font-semibold flex items-center break-words font-plex '>{writerData.bio}</span>
              </Link>
            </div>
          </div>    
          </>
        }
      </div>
      <hr />
      {(!loading)&&
      <div className='w-full max-w-screen-lg h-auto p-2 py-2 m-auto'>
        <div className='w-full '>
          <CommentList postId={postId} />
        </div>
      </div>
      }
    </div>
  )
}


const LikeCommentBar = ({toggleLike,likeStatus,likes,comments,bookmarkPost,bookmarkStatus,pathLink}) => {

  const [sharing,setSharing] = useState(false) ;
  const optionsRef = useRef(null) ;

  const copyLinkToClipboard = ()=>{
    navigator.clipboard.writeText(pathLink) ;
    setSharing(false);
  }

  const handleClickOutsideMoreOptionDiv = (e)=>{
    e.preventDefault(); 
    if(optionsRef.current && !optionsRef.current.contains(e.target)){
      setSharing(false)
    }
  }

  useEffect(()=>{
    if(sharing){
      document.addEventListener('mousedown',handleClickOutsideMoreOptionDiv)
    }
    else{
      document.removeEventListener('mousedown',handleClickOutsideMoreOptionDiv)
    }

    return ()=>{
      document.removeEventListener('mousedown',handleClickOutsideMoreOptionDiv)
    }
  },[sharing])

  return (
    <div>
        <div className='w-full px-3 py-2 mt-6 border-y-[1px] flex justify-between items-center text-gray-500 '>
            <div className=' flex text-lg items-baseline'>
              <div onClick={toggleLike} className=' flex items-center mr-8 cursor-pointer hover:text-black font-plex'>
                {(likeStatus)?<FcLike className={`mr-2 text-xl`}/>: <VscHeart className={`mr-2 text-xl`}/>}
                {likes}
              </div>
              <div className=' flex items-center cursor-pointer hover:text-black font-plex'><VscComment className='mr-2 text-xl' />{comments}</div>
            </div>
            <div className="flex items-baseline">
              <div className="mr-5 relative ">
                <div onClick={()=>{setSharing(true)}} className="text-2xl font-semibold hover:text-black cursor-pointer">
                  <GoShare  />
                </div>

                { (sharing) &&
                  <div ref={optionsRef} className='bg-white text-black border-2 z-10 h-auto w-56 sm:w-72 p-3 py-4 rounded-xl absolute top-0 -right-2 
                      text-base font-semibold flex flex-col shadow-[0px_3px_10px_rgba(0,0,0,0.2)] overflow-hidden'>
                      <div onClick={copyLinkToClipboard} className='flex items-center py-1 px-2 cursor-pointer rounded-lg hover:bg-gray-100'>
                        <div className='mr-3'><FaLink /></div>
                        <div>Copy link</div>
                      </div>
                      <div onClick={()=>{setSharing(false)}} className='flex items-center py-1 px-2 cursor-pointer rounded-lg hover:bg-gray-100 '>
                        <div className='mr-3 '><IoIosShareAlt /></div>
                        <div >Share via</div>
                      </div>
                  </div>
                }
              </div>
              <div onClick={bookmarkPost} className={`text-lg cursor-pointer ${(bookmarkStatus)?'text-black':`hover:text-black`} `}>
                {(bookmarkStatus)? <FaBookmark /> : <FaRegBookmark  /> }
              </div>
            </div> 
        </div>
    </div>
  )
}

export default PostDetailPage