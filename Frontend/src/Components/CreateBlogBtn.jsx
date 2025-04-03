import React from 'react'
import { LuSquarePen } from "react-icons/lu";
import { Link } from 'react-router-dom';

const CreateBlogBtn = () => {
  return (
    <div className=' h-auto w-auto fixed bottom-10 right-6 block sm:hidden '>
        <Link to={'/new-blog'} className='bg-[#6356E5] shadow-[0px_0px_15px_rgba(0,0,0,0.4)] text-white h-12 w-12 rounded-full flex justify-center items-center cursor-pointer '>
            <LuSquarePen className='text-2xl' />
        </Link>
    </div>
  )
}

export default CreateBlogBtn