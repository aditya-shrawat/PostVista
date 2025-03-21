import React, { useContext, useEffect, useRef, useState } from 'react'
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
import ChangePass from '../Components/SettingsComponent/ChangePass';
import BlockedAccounts from '../Components/SettingsComponent/BlockedAccounts';
import Archive from '../Components/SettingsComponent/Archive';
import EditProfileComponent from '../Components/EditProfileComponent';
import axios from 'axios';
import { CustomThemeContext } from '../Contexts/CustomThemeProvider';

const SettingsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const contentType = location.pathname.split("/").pop() ;
    const [isProfileUpdated,setIsProfileUpdated] = useState(false) ;
    const [edit,setEdit] = useState(false) ;
    const [userDetails,setUserDetails] = useState(null);
    const [deleteAccount,setDeleteAccount] = useState(false);

    const {theme,toggleTheme} = useContext(CustomThemeContext)

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

    const fetchingUserDetails = async ()=>{
        try {
            const BackendURL = import.meta.env.VITE_backendURL;
            const response = await axios.get(`${BackendURL}/settings/account-information`,{
                withCredentials:true,
            });
            setUserDetails(response.data.userDetails) ;
        } catch (error) {
            console.log("Error :",error) ;
            if(error.response && error.response.status === 400){
                navigate('*');
            }
        }
    }

    useEffect(()=>{
        fetchingUserDetails();
    },[])

    useEffect(()=>{
        fetchingUserDetails() ;
    },[isProfileUpdated]) ;

  return (
    <div className='w-screen h-screen overflow-hidden'>
        <Header />
        <div className=' w-full lg:max-w-[1200px] lg:m-auto flex relative'>
            <div className='lg:max-w-[670px] w-full min-h-screen '>
                <div className='w-full px-4 py-6 font-plex'>
                    <div className='w-full px-2 mb-5'>
                        <h1 className='text-xl font-bold'>Settings</h1>
                        {(userDetails) && <p className="text-base text-gray-500">{`@${userDetails.username}`}</p>}
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <div onClick={()=>{handleNavigation('account')}} className='w-full flex justify-between items-center text-lg p-2 cursor-pointer '>
                            <div className='flex items-center'><FaRegUser className='mr-4 text-xl' /><span>Account information</span></div>
                            <div><IoIosArrowForward /></div>
                        </div>
                        <div onClick={()=>{handleNavigation('password')}} className='w-full flex justify-between items-center text-lg p-2 cursor-pointer '>
                            <div className='flex items-center'><RiLockPasswordLine className='mr-4 text-xl' /><span>Change your password</span></div>
                            <div><IoIosArrowForward /></div>
                        </div>
                        <div onClick={()=>{handleNavigation('blocked')}} className='w-full flex justify-between items-center text-lg p-2 cursor-pointer '>
                            <div className='flex items-center'><MdBlock className='mr-4 text-xl' /><span>Blocked accounts</span></div>
                            <div><IoIosArrowForward /></div>
                        </div>
                        {/* <div onClick={()=>{handleNavigation('archive')}} className='w-full flex items-center justify-between text-lg hover:bg-gray-100 rounded-lg p-2 cursor-pointer '>
                            <div className='flex items-center'><MdOutlineArchive className='mr-4 text-xl' /><span>Archive</span></div>
                            <div><IoIosArrowForward /></div>
                        </div> */}
                        <div onClick={toggleTheme} className='w-full flex items-center text-lg p-2 cursor-pointer '>
                            <VscColorMode className='mr-4 text-xl' /><span>{`Theme (${theme}) `}</span>
                        </div>
                        <div onClick={()=>{setDeleteAccount(true)}} className='w-full flex items-center text-lg p-2 cursor-pointer '>
                            <AiOutlineUserDelete className='mr-4 text-xl' /><span>Delete your account</span>
                        </div>
                    </div>
                </div>
            </div>
          
            <div className={`fixed top-16 lg:top-0 right-0 w-full h-screen 
                ${(location.pathname==="/settings")?"translate-x-full lg:translate-x-0":"translate-x-0"} 
                bg-white dark:bg-black lg:relative  lg:min-w-[430px] lg:max-w-[530px] lg:border-l-[1px] dark:border-gray-500 lg:pl-5 lg:pr-4 `}>
                <div className='w-full h-full px-4 py-6 dark:bg-black'>
                {(contentType==='account') && <AccountInfo userDetails={userDetails} setEdit={setEdit} />}
                {(contentType==='password') && <ChangePass />}
                {(contentType==='blocked') && <BlockedAccounts />}
                {(contentType==='archive') && <Archive />}
                </div>
            </div>
        </div>
        {
            (edit )&&<EditProfileComponent setEdit={setEdit} userDetails={userDetails} setIsProfileUpdated={setIsProfileUpdated} />
        }
        {
            (deleteAccount) && <DeletePopup setDeleteAccount={setDeleteAccount} />
        }
      </div>
  )
}


