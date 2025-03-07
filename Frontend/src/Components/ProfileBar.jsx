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
        <div className='w-64 px-2 py-4 text-lg '>
            <ul className=''>
                <li className=' py-2 px-2 rounded-lg hover:bg-gray-100 cursor-pointer'>
                    <div className=' w-full ' >
                        <Link to={`/${username}`} className='w-full text-black flex items-center' >
                            <FaRegUser className='mr-3 text-xl' />Profile
                        </Link>
                    </div>
                </li>
                <li className=' py-2 px-2 rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer'>
                    <Link to={'/my/bookmarks'} className=' w-full text-black flex items-center ' > <FaRegBookmark className='mr-3 text-xl' /> Bookmarks</Link>
                </li>
                <li>
                    <div className=' mt-4 border-t-[1px] pt-4'>
                        <ul>
                            <li className=' py-2 px-2 rounded-lg hover:bg-gray-100 cursor-pointer '>
                                <div className='w-full text-black flex items-center'>
                                <VscColorMode className='mr-3 text-2xl'/> Theme
                                </div>
                            </li>
                            <li onClick={handleLogout} className=' py-2 px-2 rounded-lg hover:bg-gray-100 cursor-pointer'>
                                <div className='text-red-500 w-full flex items-center'><RiLogoutBoxRLine className='mr-3 text-2xl' />Logout </div>
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