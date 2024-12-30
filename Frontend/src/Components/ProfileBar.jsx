import React from 'react'
import { Link } from 'react-router-dom'

const ProfileBar = ({barRef}) => {
  return (
    <div ref={barRef} className='bg-white absolute top-10 right-0 z-20 rounded-lg border-[1px] shadow-[0px_3px_10px_rgba(0,0,0,0.2)] overflow-hidden'>
        <div className='w-60 p-5 '>
            <ul className=''>
                <li className='mb-2 text-gray-500 hover:text-black cursor-pointer'><Link to={'profile/:id'} >Profile</Link></li>
                <li className='mb-2 text-gray-500 hover:text-black cursor-pointer'><Link to={'mylist'} >Saved Blogs</Link></li>
                <li>
                    <div className=' mt-4 border-t-[1px] pt-4'>
                        <ul>
                            <li className='mb-2 text-gray-500 hover:text-black cursor-pointer'>Theme</li>
                            <li className=' text-gray-500 hover:text-black cursor-pointer'>Logout</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default ProfileBar