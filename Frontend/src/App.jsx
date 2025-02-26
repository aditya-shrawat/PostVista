import React,{lazy,Suspense} from 'react'

import Layout from './Components/Layout'
import Errorpage from './Pages/Errorpage'
const HomePage = lazy(()=>import('./Pages/HomePage')) ;
const PostDetailPage = lazy(()=>import('./Pages/PostDetailPage'));
const ProfilePage = lazy(()=>import('./Pages/ProfilePage'))

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Loading from './Pages/Loading';
const SavedPosts = lazy(()=>import('./Pages/SavedPosts')) 
const CreateBlogPage = lazy(()=>import('./Pages/CreateBlogPage')) 
const FollowerPage = lazy(()=>import('./Pages/FollowerPage')) 
import SignupPage from './Pages/SignupPage' 
import SigninPage from './Pages/SigninPage' 


const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {path:'/', element: <Suspense fallback={<Loading />}><HomePage /></Suspense> },
      {path:'post/:id',element: <Suspense fallback={<Loading />}><PostDetailPage /></Suspense> },
      {path:'/:username',element: <Suspense fallback={<Loading />}><ProfilePage /></Suspense> },
      {path:'user/:id/follower',element: <Suspense fallback={<Loading />}><FollowerPage /></Suspense> },
      {path:'user/:id/following',element: <Suspense fallback={<Loading />}><FollowerPage /></Suspense> },
      {path:'/my/bookmarks', element: <Suspense fallback={<Loading />}><SavedPosts /></Suspense>},
    ]
  },
  {path:'new-blog', element: <Suspense fallback={<Loading />}><CreateBlogPage /></Suspense> },
  {path:'user/signin',element: <SigninPage /> },
  {path:'user/signup',element: <SignupPage /> },
  {
    path:'*',
    element:<Errorpage />
  }
])


const App = () => {
  return <RouterProvider router={router} />
}

export default App