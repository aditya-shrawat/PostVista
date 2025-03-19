import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegBookmark  } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import axios from 'axios';
import { MdOutlineSettings } from "react-icons/md";

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
    <div ref={barRef} className='bg-white absolute top-10 right-0 z-30 rounded-lg border-[2px] shadow-[0px_3px_10px_rgba(0,0,0,0.2)] overflow-hidden'>
        <div className=' w-64 md:w-72 h-auto px-2 py-4 text-lg '>
            <div className='w-full'>
                <div className='w-full'>
                    <div className='w-full flex flex-col font-plex'>
                        <div>
                            <Link to={`/${username}`} className='w-full flex items-center px-3 py-2 text-lg cursor-pointer hover:bg-gray-100 rounded-lg'>
                            <FaRegUser className='mr-5 text-xl' /><span>Profile</span>
                            </Link>
                        </div>
                        <div>
                            <Link to={'/my/bookmarks'} className='w-full flex items-center px-3 py-2 text-lg cursor-pointer hover:bg-gray-100 rounded-lg'>
                            <FaRegBookmark className='mr-5 text-xl' /><span>Bookmarks</span>
                            </Link>
                        </div>
                        <Link to={'/settings'} className='w-full flex items-center px-3 py-2 text-lg cursor-pointer hover:bg-gray-100 rounded-lg'>
                            <MdOutlineSettings className='mr-5 text-2xl' /><span>Settings</span>
                        </Link>
                        <div className='mt-3 pt-3 border-t-[1px] '>
                            <div onClick={handleLogout} className='w-full flex items-center px-3 py-2 text-red-500 text-lg cursor-pointer hover:bg-gray-100 rounded-lg'>
                                <RiLogoutBoxRLine className='mr-5 text-2xl' /><span>Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileBar