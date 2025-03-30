import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen h-full fixed top-0 left-0 bg-white dark:bg-black z-50 flex justify-center items-center'>
        {/* <h1 className='text-3xl text-blue-300 font-bold'>Loading</h1> */}
        <span className="loading loading-spinner text-neutral dark:text-white h-10 w-10 font-semibold"></span>
    </div>
  )
}

export default Loading