
import { FaRegHeart,FaRegComment,FaRegBookmark  } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { MdOutlineIosShare } from "react-icons/md";

const LikeCommentBar = ({toggleLike,likeStatus,likes,comments,bookmarkPost,bookmarkStatus}) => {
  return (
    <div>
        <div className='w-full h-14 px-3 mt-6 border-t-[1px] border-b-[1px] flex justify-between items-center text-gray-500 '>
            <div className=' flex text-xl items-baseline'>
              <div onClick={toggleLike} className=' flex items-center mr-8 cursor-pointer hover:text-black'><FaRegHeart className={` ${(likeStatus)?`bg-red-600`:`bg-transparent`} mr-2`} />{likes}</div>
              <div className=' flex items-center cursor-pointer hover:text-black'><FaRegComment className='mr-2' />{comments}</div>
            </div>
            <div className="flex items-baseline">
              <div className="text-2xl font-semibold hover:text-black cursor-pointer mr-5">
                <MdOutlineIosShare />
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