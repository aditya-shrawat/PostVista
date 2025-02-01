import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegHeart,FaRegComment,FaRegBookmark  } from "react-icons/fa6";

const LikeCommentBar = ({toggleLike,likeStatus,likes,comments}) => {
  return (
    <div>
        <div className='w-full h-14  mt-6 border-t-[1px] border-b-[1px] flex justify-between items-center text-gray-500 '>
            <div className=' flex text-base'>
              <div onClick={toggleLike} className=' flex items-center mr-12 cursor-pointer hover:text-black'><FaRegHeart className={` ${(likeStatus)?`bg-red-600`:`bg-transparent`} mr-2 text-xl`} />{likes}</div>
              <div className=' flex items-center cursor-pointer hover:text-black'><FaRegComment className='mr-2 text-xl' />{comments}</div>
            </div>
            <div className='text-xl cursor-pointer hover:text-black'><FaRegBookmark  /></div>
        </div>
    </div>
  )
}

export default LikeCommentBar