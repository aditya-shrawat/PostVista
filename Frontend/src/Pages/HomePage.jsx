import React, { useEffect, useRef, useState } from 'react'
import PostList from '../Components/PostList'
import CreateBlogBtn from '../Components/CreateBlogBtn'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [Posts,setPosts] = useState([]) ;
  const [showGeneralList,setShowGeneralList] = useState(true);
  const [loadingPosts,setLoadingPosts] = useState(true);
  const isFetching = useRef(false);  // prevents multiple requests at same time

   const fetchPosts = async ()=>{
    if (isFetching.current) return;
    isFetching.current = true 

    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      if(showGeneralList){
        const response = await axios.get(`${BackendURL}/home`,{withCredentials:true}) ;
        
        setPosts(prev => [...prev, ...response.data.allPosts]);
      }
      else{
        const response = await axios.get(`${BackendURL}/home/following`,{withCredentials:true}) ;
        setPosts(response.data.allPosts) ;
      }
    } catch (error) {
      navigate('/*')
    }
    finally{
      isFetching.current = false 
      setLoadingPosts(false);
    }
   }

   useEffect(()=>{
    const timeout = setTimeout(()=>{setLoadingPosts(true)},10);
    setPosts([]);
    fetchPosts();

    return () => clearTimeout(timeout);
   },[showGeneralList]);

   useEffect(()=>{
    fetchPosts();
   },[]);

  return (
    <div className=' w-full relative '>
      <div className=' w-full relative '>
        <div className='w-full sticky top-0 left-0 bg-white dark:bg-black z-20 flex justify-between text-lg border-b-[1px] dark:border-gray-500'>
          <div onClick={()=>{setShowGeneralList(true)}} className='w-[50%] flex justify-center cursor-pointer'>
            <div className={`block py-3 ${showGeneralList?`border-b-4 border-[#6356E5] dark:text-white font-bold`:`border-none text-gray-400 font-semibold`}`}>
              For you
            </div>
          </div>
          <div onClick={()=>{setShowGeneralList(false)}} className='w-[50%] flex justify-center cursor-pointer'>
            <div className={`block py-3 ${!showGeneralList?`border-b-4 border-[#6356E5] dark:text-white font-bold`:`border-none text-gray-400 font-semibold`}`}>
              Following
            </div>
          </div>
        </div>
        {(loadingPosts) ?
        <div>
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
        :
        <>
          {
            (Posts.length===0) ? 
            <div className="w-full px-2 text-center  ">
              <h1 className="text-xl font-semibold dark:text-white mt-20 mb-20 font-plex">You're not following anyone yet!</h1>
            </div>:
            <PostList posts={Posts} />
          }
        </>
        }
      </div>

      <CreateBlogBtn />
    </div>
  )
}

export default HomePage 