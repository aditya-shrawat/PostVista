import React from 'react'
import Header from './Header.jsx'
import {Outlet} from 'react-router-dom'

const LayoutPage = () => {
  return (
    <div>
       <Header />
       <Outlet />
    </div>
  )
}

export default LayoutPage