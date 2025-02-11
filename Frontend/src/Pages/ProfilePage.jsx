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
  const [userLoading,setUserLoading] = useState(true) ;
  const [postsLoading,setPostsLoading] = useState(true) ;

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
    finally{
      setPostsLoading(false);
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
    finally{
      setUserLoading(false);
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
      <div className='w-full relative '>
        <div className='max-w-[700px] m-auto '>
          {
            (userLoading)?
            <div className='w-full flex flex-col sm:flex-row px-4 py-5'>
              <div>
                  <div className='skeleton  mr-6 sm:mr-8 sm:h-32 sm:w-32 h-24 w-24 rounded-full '></div>
              </div>
              <div className=' mt-1 w-full'>
                <div className='w-full my-2 flex justify-between items-center '>
                  <div className=''>
                    <div className='skeleton w-36 h-4 '></div>
                    <div className='skeleton w-36 h-4 mt-4'></div>
                  </div>
                  <div className="skeleton h-8 w-24"></div>
                </div>
                <div className='skeleton h-4 w-64 mt-5'></div>
              </div>
            </div>
            :
            <div className='w-full border-b-[1px] pt-6 pb-9 px-4'>
              <div className=' w-full flex flex-col sm:flex-row ' >
                <div>
                  <div className='mr-6 sm:mr-8 sm:h-32 sm:w-32 h-24 w-24 bg-green-500 rounded-full cursor-pointer '></div>
                </div>
                <div className='mt-1 w-full'>
                  <div className='w-full my-2 flex justify-between items-center '>
                    <div>
                      <h1 className='text-xl font-semibold'>{userDetails.name}</h1>
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
          }
          <div className={` w-full] p-2 `}>
            {
              (postsLoading)?
              <>
              <div>
                <div className='px-4 mt-5'>
                  <div className='w-full h-40 flex justify-between items-center cursor-pointer ' >
                    <div className=' w-[58%] sm:w-[70%]  flex flex-col justify-between '>
                      <div className='w-full h-auto flex flex-col gap-2'>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                      </div>
                    </div>
                    <div className='ml-8 min-w-24 min-h-24 sm:w-32 sm:h-32 skeleton'></div>
                  </div>
                  <div className='w-full h-40 flex justify-between items-center cursor-pointer ' >
                    <div className=' w-[58%] sm:w-[70%]  flex flex-col justify-between '>
                      <div className='w-full h-auto flex flex-col gap-2'>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                      </div>
                    </div>
                    <div className='ml-8 min-w-24 min-h-24 sm:w-32 sm:h-32 skeleton'></div>
                  </div>
                  <div className='w-full h-40 flex justify-between items-center cursor-pointer ' >
                    <div className=' w-[58%] sm:w-[70%]  flex flex-col justify-between '>
                      <div className='w-full h-auto flex flex-col gap-2'>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                      </div>
                    </div>
                    <div className='ml-8 min-w-24 min-h-24 sm:w-32 sm:h-32 skeleton'></div>
                  </div>
                </div>
              </div>
              </>:
              <PostList posts={posts} />
            }
          </div>
        </div>
        {
          (edit && canUedit)?<EditProfileComponent setEdit={setEdit} userDetails={userDetails} setIsProfileUpdated={setIsProfileUpdated} />:<></>
        }
      </div>
  )
}

export default ProfilePage