import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostList from '../Components/PostList';

const ProfilePage = () => {
  const {username} = useParams();
  const [userDetails,setUserDetails] = useState();
  const navigate = useNavigate() ;
  const [posts,setPosts] = useState([]) ;
  const [followerCount,setFollowerCount] = useState(0) ;
  const [followingCount,setFollowingCount] = useState(0) ;
  const [followStatus,setFollowStatus] = useState(false) ;

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
    }
  },[userDetails]) ;

  const fetchingUser = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/${username}`,{
        withCredentials:true,
      });
      setUserDetails(response.data) ;
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

  const countFollowers = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/user/${userDetails.id}/follower/count`,{withCredentials:true,});
      setFollowerCount(response.data.followerCount) ;
      setFollowingCount(response.data.followingCount)
      setFollowStatus(response.data.isFollowed) ;
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

  return (
    (!userDetails) ? (
      <div  className='bg-blue-500 text-9xl h-1/2 '>Loading....</div>
    ) : (
      <div className='w-full  '>
        <div className='max-w-[700px] m-auto '>
          <div className=' w-full pt-6 pb-9 mt-3 px-3 flex flex-col sm:flex-row border-b-[1px] ' >
            <div>
              <div className='mr-6 sm:mr-8 sm:h-32 sm:w-32 h-24 w-24 bg-green-500 rounded-full cursor-pointer '></div>
            </div>
            <div className='mt-1'>
              <div className=' items-center my-2 flex '>
                <h1 className='sm:text-2xl text-2xl font-semibold'>{userDetails.username}</h1>
                <button onClick={toggleFollowStatus} className={`ml-14 ${followStatus?'bg-gray-100':'bg-green-500'} ${followStatus?'hover:bg-gray-200':'hover:bg-green-600'} 
                 rounded-xl px-6 py-1 font-semibold cursor-pointer ${followStatus?'text-black':'text-white'}  text-[16px] ${followStatus?'border-2':'border-none'} `}>
                  {followStatus?'Following':'Follow'}
                </button>
              </div>
              <div className='flex text-gray-500 text-[17px] mb-2 '>
                <span className='hover:bg-gray-100 px-2 rounded-lg hover:text-gray-600'>
                  <Link to={`/user/${userDetails.id}/follower`}>{followerCount} followers</Link>
                </span>
                <span className='ml-6 hover:bg-gray-100 px-2 rounded-lg hover:text-gray-600'>
                  <Link to={`/user/${userDetails.id}/following`}>{followingCount} following</Link>
                </span>
              </div>
              <h3 className='break-words text-[17px]'>This is my bio.</h3>
            </div>
          </div>
          <div className={` w-full]  `}>
            <PostList posts={posts} />
          </div>
        </div>
      </div>
    )
  )
}

export default ProfilePage