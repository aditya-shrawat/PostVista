import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegBookmark   } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import { SlUserFollow } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import axios from 'axios';
import { FcLike } from "react-icons/fc";
import { VscHeart } from "react-icons/vsc";
import { VscComment } from "react-icons/vsc";

const PostItem = ({post,pageType}) => {
  const [likes,setLikes] = useState(0) ;
  const [comments,setComments] = useState(0) ;
  const [likeStatus,setLikeStatus] = useState(false) ;
  const [bookmarkStatus,setBookmarkStatus] = useState(false) ;
  const [showMoreOptions,setShowMoreOptions] = useState(false) ;
  const [followStatus,setFollowStatus] = useState(false) ;
  const [isYourAccount,setIsYourAccount] = useState(false) ;
  const optionsRef = useRef(null) ;
  const [sharing,setSharing] = useState(false) ;

  const pathLink = `${window.location.origin}/post/${post._id}` ;

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

  const isPostIsLiked = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/post/${post._id}/like`,{withCredentials:true}) ;
      setLikeStatus(response.data.isLiked) ;
    } catch (error) {
      console.log("Error in fetching like -",error) ;
    }
  }

  useEffect(()=>{
    fetchCounts();
    isPostIsLiked();
    checkBookmarkStatus();
    checkFollowStatus();
  },[])

  const checkBookmarkStatus = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/post/${post._id}/check-bookmark`,{withCredentials:true,});
      setBookmarkStatus(response.data.bookmarked) ;
    } catch (error) {
      console.log("error in bookmark status -",error);
    }
  }

  const bookmarkPost = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.post(`${BackendURL}/post/${post._id}/bookmark-post`,{},{withCredentials:true,});
      setBookmarkStatus(response.data.isSaved) ;
    } catch (error) {
      console.log("error in bookmarking post -",error);
    }
  }

  const followAuthor = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.post(`${BackendURL}/user/${post.createdBy._id}/follower`,
      {},{withCredentials:true,});
      setFollowStatus(response.data.isFollowed) ;
    } catch (error) {
      console.log("error in following author -",error);
    }
  }

  const checkFollowStatus = async ()=>{
    try {
        const BackendURL = import.meta.env.VITE_backendURL;
        const response = await axios.get(`${BackendURL}/user/${post.createdBy._id}/follow/status`,
        {withCredentials:true,});
        setFollowStatus(response.data.isFollowed) ;
        setIsYourAccount(response.data.isYou) ;
    } catch (error) {
        console.log("Error in checking Followe status -",error) ;
    }
  }

  const handleClickOutsideMoreOptionDiv = (e)=>{
    e.preventDefault(); 
    if(optionsRef.current && !optionsRef.current.contains(e.target)){
      setShowMoreOptions(false) ;
      setSharing(false)
    }
  }

  useEffect(()=>{
    if(showMoreOptions){
      document.addEventListener('mousedown',handleClickOutsideMoreOptionDiv)
    }
    else{
      document.removeEventListener('mousedown',handleClickOutsideMoreOptionDiv)
    }

    return ()=>{
      document.removeEventListener('mousedown',handleClickOutsideMoreOptionDiv)
    }
  },[showMoreOptions])

  const deletePost = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.delete(`${BackendURL}/post/${post._id}`,{withCredentials:true,});
      console.log(response.data.message)
    } catch (error) {
      console.log("Error in deleting post -",error) ;
    }
  }

  const copyLinkToClipboard = ()=>{
    navigator.clipboard.writeText(pathLink) ;
    setSharing(false);
    setShowMoreOptions(false) ;
  }

  return (
    <div className='my-3 h-auto w-full px-2 py-4 sm:py-6 flex flex-col border-b-[1px] '>
      {
        
        <div className={` flex ${(!post.createdBy.profilePicURL)?`flex-row-reverse`:`justify-between`} items-center mb-1`} >
          {(post.createdBy.profilePicURL) && 

          <div className={`flex items-center`}>
            <div>
              <Link to={`/${post.createdBy.username}`}  className='block bg-gray-100 h-6 w-6 rounded-full mr-3 cursor-pointer border-[1px] overflow-hidden '>
                <img src={post.createdBy.profilePicURL} className='h-full w-full object-cover' />
              </Link>
            </div>
            <div className='w-auto cursor-pointer '>
              <Link to={`/${post.createdBy.username}`} className='flex items-baseline'>
                <h1 className='text-lg font-semibold text-black hover:underline line-clamp-1 break-words mr-2 '>{post.createdBy.name}</h1>
                {/* <h2 className='text-gray-500 text-[14px] ' >{`@${post.createdBy.username}`}</h2> */}
              </Link>
            </div>
          </div>
          }
          <div className=' ml-5 relative '>
            <div onClick={()=>{setShowMoreOptions(true)}}>
              <BsThreeDotsVertical  className='text-xl text-gray-500 hover:text-black cursor-pointer' />
            </div>

            { (showMoreOptions) &&
            <div ref={optionsRef} className='bg-white border-2 z-10 h-auto w-72 p-3 py-5 rounded-xl absolute top-0 -right-2 
                text-base font-semibold flex flex-col shadow-[0px_3px_10px_rgba(0,0,0,0.2)] overflow-hidden'>
              {
                (!sharing)?
              <>
                <div onClick={()=>{setSharing(true)}} className='flex items-center py-2 px-2 cursor-pointer rounded-lg hover:bg-gray-100'>
                  <div className='mr-3'><IoIosShareAlt /></div>
                  <div>Share</div>
                </div>
                <div onClick={()=>{bookmarkPost();setShowMoreOptions(false)}} className='flex items-center py-2 px-2 cursor-pointer rounded-lg hover:bg-gray-100 sm:hidden'>
                  <div className='mr-3 '>{(bookmarkStatus)? <FaBookmark /> : <FaRegBookmark  /> }</div>
                  <div>{(bookmarkStatus)? `Bookmarked` : `Bookmark` }</div>
                </div>
                {
                  (!isYourAccount)&&
                  <div onClick={()=>{followAuthor();setShowMoreOptions(false)}} className='flex items-center py-2 px-2 cursor-pointer rounded-lg hover:bg-gray-100'>
                    <div className='mr-3'><SlUserFollow /></div>
                    <div className=' break-words'>
                      {`${(followStatus)?`Unfollow `:`Follow `} @${post.createdBy.username}`}
                    </div>
                  </div>
                }
                {
                  (isYourAccount)&&
                  <div onClick={()=>{deletePost(); setShowMoreOptions(false)}} className='flex items-center py-2 px-2 cursor-pointer rounded-lg text-red-600 hover:bg-gray-100'>
                    <div className='mr-3'><RiDeleteBin6Line /></div>
                    <div>
                      Delete 
                    </div>
                  </div>
                }
              </>:
              <>
                <div onClick={copyLinkToClipboard} className='flex items-center py-2 px-2 cursor-pointer rounded-lg hover:bg-gray-100'>
                  <div className='mr-3'><FaLink /></div>
                  <div>Copy link</div>
                </div>
                <div onClick={()=>{setShowMoreOptions(false); setSharing(false)}} className='flex items-center py-2 px-2 cursor-pointer rounded-lg hover:bg-gray-100 '>
                  <div className='mr-3 '><MdOutlineMail /></div>
                  <div >Emial</div>
                </div>
                <div onClick={()=>{setShowMoreOptions(false); setSharing(false)}} className='flex items-center py-2 px-2 cursor-pointer rounded-lg hover:bg-gray-100'>
                  <div className='mr-3 '><BsWhatsapp /></div>
                  <div >Whatsapp</div>
                </div>
              </>
              }
            </div>
            }
          </div>
        </div>
      }
      <Link to={`/post/${post._id}`} className='w-full cursor-pointer '>
        <div className='w-full h-36 py-2 flex justify-between items-start cursor-pointer ' >
          <div className={` h-full ${(post.coverImage)?`w-[58%] sm:w-[70%]`:`w-full`}  flex flex-col justify-between `}>
            <div className='w-full h-auto mb-3'>
              <h3 className='text-2xl font-bold mb-2 line-clamp-2 break-words'>{post.title}</h3>
              <p className=' line-clamp-1 break-words font-semibold text-gray-500'>{post.body}</p>
            </div>
            <div className='w-full flex justify-between text-black ' >
              <div className='flex'>
                <div className=' flex items-center mr-10 cursor-pointer'>
                  {(likeStatus)?<FcLike className={`mr-2 text-[22px]`}/>: <VscHeart className={`mr-2 text-xl`}/>}
                  {likes}
                </div>
                <div className=' flex items-center cursor-pointer'><VscComment className='mr-2 text-xl' />{comments}</div>
              </div>
              <div className='flex'>
                <div className={`text-lg sm:block hidden cursor-pointer`}>
                  {(bookmarkStatus)? <FaBookmark /> : <FaRegBookmark  /> }
                </div>
              </div>
            </div>
          </div>
          { (post.coverImage) && 
            <div className='ml-8 w-28 h-28 sm:w-32 sm:h-32'>
              <div className='h-full w-full overflow-hidden bg-gray-100'>
                <img src={post.coverImage} className='h-full w-full object-cover' />
              </div>
            </div>
          }
        </div>
      </Link> 
    </div>
  )
}

export default PostItem