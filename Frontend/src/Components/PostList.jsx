import React, { useEffect, useState } from 'react'

import PostItem from './PostItem'

const PostList = () => {

  const [dummyData,setDummyData] = useState([]) ;

   const initialFxn = async ()=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/posts') ;
    const data = await response.json() ;
    // console.log(data) ;
    setDummyData(data)
   }

   useEffect(()=>{
    initialFxn();
   },[]);


  return (
    <div className='m-auto max-w-[600px]'>
      {
        dummyData.map((post)=>{
          return <PostItem key={post.id} post={post} />
        })
      }
    </div>
  )
}

export default PostList