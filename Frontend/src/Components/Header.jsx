import React, { useEffect, useRef, useState, } from 'react'
import { LuSquarePen } from "react-icons/lu";
import { Link } from 'react-router-dom';
import ProfilePicCircle from './ProfilePicCircle';
import axios from 'axios';
import { IoSearchSharp } from "react-icons/io5";

const Header = () => {
  const [userInfo,setUserInfo] = useState(null);
  useEffect(()=>{
    const fetchUser = async ()=>{
      try {
        const BackendURL = import.meta.env.VITE_backendURL
        const response = await axios.get(`${BackendURL}/profile`,{
          withCredentials: true,
        });
        setUserInfo(response.data) ;
      } catch (error) {
        console.log("Error while fetching user profile.");
      }
    }

    fetchUser();
  },[])

  return (
    <nav className={`w-full h-16 px-3 bg-white dark:bg-black flex flex-row 
    justify-between items-center border-b-[1px] dark:border-gray-500 z-30 sticky top-0 left-0 `}>
      <div className='h-full w-32 sm:w-40  '>
        <img 
        src={`https://res.cloudinary.com/dmeaz48sd/image/upload/v1743398717/postVistaLogo_h6rcsz.png`} 
        className='h-full w-full object-contain'
        />
      </div>
      <div className='flex '>
        <Link to={'/new-blog'} className=' hidden sm:block' >
          <div className='mr-6 flex items-center px-2 py-1 cursor-pointer text-gray-400 hover:text-black dark:hover:text-white hover:scale-105 rounded-xl '>
            <LuSquarePen className='mr-2 text-xl' />Post
          </div>
        </Link>
        <Link to={'/search'} className='mr-5 text-2xl dark:text-white sm:hidden flex items-center'>
          <IoSearchSharp />
        </Link>
        <ProfilePicCircle userInfo={userInfo} />
      </div>
    </nav>
  )
}

export default Header