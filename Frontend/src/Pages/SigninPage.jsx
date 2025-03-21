import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const initialsignInData = {
    email:'',
    password:'',
}

const SigninPage = () => {
    const navigate = useNavigate()

    const [errorMsg,setErrorMsg] = useState('') ;
    const [signInData,setSignInData] = useState(initialsignInData)

    const onSigninInputChange = (e)=>{
        setSignInData({...signInData,[e.target.name]:e.target.value}) ; 
    }

    const handleSignInSubmit = (e)=>{
        e.preventDefault();

        const BackendURL = import.meta.env.VITE_backendURL // backend url 
        axios.post(`${BackendURL}/user/signin`,signInData, { withCredentials: true })
        .then(response =>{
            if(response.status===200){
                navigate('/'); // redirected to home page 
            }
        })
        .catch(error =>{
            if(error.response && error.response.data.message){
                setErrorMsg(error.response.data.message) ;
            }
            else{
                setErrorMsg("Something went wrong, please try again")
            }
        })
    }

  return (
    <div className='h-screen w-screen'>
        <div className='md:w-96 w-80 p-4 py-8 rounded-lg bg-white dark:bg-black absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] dark:shadow-[0px_0px_10px_rgba(252,252,252,0.5)]'>
            <div className='w-full text-center font-bold text-3xl text-blue-400 mb-6'><p>Sign in</p></div>
            <form onSubmit={handleSignInSubmit} className='flex flex-col'>
                <label className='mb-1 ' >Email</label>
                <input type="email" name='email' onChange={(e)=>{onSigninInputChange(e)}} value={signInData.email}
                className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-[1px] dark:border-gray-500 outline-blue-400 dark:bg-black' />
                <label className='mb-1 ' >Password</label>
                <input type="password" name='password' onChange={(e)=>{onSigninInputChange(e)}} value={signInData.password}
                className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-[1px] dark:border-gray-500 outline-blue-400 dark:bg-black' />
                {errorMsg!=='' && <div className='text-red-500 px-2' >{errorMsg}</div> }
                <button type='submit' className='bg-blue-400 my-5 h-12 rounded-3xl cursor-pointer text-xl text-white font-semibold hover:shadow-lg' >Sign in</button>
                <div className='w-full text-center text-base'>
                    <p className='mb-5'>OR</p>
                    <p>No account?
                        <span onClick={()=>{navigate('/user/signup')}} className='hover:underline font-bold text-blue-800 cursor-pointer'>Create account</span>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SigninPage