import React, { useEffect, useState } from 'react'
import UserProvider from '../Context/UserProvider'
import Header from '../Components/Header'
import { FaRegUser } from "react-icons/fa";
import { VscColorMode } from "react-icons/vsc";
import { MdBlock } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUserDelete } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AccountInfo from '../Components/SettingsComponent/AccountInfo';
import ChangePass from '../Components/SettingsComponent/changePass';
import BlockedAccounts from '../Components/SettingsComponent/BlockedAccounts';
import Archive from '../Components/SettingsComponent/Archive';

const SettingsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const contentType = location.pathname.split("/").pop() ;

    const handleNavigation = (type)=>{
        navigate(`/settings/${type}`);
    }

    const isLargeScreen = () => window.matchMedia("(min-width: 1024px)").matches;

    useEffect(() => {
        const handleResize = () => {
          if (location.pathname === "/settings" && isLargeScreen()) {
            navigate("/settings/account", { replace: true });
          }
        };

        handleResize();
      
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [location.pathname, navigate]);

  return (
      <div className='w-screen h-screen overflow-hidden'>
        <div className=' w-full lg:max-w-[1200px] lg:m-auto flex relative'>
            <div className='lg:max-w-[670px] w-full min-h-screen '>
                <div className='w-full px-4 py-6'>
                    <div className='w-full px-2 mb-5'>
                        <h1 className='text-xl font-bold'>Settings</h1>
                        <p className="text-base text-gray-500">@username</p>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <div onClick={()=>{handleNavigation('account')}} className='w-full flex justify-between items-center text-lg hover:bg-gray-100 rounded-lg p-2 cursor-pointer '>
                            <div className='flex items-center'><FaRegUser className='mr-4 text-xl' /><span>Account information</span></div>
                            <div><IoIosArrowForward /></div>
                        </div>
                        <div onClick={()=>{handleNavigation('password')}} className='w-full flex justify-between items-center text-lg hover:bg-gray-100 rounded-lg p-2 cursor-pointer '>
                            <div className='flex items-center'><RiLockPasswordLine className='mr-4 text-xl' /><span>Change your password</span></div>
                            <div><IoIosArrowForward /></div>
                        </div>
                        <div onClick={()=>{handleNavigation('blocked')}} className='w-full flex justify-between items-center text-lg hover:bg-gray-100 rounded-lg p-2 cursor-pointer '>
                            <div className='flex items-center'><MdBlock className='mr-4 text-xl' /><span>Blocked accounts</span></div>
                            <div><IoIosArrowForward /></div>
                        </div>
                        <div onClick={()=>{handleNavigation('archive')}} className='w-full flex items-center justify-between text-lg hover:bg-gray-100 rounded-lg p-2 cursor-pointer '>
                            <div className='flex items-center'><MdOutlineArchive className='mr-4 text-xl' /><span>Archive</span></div>
                            <div><IoIosArrowForward /></div>
                        </div>
                        <div className='w-full flex items-center text-lg hover:bg-gray-100 rounded-lg p-2 cursor-pointer '>
                            <VscColorMode className='mr-4 text-xl' /><span>Theme</span>
                        </div>
                        <div className='w-full flex items-center text-lg hover:bg-gray-100 rounded-lg p-2 cursor-pointer '>
                            <AiOutlineUserDelete className='mr-4 text-xl' /><span>Delete your account</span>
                        </div>
                    </div>
                </div>
            </div>
          
            <div className={`fixed top-0 right-0 w-full h-screen 
                ${(location.pathname==="/settings")?"translate-x-full lg:translate-x-0":"translate-x-0"} 
                bg-white lg:relative  lg:min-w-[430px] lg:max-w-[530px] lg:border-l-[1px] lg:pl-5 lg:pr-4 `}>
                <div className='w-full h-full px-4 py-6'>
                {(contentType==='account') && <AccountInfo />}
                {(contentType==='password') && <ChangePass />}
                {(contentType==='blocked') && <BlockedAccounts />}
                {(contentType==='archive') && <Archive />}
                </div>
            </div>
        </div>
      </div>
  )
}



export default SettingsPage