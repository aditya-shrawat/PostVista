import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostList from '../Components/PostList';
import EditProfileComponent from '../Components/EditProfileComponent';

const ProfilePage = () => {
  const {username} = useParams();
  const [userDetails,setUserDetails] = useState();
  const navigate = useNavigate() ;
  const [posts,setPosts] = useState([]) ;
  const [followerCount,setFollowerCount] = useState(0) ;
  const [followingCount,setFollowingCount] = useState(0) ;
  const [followStatus,setFollowStatus] = useState(false) ;
  const [isYourAccount,setIsYourAccount] = useState(false) ;
  const [edit,setEdit] = useState(false) ;
  const [isProfileUpdated,setIsProfileUpdated] = useState(false) ;
  const [canUedit,setCanUedit] = useState(false) ;

  const fetchPosts =async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/user/${userDetails.id}/post`,{
        withCredentials:true,
      });
      setPosts(response.data.allPosts) ;
    } catch (error) {
      console.log("Error in fetching posts - ",error) ;
    }
  }

  useEffect(()=>{
    if (userDetails ){
      fetchPosts() ;
      countFollowers();
      checkFollowStatus();
    }
  },[userDetails]) ;

  const fetchingUser = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/${username}`,{
        withCredentials:true,
      });
      setUserDetails(response.data.User) ;
      setCanUedit(response.data.isYou) ;
    } catch (error) {
      console.log("Error :",error) ;
      if(error.response && error.response.status === 400){
        navigate('*');
      }
    }
  }

  useEffect(()=>{
    fetchingUser();
  },[username]);

  const checkFollowStatus = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/user/${userDetails.id}/follow/status`,{withCredentials:true,});
      setFollowStatus(response.data.isFollowed) ;
      setIsYourAccount(response.data.isYou) ;
    } catch (error) {
      console.log("Error in checking Followe status -",error) ;
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
      console.log("Error in counting Followers -",error) ;
    }
  };

  const toggleFollowStatus = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.post(`${BackendURL}/user/${userDetails.id}/follower`,{},{withCredentials:true,});
      setFollowStatus(response.data.isFollowed) ;
      countFollowers()
    } catch (error) {
      console.log("Error in toggling FollowStatus -",error) ;
    }
  }

  useEffect(()=>{
    fetchingUser() ;
  },[isProfileUpdated]) ;

  return (
    (!userDetails) ? (
      <div  className='bg-blue-500 text-9xl h-1/2 '>Loading....</div>
    ) : (
      <div className='w-full relative '>
        <div className='max-w-[700px] m-auto '>
          <div className='w-full border-b-[1px] pt-6 pb-9 px-3'>
            <div className=' w-full flex flex-col sm:flex-row ' >
              <div>
                <div className='mr-6 sm:mr-8 sm:h-32 sm:w-32 h-24 w-24 bg-green-500 rounded-full cursor-pointer '></div>
              </div>
              <div className='mt-1 w-full'>
                <div className='w-full my-2 flex justify-between items-center '>
                  <div>
                    {
                      (userDetails.name)&&
                      <h1 className='text-2xl font-semibold'>{userDetails.name}</h1>
                    }
                    <h2 className='text-base text-gray-500 '>{`@${userDetails.username}`}</h2>
                  </div>
                  {
                    (isYourAccount && canUedit)?
                    <>
                    <button onClick={()=>{setEdit(true)}} className={`ml-14 bg-gray-100 hover:bg-gray-200 text-black border-2
                      rounded-xl px-6 py-1 font-semibold cursor-pointer text-[16px]  `}>
                      Edit Profile
                    </button>
                    </> :
                    <>
                    <button onClick={toggleFollowStatus} className={`ml-14 
                      ${followStatus?'bg-gray-100 hover:bg-gray-200 text-black border-2':
                      'bg-green-500 hover:bg-green-600 text-white border-none'} rounded-xl px-6 py-1 font-semibold cursor-pointer 
                      text-[16px]  `}>
                      {followStatus?'Following':'Follow'}
                    </button>
                    </>
                  }
                </div>
                {
                  (userDetails.bio!=='') && 
                  <h3 className='break-words text-[17px]'>{userDetails.bio}</h3>
                }
                <div className='flex text-gray-500 text-[17px] mt-3 '>
                  <span className='hover:bg-gray-100 px-2 rounded-lg hover:text-gray-600'>
                    <Link to={`/user/${userDetails.id}/follower`}>{followerCount} followers</Link>
                  </span>
                  <span className='ml-6 hover:bg-gray-100 px-2 rounded-lg hover:text-gray-600'>
                    <Link to={`/user/${userDetails.id}/following`}>{followingCount} following</Link>
                  </span>
                </div>
              </div>
            </div>
            {
              ((userDetails.bio==='' || userDetails.name==='')&&canUedit)&&
              <div className='w-full mt-2'>
                <p className='text-lg text-blue-400  '>
                  {`Add ${(userDetails.bio==='')?`bio and`:``} ${(userDetails.name==='')?'name.':''}`}
                  </p>
              </div>
            }
          </div>
          <div className={` w-full]  `}>
            <PostList posts={posts} />
          </div>
        </div>

        {
          (edit && canUedit)?<EditProfileComponent setEdit={setEdit} userDetails={userDetails} setIsProfileUpdated={setIsProfileUpdated} />:<></>
        }

      </div>
    )
  )
}

export default ProfilePage