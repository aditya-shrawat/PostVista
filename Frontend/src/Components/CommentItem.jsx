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
    <div className=' py-5 border-b-[1px]  '>
        <div className='flex items-center mb-2 '>
            <Link to={`/${comment.user.username}`} className='bg-green-500 block w-8 h-8 rounded-full mr-3 cursor-pointer '></Link>
            <Link to={`/${comment.user.username}`} className='flex flex-col'>
                <div className='flex items-baseline cursor-pointer'>
                  <h2 className='text-black text-lg font-semibold hover:underline'>{comment.user.name}</h2>
                  <h2 
                  className='text-base break-words ml-2 text-gray-500'>{`@${comment.user.username}`}</h2>
                </div>
                <p className='text-[14px] text-gray-500 '>{formatedTime}</p>
            </Link>
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