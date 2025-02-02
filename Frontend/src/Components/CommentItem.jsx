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
    <div className=' px-2 py-5 border-b-[1px]  '>
        <div className='flex items-center mb-2 '>
            <Link to={`/${comment.user.username}`} className='bg-green-500 block w-8 h-8 rounded-full mr-3 cursor-pointer '></Link>
            <div className='flex flex-col'>
                <Link to={`/${comment.user.username}`} className='text-base text-[17px] hover:underline cursor-pointer break-words '>{comment.user.username}</Link>
                <p className='text-[14px] text-gray-500 '>{formatedTime}</p>
            </div>
        </div>
        <div>
            <p className='break-words '>
                {comment.content}
            </p>
        </div>
    </div>
  )
}

export default CommentItem