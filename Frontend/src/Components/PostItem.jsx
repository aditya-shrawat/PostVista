import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart,FaRegComment,FaRegBookmark   } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import { SlUserFollow } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import axios from 'axios';

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
      const response = await axios.post(`${BackendURL}/user/${(pageType==='ProfilePage')? post.createdBy : post.createdBy._id}/follower`,
      {},{withCredentials:true,});
      setFollowStatus(response.data.isFollowed) ;
    } catch (error) {
      console.log("error in following author -",error);
    }
  }

  const checkFollowStatus = async ()=>{
    try {
        const BackendURL = import.meta.env.VITE_backendURL;
        const response = await axios.get(`${BackendURL}/user/${(pageType==='ProfilePage')? post.createdBy : post.createdBy._id}/follow/status`,
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
    <div className='my-3 h-auto w-full px-2 py-6 sm:py-8 flex flex-col border-b-[1px] '>
      {
        
        <div className={`mb-3 flex ${(post.createdBy.username===undefined)?`flex-row-reverse`:`justify-between`} items-center`} >
          {(post.createdBy.username) && <div className={`flex items-center`}>
            <div>
              <Link to={`/${post.createdBy.username}`}  className='block bg-green-500 h-7 w-7 rounded-full mr-3 cursor-pointer '></Link>
            </div>
            <div className='w-auto cursor-pointer '>
              <Link to={`/${post.createdBy.username}`} className='flex items-baseline'>
                <h1 className='text-lg font-semibold text-black hover:underline '>{post.createdBy.name}</h1>
                <h2 className='text-gray-500 text-base ml-2 ' >{`@${post.createdBy.username}`}</h2>
              </Link>
            </div>
          </div>}
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
                <div onClick={()=>{setSharing(true)}} className='flex items-center py-1 px-2 cursor-pointer rounded-lg hover:bg-gray-100'>
                  <div className='mr-3'><IoIosShareAlt /></div>
                  <div>Share</div>
                </div>
                <div onClick={()=>{bookmarkPost();setShowMoreOptions(false)}} className='flex items-center py-1 px-2 cursor-pointer rounded-lg hover:bg-gray-100 sm:hidden'>
                  <div className='mr-3 '>{(bookmarkStatus)? <FaBookmark /> : <FaRegBookmark  /> }</div>
                  <div>{(bookmarkStatus)? `Bookmarked` : `Bookmark` }</div>
                </div>
                {
                  (!isYourAccount)&&
                  <div onClick={()=>{followAuthor();setShowMoreOptions(false)}} className='flex items-center py-1 px-2 cursor-pointer rounded-lg hover:bg-gray-100'>
                    <div className='mr-3'><SlUserFollow /></div>
                    <div className=' break-words'>
                      {(followStatus)?`Unfollow `:`Follow `} @
                      {(pageType!=='ProfilePage') && post.createdBy.username}
                    </div>
                  </div>
                }
                {
                  (isYourAccount)&&
                  <div onClick={()=>{deletePost(); setShowMoreOptions(false)}} className='flex items-center py-1 px-2 cursor-pointer rounded-lg text-red-600 hover:bg-gray-100'>
                    <div className='mr-3'><RiDeleteBin6Line /></div>
                    <div>
                      Delete 
                    </div>
                  </div>
                }
              </>:
              <>
                <div onClick={copyLinkToClipboard} className='flex items-center py-1 px-2 cursor-pointer rounded-lg hover:bg-gray-100'>
                  <div className='mr-3'><FaLink /></div>
                  <div>Copy link</div>
                </div>
                <div onClick={()=>{setShowMoreOptions(false)}} className='flex items-center py-1 px-2 cursor-pointer rounded-lg hover:bg-gray-100 '>
                  <div className='mr-3 '><MdOutlineMail /></div>
                  <div >Emial</div>
                </div>
                <div onClick={()=>{setShowMoreOptions(false)}} className='flex items-center py-1 px-2 cursor-pointer rounded-lg hover:bg-gray-100'>
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
        <div className='w-full h-40 flex justify-between items-center cursor-pointer ' >
          <div className='py-3 h-full w-[58%] sm:w-[70%]  flex flex-col justify-between '>
            <div className='w-full h-auto'>
              <h3 className='text-2xl font-bold mb-2 line-clamp-2 break-words'>{post.title}</h3>
              <p className=' line-clamp-1  break-words'>{post.body}</p>
            </div>
            <div className='w-full flex justify-between text-black ' >
              <div className='flex'>
                <div className=' flex items-center mr-10 cursor-pointer'><FaRegHeart className={`${(likeStatus)?`bg-red-600`:`bg-transparent`} mr-2 text-xl`} />{likes}</div>
                <div className=' flex items-center cursor-pointer'><FaRegComment className='mr-2 text-xl' />{comments}</div>
              </div>
              <div className='flex'>
                <div className={`text-xl sm:block hidden cursor-pointer`}>
                  {(bookmarkStatus)? <FaBookmark /> : <FaRegBookmark  /> }
                </div>
              </div>
            </div>
          </div>
          <div className='ml-8 min-w-24 min-h-24 sm:w-32 sm:h-32 bg-green-500'>

          </div>
        </div>
      </Link> 
    </div>
  )
}

export default PostItem