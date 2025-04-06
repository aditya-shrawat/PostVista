import React, { useEffect, useState } from 'react'

import PostItem from './PostItem'

const PostList = ({posts}) => {
  
  return (
    <div className='w-full'>
      {
        (!posts)?
        <>
        </>:
        <>
        { posts.map((post)=>{
          return <PostItem key={post._id} post={post} />
        }) }
        </>
      }
    </div>
  )
}

export default PostList