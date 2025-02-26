
import { useEffect, useRef, useState } from "react";
import { FaRegHeart,FaRegComment,FaRegBookmark  } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { MdOutlineIosShare } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { FaLink } from "react-icons/fa6";

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
        <div className='w-full h-14 px-3 mt-6 border-t-[1px] border-b-[1px] flex justify-between items-center text-gray-500 '>
            <div className=' flex text-xl items-baseline'>
              <div onClick={toggleLike} className=' flex items-center mr-8 cursor-pointer hover:text-black'><FaRegHeart className={` ${(likeStatus)?`bg-red-600`:`bg-transparent`} mr-2`} />{likes}</div>
              <div className=' flex items-center cursor-pointer hover:text-black'><FaRegComment className='mr-2' />{comments}</div>
            </div>
            <div className="flex items-baseline">
              <div className="mr-5 relative ">
                <div onClick={()=>{setSharing(true)}} className="text-2xl font-semibold hover:text-black cursor-pointer">
                  <MdOutlineIosShare />
                </div>

                { (sharing) &&
                  <div ref={optionsRef} className='bg-white border-2 z-10 h-auto w-56 sm:w-72 p-3 py-5 rounded-xl absolute top-0 -right-2 
                      text-base font-semibold flex flex-col shadow-[0px_3px_10px_rgba(0,0,0,0.2)] overflow-hidden'>
                      <div onClick={copyLinkToClipboard} className='flex items-center py-1 px-2 cursor-pointer rounded-lg hover:bg-gray-100'>
                        <div className='mr-3'><FaLink /></div>
                        <div>Copy link</div>
                      </div>
                      <div onClick={()=>{setSharing(false)}} className='flex items-center py-1 px-2 cursor-pointer rounded-lg hover:bg-gray-100 '>
                        <div className='mr-3 '><MdOutlineMail /></div>
                        <div >Emial</div>
                      </div>
                      <div onClick={()=>{setSharing(false)}} className='flex items-center py-1 px-2 cursor-pointer rounded-lg hover:bg-gray-100'>
                        <div className='mr-3 '><BsWhatsapp /></div>
                        <div >Whatsapp</div>
                      </div>
                  </div>
                }
              </div>
              <div onClick={bookmarkPost} className={`text-xl cursor-pointer ${(bookmarkStatus)?'text-black':`hover:text-black`} `}>
                {(bookmarkStatus)? <FaBookmark /> : <FaRegBookmark  /> }
              </div>
            </div> 
        </div>
    </div>
  )
}

export default LikeCommentBar