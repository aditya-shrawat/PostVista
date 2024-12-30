import React from 'react'
import Layout from './Components/Layout'
import HomePage from './Pages/HomePage'
import PostDetailPage from './Pages/PostDetailPage'
import ProfilePage from './Pages/ProfilePage'
import Errorpage from './Pages/Errorpage'
import LoginPage from './Pages/LoginPage'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {path:'/', element: <HomePage /> },
      {path:'post/:id',element:<PostDetailPage /> },
      {path:'profile/:id',element:<ProfilePage /> },
    ]
  },
  {path:'login',element:<LoginPage /> },
  {path:'signup',element:<LoginPage /> },
  {
    path:'*',
    element:<Errorpage />
  }
])


const App = () => {
  return <RouterProvider router={router} />
}

export default App