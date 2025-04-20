import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostList from '../Components/PostList';
import EditProfileComponent from '../Components/EditProfileComponent';
import { BsChat } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoIosShareAlt } from "react-icons/io";
import { FaLink } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";
import Header from '../Components/Header';
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import CreateBlogBtn from '../Components/CreateBlogBtn';
import { toast } from 'react-toastify';
import { CustomThemeContext} from '../Contexts/CustomThemeProvider'

const ProfilePage = () => {
  const {username} = useParams();
  const [userDetails,setUserDetails] = useState();
  const navigate = useNavigate() ;
  const [posts,setPosts] = useState([]) ;
  const [followerCount,setFollowerCount] = useState(0) ;
  const [followingCount,setFollowingCount] = useState(0) ;
  const [followStatus,setFollowStatus] = useState() ;
  const [isYourAccount,setIsYourAccount] = useState() ;
  const [edit,setEdit] = useState() ;
  const [isProfileUpdated,setIsProfileUpdated] = useState(false) ;
  const [canUedit,setCanUedit] = useState() ;
  const [userLoading,setUserLoading] = useState(true) ;
  const [postsLoading,setPostsLoading] = useState(true) ;
  const [showMoreOptions,setShowMoreOptions] = useState(false) ;
  const optionsRef = useRef(null) ;
  const [pathLink,setPathLink] = useState(null);
  const [blockStatus,setBlockStatus] = useState() ;
  const [blockPopupOn,setBlockPopupOn] = useState(false);
  const [blockedYou,setBlockedYou] = useState(false) ;

  const {theme} = useContext(CustomThemeContext)

  const fetchPosts =async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/user/${userDetails.id}/post`,{
        withCredentials:true,
      });
      setPosts(response.data.allPosts) ;
    } catch (error) {
      toast.error("Unable to fetch posts. Please try again.",{
        theme: (theme==='dark')?"dark" : "light",
      })
    }
    finally{
      setPostsLoading(false);
    }
  }

  useEffect(()=>{
    if (userDetails ){
      blockStatusOfAccount();
      if(!blockStatus && userDetails.id){
        fetchPosts() ;
      }
      countFollowers();
      checkFollowStatus();
    }
  },[userDetails,blockStatus]) ;

  const fetchingUser = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/${username}`,{
        withCredentials:true,
      });
      setUserDetails(response.data.User) ;
      setCanUedit(response.data.isYou) ;
      setBlockedYou(response.data.blockedYou);
    } catch (error) {
      if(error.response && error.response.status === 400){
        navigate('*');
      }
    }
    finally{
      setUserLoading(false);
    }
  }

  useEffect(()=>{
    if(username){
      setPathLink(`${window.location.origin}/${username}`) ;
      fetchingUser();
    }
  },[username]);

  const checkFollowStatus = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/user/${userDetails.id}/follow/status`,{withCredentials:true,});
      setFollowStatus(response.data.isFollowed) ;
      setIsYourAccount(response.data.isYou) ;
    } catch (error) {
      console.log("Error while fetching Follow status.") ;
    }
  }

  const countFollowers = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/user/${userDetails.id}/follower/count`,{withCredentials:true,});
      setFollowerCount(response.data.followerCount) ;
      setFollowingCount(response.data.followingCount)
      checkFollowStatus();
    } catch (error) {
      console.log("Error in counting Followrs.") ;
    }
  };

  const toggleFollowStatus = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.post(`${BackendURL}/user/${userDetails.id}/follower`,{},{withCredentials:true,});
      setFollowStatus(response.data.isFollowed) ;
      countFollowers()
    } catch (error) {
      toast.error("Unable to Follow-Unfollow user. Please try again.",{
        theme: (theme==='dark')?"dark" : "light",
      })
    }
  }

  useEffect(()=>{
    fetchingUser() ;
  },[isProfileUpdated]) ;

  const handleClickOutsideMoreOptionDiv = (e)=>{
    e.preventDefault(); 
    if(optionsRef.current && !optionsRef.current.contains(e.target)){
      setShowMoreOptions(false) ;
    }
  }

  useEffect(()=>{
    if(showMoreOptions){
      document.addEventListener('mousedown',handleClickOutsideMoreOptionDiv)
    }
    else{
      document.removeEventListener('mousedown',handleClickOutsideMoreOptionDiv)
    }

    return ()=>{
      document.removeEventListener('mousedown',handleClickOutsideMoreOptionDiv)
    }
  },[showMoreOptions])

  const copyLinkToClipboard = ()=>{
    navigator.clipboard.writeText(pathLink) ;
    setShowMoreOptions(false) ;
    toast.success("Link copied!",{
      theme: (theme==='dark')?"dark":"light",
    })
  }

  const blockStatusOfAccount = async ()=>{
    try {
      if(!isYourAccount){
        const BackendURL = import.meta.env.VITE_backendURL;
        const response = await axios.get(`${BackendURL}/user/${userDetails.id}/block`,{withCredentials:true,});
        setBlockStatus(response.data.blockStatus);
      }
    } catch (error) {
      console.log("Error while fetching block-Unblock status.");
    }
  }

  const blockUnblockAccount = async (e)=>{
    e.preventDefault();
    try {
      if(!isYourAccount){
        const BackendURL = import.meta.env.VITE_backendURL;
        const response = await axios.post(`${BackendURL}/user/${userDetails.id}/block`,{},{withCredentials:true,});
        setBlockStatus(response.data.blockStatus);
        setShowMoreOptions(false);
      }
    } catch (error) {
      toast.error("Unable to Block-Unblock user. Please try again.",{
        theme: (theme==='dark')?"dark" : "light",
      })
    }
  }

  function sharePost() {
    if (navigator.share) {
      navigator.share({
        // title: 'The title of the shared content.',
        // text: 'A description or additional message.',
        url: window.location.href,
      })
      // .then(() => console.log('Shared successfully - ',window.location.href))
      .catch((error) => console.error('Error sharing'));
    } else {
      // alert('Sharing not supported on this browser.');
      toast.error("Sharing not supported!",{
        theme: (theme==='dark')?"dark" : "light",
      })
    }
    setShowMoreOptions(false);
  }

  return (
      <div className='w-full min-h-screen relative'>
        <Header />
        <div className='w-full max-w-screen-lg m-auto'>
          {
            (userLoading)?
            <div className='w-full flex flex-col sm:flex-row px-4 py-5'>
              <div>
                  <div className='skeleton  mr-6 sm:mr-8 sm:h-32 sm:w-32 h-24 w-24 rounded-full '></div>
              </div>
              <div className=' mt-1 w-full'>
                <div >
                  <div className='skeleton w-36 h-4 '></div>
                  <div className='skeleton w-36 h-4 mt-4'></div>
                </div>
                <div className='skeleton h-4 w-64 mt-5'></div>
              </div>
            </div>
            :
            <div className='w-full border-b-[1px] dark:border-gray-500 pt-4 pb-6 px-4'>

              <div>
                <div className=' w-full flex justify-between items-end ' >
                  <div className='h-auto w-full'>
                    <div className=' sm:h-32 sm:w-32 h-24 w-24 rounded-full cursor-pointer border-[1px] dark:border-gray-600
                       overflow-hidden '>
                      <img src={userDetails.profilePicURL} className="h-full w-full object-cover" />
                    </div>
                  </div>

                    <div className='w-full'>
                      <div className='w-auto h-auto flex flex-row-reverse justify-start items-center '>
                        <div className=' relative '>
                          <div onClick={()=>{setShowMoreOptions(true)}} className='dark:text-white ml-3 cursor-pointer rounded-full p-1 sm:p-2 border-[1px] dark:border-gray-500 flex justify-center items-center text-black '>
                            <BsThreeDots className='rounded-full text-lg sm:text-xl ' />
                          </div>

                            {(showMoreOptions) &&
                              <div ref={optionsRef} className='bg-white dark:bg-black z-10 h-auto w-64 sm:w-72 p-3 py-5 rounded-xl absolute -top-1 right-0 
                                text-base flex flex-col shadow-[0px_0px_10px_rgba(0,0,0,0.3)] dark:shadow-[0px_0px_10px_rgba(252,252,252,0.5)] overflow-hidden font-plex'>
                                  <div onClick={copyLinkToClipboard} className='flex items-center py-2 px-2 cursor-pointer'>
                                    <div className='mr-3'><FaLink /></div>
                                    <div>Copy link to profile</div>
                                  </div>
                                  <div onClick={sharePost} className='flex items-center py-2 px-2 cursor-pointer'>
                                    <div className='mr-3'><IoIosShareAlt /></div>
                                    <div>Share profile via</div>
                                  </div>
                                  {(!isYourAccount)&&
                                  <div onClick={()=>{setBlockPopupOn(true);setShowMoreOptions(false)}} className='flex items-center py-2 px-2 cursor-pointer'>
                                    <div className='mr-3'><MdBlock  /></div>
                                    <div className='break-words line-clamp-2'>{`${blockStatus?`Unblock`:`Block`} ${`@${userDetails.username}`} `}</div>
                                  </div>
                                  }
                              </div>
                            }
                        </div>

                        {/* <div className='ml-3 dark:text-white cursor-pointer rounded-full p-1 sm:p-2 border-[1px] dark:border-gray-500 flex justify-center items-center text-black '>
                          <MdOutlineEmail className='rounded-full text-lg sm:text-xl ' />
                        </div> */}
                        
                        {
                        (typeof isYourAccount === 'boolean' && typeof canUedit === 'boolean' && typeof blockStatus === 'boolean' && typeof blockedYou === 'boolean')?
                        <>
                          {(isYourAccount && canUedit)?
                          <>
                            <div>
                              <button onClick={()=>{setEdit(true)}} className={`ml-3 dark:text-white border-[1px] dark:border-gray-500
                                rounded-3xl px-3 py-1 sm:py-2 font-semibold cursor-pointer text-[14px] `}>
                                Edit Profile
                              </button>
                            </div>
                          </> :
                          <>
                            { (!blockStatus)?
                              <>{ (!isYourAccount && !blockedYou) &&
                                <div>
                                  <button onClick={toggleFollowStatus} className={`ml-3 
                                    ${followStatus?' dark:text-white border-[1px] dark:border-gray-500':
                                    'bg-[#6356E5] hover:bg-[#7166e5] text-white border-none'} rounded-3xl px-4 py-1 sm:py-2 font-semibold cursor-pointer 
                                    text-[14px] `}>
                                    {followStatus?'Following':'Follow'}
                                  </button>
                                </div>}
                              </>
                            :
                            <div>
                              <button onClick={()=>{setBlockPopupOn(true)}} className={`ml-3
                                bg-red-600 text-white border-none rounded-3xl px-4 py-1 sm:py-2 font-semibold cursor-pointer 
                                text-[14px] sm:text-base `}>
                                Blocked
                              </button>
                            </div>
                            }
                          </>}
                        </>:
                        <>
                        <div className="skeleton h-8 w-24"></div>
                        </>
                        }
                      </div>
                    </div>

                </div>
                <div className='mt-3 w-full'>
                  <div className='w-full mb-2'>
                    <h1 className='text-xl font-bold font-plex line-clamp-1 break-words dark:text-white '>{userDetails.name}</h1>
                    <h2 className='text-[16px] text-gray-500 font-plex line-clamp-1 break-words'>{`@${userDetails.username}`}</h2>
                  </div>
                  {
                    (userDetails.bio!=='') && 
                    <h3 className='break-words text-lg dark:text-white font-plex'>{userDetails.bio}</h3>
                  }

                  <div className='flex text-gray-500 text-base mt-2 '>
                    <div className=' hover:text-gray-600'>
                      <Link to={`/user/${userDetails.id}/follower`} className='flex items-baseline'><span className='font-semibold mr-1'>{followerCount}</span> followers</Link>
                    </div>
                    <div className='ml-6 hover:text-gray-600'>
                      <Link to={`/user/${userDetails.id}/following`} className='flex items-baseline'><span className='font-semibold mr-1'>{followingCount}</span> following</Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          }

          { (!userLoading && (userDetails.bio==='' || userDetails.profilePicPublicId==='')&&canUedit)&&
            <div className='w-full border-b-[1px] dark:border-gray-500 pt-3 pb-5 px-4  '>
              <h2 className='text-lg font-semibold mb-3 font-plex'>Complete your profile </h2>
              <div className='w-full flex overflow-x-auto'>
                { (userDetails.bio==='') &&
                <div className="card bg-base-100 min-w-[280px] border-[1px] mr-5 dark:bg-black dark:border-gray-500 ">
                  <div className='w-full h-auto pt-8 flex justify-center items-center'>
                    <div className='h-16 w-16 rounded-full border-[3px]'>
                      <div className='rounded-full w-full h-full flex justify-center items-center'>
                        <BsChat className='text-4xl' />
                      </div>
                    </div>
                  </div>
                  <div className="card-body items-center text-center font-plex">
                    <h2 className="card-title">Add a bio</h2>
                    <p>Tell others a little about yourself on PostHub.</p>
                    <div className="card-actions">
                      <button onClick={()=>{setEdit(true)}} className="bg-[#6356E5] hover:bg-[#7166e5] cursor-pointer px-3 py-1 
                      font-semibold text-lg text-white rounded-lg mt-2 outline-none border-none font-plex">Add Bio</button>
                    </div>
                  </div>
                </div>
                }

                { (userDetails.profilePicPublicId==='') &&
                <div className="card bg-base-100 min-w-[280px] border-[1px] dark:bg-black dark:border-gray-500 ">
                  <div className='w-full h-auto pt-8 flex justify-center items-center'>
                    <div className='w-16 h-16 rounded-full p-2 border-[3px]'>
                      <div className='rounded-full w-full h-full flex justify-center items-center'>
                        <HiOutlineUserCircle  className='text-5xl' />
                      </div>
                    </div>
                  </div>
                  <div className="card-body items-center text-center font-plex">
                    <h2 className="card-title">Add a profile photo</h2>
                    <p>Choose a photo to represent yourself on PostHub.</p>
                    <div className="card-actions">
                      <button onClick={()=>{setEdit(true)}} className="bg-[#6356E5] hover:bg-[#7166e5] cursor-pointer px-3 py-1 
                      font-semibold text-lg text-white rounded-lg mt-2 outline-none border-none font-plex ">Add Photo</button>
                    </div>
                  </div>
                </div>
                }
              </div>
            </div>
          }

          <div className={`w-full `}>
            {
              (postsLoading)?
              <>
                <div className='w-full mt-5 '>
                  { [...Array(6)].map((_,index)=>(
                    <div key={index} className='px-4 w-full h-40 flex justify-between items-center cursor-pointer ' >
                      <div className=' w-[55%] sm:w-[65%] '>
                        <div className='w-full h-auto flex flex-col gap-2'>
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-full"></div>
                        </div>
                      </div>
                      <div className='ml-4 w-24 h-24 sm:w-32 sm:h-32 skeleton'></div>
                    </div>
                  ))
                  }
                </div>
              </>:
              <>
                {
                  (blockStatus)?
                  <>
                  <div className='w-full pt-16 px-8 '>
                    <div className='w-full flex justify-center '>
                      <div className='block w-auto h-auto'>
                      <h1 className=' text-2xl dark:text-white font-bold font-plex'>{`@${userDetails.username} is blocked.`}</h1>
                      <p className='text-base font-plex text-gray-500'>{`Unblock @${userDetails.username} to see their posts.`}</p>
                      </div>
                    </div>
                  </div>
                  </>:
                  <>
                  { (posts.length===0)?
                  <div className="w-full px-2 text-center  ">
                    {
                      (isYourAccount)&&
                      <h1 className="text-2xl font-semibold dark:text-white font-plex mt-20 mb-20 ">You haven't posted anything yet.</h1>
                    }
                    {
                      (!isYourAccount)&&
                      <h1 className="text-2xl font-semibold dark:text-white font-plex mt-20 mb-20 ">No posts yet.</h1>
                    }
                  </div>:
                  <PostList posts={posts}/>
                  }
                  </>
                }
              </>
            }
          </div>
        </div>
        {
          (edit && canUedit)&&<EditProfileComponent setEdit={setEdit} userDetails={userDetails} setIsProfileUpdated={setIsProfileUpdated} />
        }
        <CreateBlogBtn />
        {
          (blockPopupOn )&& 
          <BlockPopup setBlockPopupOn={setBlockPopupOn} blockUnblockAccount={blockUnblockAccount} 
          blockStatus={blockStatus} username={userDetails.username} />
        }
      </div>
  )
}



