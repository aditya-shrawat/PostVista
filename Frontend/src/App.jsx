import React from 'react'
import Layout from './Components/Layout'
import HomePage from './Pages/HomePage'
import PostDetailPage from './Pages/PostDetailPage'
import ProfilePage from './Pages/ProfilePage'
import Errorpage from './Pages/Errorpage'
import LoginPage from './Pages/SigninPage'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SavedPosts from './Pages/SavedPosts'
import CreateBlogPage from './Pages/CreateBlogPage'
import FollowerPage from './Pages/FollowerPage'
import SignupPage from './Pages/SignupPage'
import SigninPage from './Pages/SigninPage'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {path:'/', element: <HomePage /> },
      {path:'post/:id',element:<PostDetailPage /> },
      {path:'/:username',element:<ProfilePage /> },
      {path:'user/:id/follower',element:<FollowerPage /> },
      {path:'user/:id/following',element:<FollowerPage /> },
      {path:'mylist', element: <SavedPosts /> },
    ]
  },
  {path:'new-blog', element:<CreateBlogPage /> },
  {path:'user/signin',element:<SigninPage /> },
  {path:'user/signup',element:<SignupPage /> },
  {
    path:'*',
    element:<Errorpage />
  }
])


const App = () => {
  return <RouterProvider router={router} />
}

export default App