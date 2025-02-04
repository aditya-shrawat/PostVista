import React from 'react'
import FollowerItem from './FollowerItem'

const FollowersList = ({followersData}) => {
    console.log("followersData - ",followersData)
  return (
    <div className='w-full px-3'>
        {
            followersData.map((follower)=>(
                <FollowerItem key={follower._id} follower={follower} />
            ))
        }
    </div>
  )
}

export default FollowersList