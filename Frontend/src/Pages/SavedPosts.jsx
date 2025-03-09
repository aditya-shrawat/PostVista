import React, { useEffect, useState } from 'react'
import PostList from '../Components/PostList'
import axios from 'axios';

const SavedPosts = () => {
  const [savedPosts,setSavedPosts] = useState([]) ;
  const [loading,setLoading] = useState(true) ;

  const fetchSavedPosts = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/my/bookmarks`,{withCredentials:true,});
      setSavedPosts(response.data.savedPosts);
    } catch (error) {
      console.log("Error is fetching saved posts - ",error);
    }
    finally{
      setLoading(false) ;
    }
  }

  useEffect(()=>{
    fetchSavedPosts();
  },[])

  return (
    <div className='w-full '>
      <div className={`w-full min-h-screen relative  `}>
        <div className='w-full bg-white text-2xl font-bold px-4 py-4 border-b-[1px] sticky top-0 left-0 '>
          <h1>Bookmarks</h1>
        </div>
        {
          (loading)?
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
          <>
          {
            (savedPosts.length===0)?
            <>
            <div className='text-center w-[60%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
              <p className='w-full text-[21px] font-semibold break-words'>
                No bookmarks yet. <br />Start saving posts you love !
              </p>
            </div>
            </> :
            <>
            <div className='w-full '>
              <PostList posts={savedPosts} />
            </div>
            </>
          }
          </>
        }
      </div>
    </div>
  )
}

export default SavedPosts