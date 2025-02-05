import React from 'react'
import FollowerItem from './FollowerItem'

const FollowersList = ({showFollowers,followersData,followingData}) => {
  return (
    <div className='w-full px-3'>
        {
            (showFollowers)?
            followersData.map((follower)=>(
                <FollowerItem key={follower._id} showFollowers={showFollowers} follower={follower} />
            )) :
            followingData.map((following)=>(
                <FollowerItem key={following._id} showFollowers={showFollowers} following={following} />
            ))
        }
    </div>
  )
}

export default FollowersList