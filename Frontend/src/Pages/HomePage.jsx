import React from 'react'
import PostList from '../Components/PostList'
import CreateBlogBtn from '../Components/CreateBlogBtn'

const HomePage = () => {
  return (
    <div className='p-2 min-w-screen min-h-screen relative  '>
      <PostList />

      <CreateBlogBtn />
    </div>
  )
}

export default HomePage 