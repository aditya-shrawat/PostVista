import React,{lazy,Suspense} from 'react'

import Layout from './Components/Layout'
import ErrorPage from './Pages/ErrorPage'
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
import SettingsPage from './Pages/SettingsPage';
import SearchPage from './Pages/SearchPage';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RequireAuth from './Components/RequireAuth';


const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children:[
      {path:'/', element: <Suspense fallback={<Loading />}><HomePage /></Suspense> },
      {path:'user/:id/follower',element: <Suspense fallback={<Loading />}><FollowerPage /></Suspense> },
      {path:'user/:id/following',element: <Suspense fallback={<Loading />}><FollowerPage /></Suspense> },
      {path:'/my/bookmarks', element: <Suspense fallback={<Loading />}><SavedPosts /></Suspense>},
    ]
  },
  {path:'/:username',element:(<RequireAuth> <Suspense fallback={<Loading />}><ProfilePage /></Suspense> </RequireAuth> )},
  {path:'/post/:id',element:(<RequireAuth> <Suspense fallback={<Loading />}><PostDetailPage /></Suspense> </RequireAuth>)},
  { path: '/settings', element:(<RequireAuth> <Suspense fallback={<Loading />}><SettingsPage /></Suspense> </RequireAuth>)},
  {path:'/settings/:contentType', element:(<RequireAuth> <Suspense fallback={<Loading />}><SettingsPage /></Suspense> </RequireAuth>)},
  {path:'new-blog', element:(<RequireAuth> <Suspense fallback={<Loading />}><CreateBlogPage /></Suspense> </RequireAuth>)},
  {path:'user/signin',element: <SigninPage /> },
  {path:'user/signup',element: <SignupPage /> },
  {path:'/search',element:(<RequireAuth> <Suspense fallback={<Loading />}><SearchPage /></Suspense> </RequireAuth>)},
  {
    path:'*',
    element:<ErrorPage />
  }
])


const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    
    {/* to add toast notification */}
    <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false}
    closeOnClick pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" />
    </>
  )
}

export default App