import React, { useEffect, useState, } from 'react'
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
        console.log("Error : ",error);
      }
    }

    fetchUser();
  },[])

  return (
    <nav className='w-full h-16 px-6 bg-white bg-opacity-55 backdrop-blur-sm flex flex-row justify-between items-center border-b-[1px] sticky top-0 z-30'>
      <div className='bg-red-300'>logo image</div>
      <div className='flex '>
        <Link to={'new-blog'} className=' hidden sm:block' >
          <div className='mr-6 flex items-center px-2 py-1 cursor-pointer text-gray-500 hover:text-black hover:scale-105 rounded-xl '>
            <LuSquarePen className='mr-2 text-xl' />Post
          </div>
        </Link>
        <Link to={'/search'} className='mr-5 text-2xl text-black sm:hidden flex items-center'>
          <IoSearchSharp />
        </Link>
        <ProfilePicCircle userInfo={userInfo} />
      </div>
    </nav>
  )
}

export default Header