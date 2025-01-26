import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'


const initialSignUpData = {
    username:'',
    email:'',
    password:'',
}

const initialsignInData = {
    email:'',
    password:'',
}

const LoginPage = () => {
    const navigate = useNavigate()

    const [account,setAccount] = useState('Sign in') ;
    const [errorMsg,setErrorMsg] = useState('') ;
    const [signupData,setSignupData] = useState(initialSignUpData)
    const [signInData,setSignInData] = useState(initialsignInData)

    const toggleAccount = ()=>{
        if(account==='Sign in'){
            setAccount('Sign up');
        }
        else{
            setAccount('Sign in');
        }
        setErrorMsg('');
    }

    const onSignupInputChange = (e)=>{
        setSignupData({...signupData,[e.target.name]:e.target.value}) ; // saving data saperately 
    }

    const onSigninInputChange = (e)=>{
        setSignInData({...signInData,[e.target.name]:e.target.value}) ; // saving data saperately 
    }

    const handleSignupSubmit = (e)=>{
        e.preventDefault();

        const BackendURL = import.meta.env.VITE_backendURL // backend url 
        axios.post(`${BackendURL}/user/signup`,signupData, { withCredentials: true })
        .then(response =>{
            if(response.status===201){
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
        <div className='md:w-96 w-80 p-4 py-8 rounded-lg bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[0px_5px_20px_rgba(0,0,0,0.2)]'>
            <div className='w-full text-center font-bold text-3xl text-blue-400 mb-6'><p>{account}</p></div>
        {
            (account==='Sign in')?
            <>
            <form onSubmit={handleSignInSubmit} className='flex flex-col'>
                <label className='mb-1 ' >Email</label>
                <input type="email" name='email' onChange={(e)=>{onSigninInputChange(e)}} value={signInData.email}
                className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400' />
                <label className='mb-1 ' >Password</label>
                <input type="password" name='password' onChange={(e)=>{onSigninInputChange(e)}} value={signInData.password}
                className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400 ' />
                {errorMsg && <div className='text-red-500 px-2' >{errorMsg}</div> }
                <button type='submit' className='bg-blue-400 my-5 h-12 rounded-3xl cursor-pointer text-xl text-white font-semibold hover:shadow-lg' >Sign in</button>
                <div className='w-full text-center text-base'>
                    <p className='mb-5'>OR</p>
                    <p>No account?
                        <Link to={'/user/signup'} onClick={toggleAccount} className='hover:underline font-bold text-blue-800'>Create account</Link>
                    </p>
                </div>
            </form>
            </> :
            <>
            <form onSubmit={handleSignupSubmit} className='flex flex-col'>
                <label className='mb-1 ' >Username</label>
                <input type="text" name='username' onChange={(e)=>{onSignupInputChange(e)}} value={signupData.username}
                className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400' />
                <label className='mb-1 ' >Email</label>
                <input type="email" name='email' onChange={(e)=>{onSignupInputChange(e)}} value={signupData.email}
                className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400' />
                <label className='mb-1 ' >Password</label>
                <input type="password" name='password' onChange={(e)=>{onSignupInputChange(e)}}  value={signupData.password}
                className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400' />
                {errorMsg && <div className='text-red-500 px-2' >{errorMsg}</div> }
                <button type='submit' className='bg-blue-400 my-5 h-12 rounded-3xl cursor-pointer text-xl text-white font-semibold hover:shadow-lg' >Sign up</button>
                <div className='w-full text-center text-base'>
                    <p className='mb-5'>OR</p>
                    <p>Already have an account?
                        <Link to={'/user/signin'} onClick={toggleAccount} className='hover:underline font-bold text-blue-800' >Sign in</Link>
                    </p>
                </div>
            </form>
            </>
        }
        </div>
    </div>
  )
}

export default LoginPage