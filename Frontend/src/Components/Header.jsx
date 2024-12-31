import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileBar from './ProfileBar'

const Header = () => {

  const [showBar,setShowbar] = useState(false)
  const barRef = useRef(null) ;

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
    <nav className='w-full h-16 px-6 bg-white bg-opacity-55 backdrop-blur-sm flex flex-row justify-between items-center border-b-[1px]  fixed top-0 left-0 z-20'>
      <div className='bg-red-300'>logo image</div>
      <div>
        <div onClick={handlePfpClick} className=' h-9 w-9 relative rounded-full border-[1px] '>
          <div className='h-full w-full rounded-full cursor-pointer'>A</div>
          {showBar && <ProfileBar barRef={barRef} />}
        </div>
      </div>
    </nav>
  )
}

export default Header