import React from 'react'
import { Link } from 'react-router-dom'

const FollowerItem = ({showFollowers,follower,following}) => {
  return (
    <Link to={`/${(showFollowers)?follower.followedBy.username : following.account.username}`} className='w-full px-3 py-3 rounded-lg flex mb-2 hover:bg-gray-100 '>
        <div >
            <div className=' h-12 w-12 bg-green-500 rounded-full cursor-pointer '></div>
        </div>
        <div className='w-full ml-4 '>
            <div className='w-full flex justify-between my-2 '>
                <h1 className=' text-lg font-semibold hover:underline'>{(showFollowers)?follower.followedBy.username : following.account.username}</h1>
                <div>
                    <button className='ml-4 bg-green-500 hover:bg-green-600 rounded-xl px-3 py-1 font-semibold cursor-pointer text-white text-[14px] '>Follow</button>
                </div>
            </div>
            <p className='break-words text-base'>this is my bio.</p>
        </div>
    </Link>
  )
}

export default FollowerItem