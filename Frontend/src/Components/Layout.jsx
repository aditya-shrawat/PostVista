import React from 'react'
import Header from './Header.jsx'
import {Outlet} from 'react-router-dom'
import UserProvider from '../Context/UserProvider.jsx'

const LayoutPage = () => {
  return (
    <UserProvider>
      <div>
        <Header />
        <Outlet />
      </div>
    </UserProvider>
  )
}

export default LayoutPage