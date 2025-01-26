import React, { useContext, useEffect, useRef, useState } from 'react'
import ProfileBar from './ProfileBar'
import { UserContext } from '../Context/UserProvider';

const ProfilePicCircle = () => {
    const [showBar,setShowbar] = useState(false)
    const barRef = useRef(null) ;
    const user = useContext(UserContext) ;
    console.log("user = ",user)

    const handlePfpClick = ()=>{
        setShowbar((prevState)=>!prevState)
    }

    const handleOutsideClick = (e)=>{
        if(barRef.current && !barRef.current.contains(e.target)){
        setShowbar(false) ;
        }
    }

    useEffect(()=>{
        if(showBar){
        document.addEventListener('mousedown',handleOutsideClick);
        }
        else{
        document.removeEventListener('mousedown',handleOutsideClick) ;
        }
        
        return ()=>{
        document.removeEventListener('mousedown',handleOutsideClick) ;
        }
    },[showBar]) ;

  return (
    <div onClick={handlePfpClick} className=' h-9 w-9 relative rounded-full border-[1px] '>
        <div className='h-full w-full rounded-full cursor-pointer'>{user}</div>
        {showBar && <ProfileBar barRef={barRef} />}
    </div>
  )
}

export default ProfilePicCircle