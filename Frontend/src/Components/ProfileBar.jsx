import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegBookmark  } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { VscColorMode } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import axios from 'axios';

const ProfileBar = ({barRef,username}) => {
    const navigate = useNavigate() ;

    const handleLogout = async ()=>{
        try {
            const BackendURL = import.meta.env.VITE_backendURL;
            const response =await axios.get(`${BackendURL}/user/logout`,{ withCredentials: true });
            if(response.status ===200){
                console.log("Logout successfully")
                navigate('/user/signin');
            }
        } catch (error) {
            console.log("Error in logout -",error);
        }
    }

  return (
    <div ref={barRef} className='bg-white absolute top-10 right-0 z-20 rounded-lg border-[1px] shadow-[0px_3px_10px_rgba(0,0,0,0.2)] overflow-hidden'>
        <div className='w-64 px-6 py-8 text-lg '>
            <ul className=''>
                <li className='mb-5 text-gray-500 hover:text-black cursor-pointer'>
                    <div className=' w-full ' >
                        <Link to={`/${username}`} className='w-full h-full flex items-center' >
                            <FaRegUser className='mr-3 text-xl' />Profile
                        </Link>
                    </div>
                </li>
                <li className='mb-5 text-gray-500 hover:text-black cursor-pointer'>
                    <Link to={'/my/bookmarks'} className=' w-full flex items-center ' > <FaRegBookmark className='mr-3 text-xl' /> Bookmarks</Link>
                </li>
                <li>
                    <div className=' mt-4 border-t-[1px] pt-4'>
                        <ul>
                            <li className='mb-5 text-gray-500 hover:text-black cursor-pointer flex items-center'> <VscColorMode className='mr-3 text-2xl'/> Theme</li>
                            <li onClick={handleLogout} className=' text-gray-500 hover:text-black cursor-pointer flex items-center'>
                                <RiLogoutBoxRLine className='mr-3 text-2xl' />Logout
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default ProfileBar