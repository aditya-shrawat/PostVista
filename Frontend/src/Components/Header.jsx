import React, { useContext, } from 'react'
import { UserContext } from '../Context/UserProvider';
import { LuSquarePen } from "react-icons/lu";
import { Link } from 'react-router-dom';
import ProfilePicCircle from './ProfilePicCircle';

const Header = () => {
  const userInfo = useContext(UserContext) ;
  console.log("userInfo = ",userInfo)

  return (
    <nav className='w-full h-16 px-6 bg-white bg-opacity-55 backdrop-blur-sm flex flex-row justify-between items-center border-b-[1px]  sticky top-0 left-0 z-20'>
      <div className='bg-red-300'>logo image</div>
      <div className='flex '>
        <Link to={'new-blog'} className=' hidden sm:block' >
          <div className='mr-6 flex items-center px-2 py-1 cursor-pointer text-gray-500 hover:text-black hover:scale-105 rounded-xl '>
            <LuSquarePen className='mr-2 text-xl' />Post
          </div>
        </Link>
        <ProfilePicCircle userInfo={userInfo} />
      </div>
    </nav>
  )
}

export default Header