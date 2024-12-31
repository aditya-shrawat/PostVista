import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center  '>
      <div className=' w-80 md:w-1/2 h-52 text-center flex flex-col justify-between items-center'>
        <h1 className='text-2xl font-bold'>Oops!<br/>We can't find the page you're looking for.</h1>
        <Link to={'/'} className='bg-blue-400 text-2xl font-bold text-white px-6 py-4 rounded-lg cursor-pointer hover:shadow-xl hover:bg-blue-500 '>Go to home</Link>
      </div>
    </div>
  )
}

export default ErrorPage