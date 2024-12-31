import React from 'react'
import { Link } from 'react-router-dom'

const PostItem = ({post}) => {

  return (
    <div className='my-6 h-64 sm:h-72 w-full px-3 py-2 flex justify-between items-center border-b-2'>
      <Link to={`/post/${post.id}`} className='w-full flex justify-between items-center cursor-pointer'>
        <div className='max-w-96  mr-3'>
          <h3 className='text-lg font-bold mb-2 line-clamp-2'>{post.title }</h3>
          <p className='sm:line-clamp-4 line-clamp-2'>{post.body}</p>
        </div>
        <div className=' min-w-24 min-h-24 sm:w-32 sm:h-32 bg-green-500'>

        </div>
      </Link> 
    </div>
  )
}

export default PostItem