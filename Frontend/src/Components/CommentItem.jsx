import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CommentItem = ({comment,}) => {
    const [commentTime,setCommentTime] = useState('') ;
      const [formatedTime,setFormatedTime] = useState('') ;
    
      const months = [
        "January", "February", "March", "April", 
        "May", "June", "July", "August", 
        "September", "October", "November", "December"
      ];
    
      useEffect(()=>{
        const Time = new Date(commentTime) ;
        const date = Time.getDate() ;
        const month = Time.getMonth() ;
        const year = Time.getFullYear() ;
    
        setFormatedTime(`${date} ${months[month]},${year}`) ;
      },[commentTime])

      useEffect(()=>{
        setCommentTime(comment.createdAt) ;
      },[])

  return (
    <div className=' py-4 border-b-[1px]  '>
        <div className='flex items-center mb-2 '>
            <div>
              <Link to={`/${comment.user.username}`} className='bg-gray-100 block w-8 h-8 rounded-full mr-3 cursor-pointer border-[1px] overflow-hidden '>
                <img src={comment.user.profilePicURL} className='h-full w-full object-cover' />
              </Link>
            </div>
            <Link to={`/${comment.user.username}`} className='flex flex-col'>
                <div className='flex items-baseline cursor-pointer'>
                  <h2 className='text-black font-semibold line-clamp-1 break-words hover:underline font-plex'>{comment.user.name}</h2>
                  <h2 className=' line-clamp-1 break-words ml-2 text-gray-500 font-plex'>{`@${comment.user.username}`}</h2>
                </div>
                <p className='text-[12px] text-gray-500 font-plex '>{formatedTime}</p>
            </Link>
        </div>
        <div className='w-full'>
            <p className='break-words font-plex'>
                {comment.content}
            </p>
        </div>
    </div>
  )
}

export default CommentItem