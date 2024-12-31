import React from 'react'
import { FaRegHeart,FaRegComment,FaRegBookmark  } from "react-icons/fa6";

const LikeCommentBar = ({likes,comments}) => {
  return (
    <div>
        <div className='w-full h-14 px-4 mt-5 border-b-[1px] flex justify-between items-center text-gray-500 '>
            <div className=' flex text-base'>
              <div className=' flex items-center mr-12 cursor-pointer'><FaRegHeart className='mr-2 text-xl' />{likes}</div>
              <div className=' flex items-center cursor-pointer'><FaRegComment className='mr-2 text-xl' />{comments}</div>
            </div>
            <div className='text-xl cursor-pointer'><FaRegBookmark  /></div>
        </div>
    </div>
  )
}

export default LikeCommentBar