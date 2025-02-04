import React from 'react'
import Layout from './Components/Layout'
import HomePage from './Pages/HomePage'
import PostDetailPage from './Pages/PostDetailPage'
import ProfilePage from './Pages/ProfilePage'
import Errorpage from './Pages/Errorpage'
import LoginPage from './Pages/LoginPage'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SavedPosts from './Pages/SavedPosts'
import CreateBlogPage from './Pages/CreateBlogPage'
import FollowerPage from './Pages/FollowerPage'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {path:'/', element: <HomePage /> },
      {path:'post/:id',element:<PostDetailPage /> },
      {path:'/:username',element:<ProfilePage /> },
      {path:'user/:id/follower',element:<FollowerPage /> },
      {path:'mylist', element: <SavedPosts /> },
    ]
  },
  {path:'new-blog', element:<CreateBlogPage /> },
  {path:'user/signin',element:<LoginPage /> },
  {path:'user/signup',element:<LoginPage /> },
  {
    path:'*',
    element:<Errorpage />
  }
])


const App = () => {
  return <RouterProvider router={router} />
}

export default App