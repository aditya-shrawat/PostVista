import React from 'react'
import Header from './Header.jsx'
import {Outlet} from 'react-router-dom'
import UserProvider from '../Context/UserProvider.jsx'
import { IoSearchSharp } from "react-icons/io5";

const LayoutPage = () => {
  return (
    <UserProvider>
      <div className='w-screen h-screen overflow-auto'>
        <Header />
        <div className=' w-screen lg:max-w-[1200px] lg:m-auto flex relative'>

          <div className='max-w-[730px] w-full min-h-screen m-auto lg:m-0 '>
            <Outlet />
          </div>
          
          <div className='hidden lg:flex flex-1 w-full min-w-[370px] max-w-[470px] h-screen sticky top-0 border-l-[1px] '>
            <div className='w-full'>
              <div className='pl-7 pr-5 relative'>

                <div className='h-14 pb-2 pt-3 '>
                  <div className='flex items-center w-full px-2 border-[1px] rounded-3xl h-full overflow-hidden'>
                    <IoSearchSharp className='mr-1 text-2xl' />
                    <input type="text" className='px-2 py-1 w-full text-lg bg-transparent outline-none border-none' />
                  </div>
                </div>

                <div className='w-full border-[1px] rounded-2xl p-3 px-4 mt-7 '>
                  <h2 className='text-lg font-bold mb-2'>Who to follow</h2>
                  <RecomendedAccountComponent />
                  <RecomendedAccountComponent />
                  <RecomendedAccountComponent />
                  <div className=' inline-block p-1 mt-1 font-semibold hover:underline cursor-pointer'>
                    See more...
                  </div>
                </div>

                <div className='w-full border-[1px] rounded-2xl p-3 px-4 mt-7 '> 
                  <h2 className='text-lg font-bold mb-2'>Recently saved</h2>
                  <RecomendedRecentPostComponent />
                  <RecomendedRecentPostComponent />
                  <div className=' inline-block p-1 font-semibold hover:underline cursor-pointer'>
                    See more...
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </UserProvider>
  )
}

const RecomendedAccountComponent = ()=>{
  return (
    <div className='w-full py-2 my-1 flex cursor-pointer '>
      <div >
        <div className=' h-12 w-12 bg-gray-500 rounded-full cursor-pointer border-[1px] overflow-hidden '> 
        </div>
      </div>
      <div className='w-full ml-4 '>
        <div className='w-full flex'>
          <div className='w-full flex flex-col  '>
            <h1 className=' text-base font-bold hover:underline line-clamp-2 break-words'>Aditya</h1>
            <h1 className=' text-gray-500 text-base line-clamp-2 break-words'>@aditya</h1>
          </div>
          <div>
            <button className={`ml-4 bg-green-500 hover:bg-green-600 text-white border-none rounded-xl 
              px-3 py-1 font-semibold cursor-pointer text-[14px] block `}>
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const RecomendedRecentPostComponent = ()=>{
  return (
    <div className='w-full py-2 my-1 flex cursor-pointer  '>
      <div className='w-full '>
        <div className='flex items-center'>
          <div className='block bg-gray-500 h-6 w-6 rounded-full mr-3 cursor-pointer border-[1px] overflow-hidden '>

          </div>
          <div className='w-auto cursor-pointer '>
            <div className='flex items-baseline'>
              <h1 className='text-base font-semibold text-black hover:underline line-clamp-1 break-words '>Aditya</h1>
            </div>
          </div>
        </div>
        <div className='w-full '>
          <h1 className='text-lg font-bold line-clamp-2 break-words'>
            this is posts title alskjd; k;gkj ;lah s;dh sal kj l ask;ldkg ;ls ahl;gn ssaln dglhs; ldgkj sla kjs lg kaln
            askjd l;kj g;la skh; lng;la snb ;lhs h;lg j;l skj
          </h1>
        </div>
      </div>
    </div>
  )
}

export default LayoutPage