const BlockPopup = ({setBlockPopupOn,blockUnblockAccount,blockStatus,username})=>{
    const divRef = useRef(null)

    useEffect(()=>{
        const handleOutsideClick = (e)=>{
            if( divRef.current && !divRef.current.contains(e.target) ){
              setBlockPopupOn(false);
            }
        }

        document.addEventListener('mousedown',handleOutsideClick) ;

        return ()=>{
            document.removeEventListener('mousedown',handleOutsideClick)
        }
    },[setBlockPopupOn]);

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-transparent z-20 fixed top-0 left-0 bg-black bg-opacity-15 backdrop-blur-sm ">
      <div ref={divRef} className=" max-w-[95%] md:max-w-lg w-full sm:max-w-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          <div className="w-full p-5 py-10 bg-white dark:bg-black border-[1px] border-gray-300 dark:border-gray-500 rounded-xl">
              <div className="w-full">
                  <div className='w-full'>
                      <h1 className='text-lg font-semibold break-words font-plex'>
                        {blockStatus?`Unblock @${username} `:
                        `Block @${username}`}
                      </h1>
                      <p className='mt-1 text-[14px] sm:text-base text-gray-500 break-words font-plex'>
                        {blockStatus?
                        `They will be able to follow you and engage with your posts.`:
                        `They will be able to see your posts, but will not able to follow you and you will not see notifications from them.`}
                      </p>
                  </div>
                  <div className='w-full flex justify-evenly mt-6'>
                      <button onClick={()=>{setBlockPopupOn(false)}} className="border-2 border-gray-200 outline-none bg-transparent
                     px-6 py-1 text-lg  font-semibold cursor-pointer rounded-3xl">
                      Cancel
                      </button>
                      <button onClick={(e)=>{setBlockPopupOn(false);blockUnblockAccount(e)}} className={`outline-none px-6 py-1 text-lg text-white font-semibold 
                      rounded-3xl bg-red-600 hover:bg-red-500 cursor-pointer `}>
                      {blockStatus?`Unblock`:`Block`}
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}


export default ProfilePage