const DeletePopup = ({setDeleteAccount})=>{
    const divRef = useRef(null)
    const [errorMsg,setErrorMsg] = useState('');
    const [enteredPassword,setEnteredPasswordData] = useState('');

    const onPasswordInputChange = (e)=>{
        setEnteredPasswordData(e.target.value) ;
    }

    useEffect(()=>{
        const handleOutsideClick = (e)=>{
            if( divRef.current && !divRef.current.contains(e.target) ){
                setDeleteAccount(false);
            }
        }

        document.addEventListener('mousedown',handleOutsideClick) ;

        return ()=>{
            document.removeEventListener('mousedown',handleOutsideClick)
        }
    },[setDeleteAccount]);

    const deleteAccount = async (e)=>{
        e.preventDefault();
        try {
            const BackendURL = import.meta.env.VITE_backendURL;
            await axios.post(`${BackendURL}/settings/delete-account`,{enteredPassword},{withCredentials:true,});
            console.log("account deleted");
            setDeleteAccount(false);

            window.location.href = "/user/signin";
        } catch (error) {
            if(error.response && error.response.data.error){
            setErrorMsg(error.response.data.error) ;
            }
            else{
            setErrorMsg("Something went wrong, please try again")
            }
        }
    }

    return (
    <div className="w-screen h-screen overflow-x-hidden bg-transparent z-20 fixed top-0 left-0 bg-black bg-opacity-15 backdrop-blur-sm ">
        <div ref={divRef} className=" max-w-[95%] md:max-w-lg w-full sm:max-w-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
            <div className="w-full p-5 py-10 bg-white dark:bg-black border-[1px] border-gray-300 dark:border-gray-500 rounded-xl">
                <div className="w-full">
                    <div className='w-full'>
                        <h1 className='text-base sm:text-lg font-semibold break-words font-plex'>
                            Deleting your account will remove all your posts, comments, likes, followers, and other data permanently. This action is irreversible.
                        </h1>
                    </div>
                    <div className='w-full mt-6 mb-2 font-plex'>
                        <label className='text-gray-500'>Enter account password</label>
                        <div className='w-full'>
                            <input onChange={onPasswordInputChange} value={enteredPassword} type="password" name="password"
                            className="w-full mt-1 p-1 px-2 text-lg rounded-lg border-[1px] dark:border-gray-500 dark:bg-black outline-none " />
                        </div>
                    </div>
                    {
                        (errorMsg!=='')&& <div className='text-red-500 text-lg'>{errorMsg}</div>
                    }
                    <div className='w-full flex justify-evenly mt-6'>
                        <button onClick={()=>{setDeleteAccount(false)}} className="border-2 border-blue-500 outline-none bg-transparent
                        hover:text-blue-400 px-6 py-1 text-lg text-blue-500 font-semibold cursor-pointer rounded-3xl">
                        Cancel
                        </button>
                        <button onClick={deleteAccount} className={`outline-none px-6 py-1 text-lg text-white font-semibold 
                        rounded-3xl bg-blue-500 hover:bg-blue-400 cursor-pointer `}>
                        Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}



export default SettingsPage