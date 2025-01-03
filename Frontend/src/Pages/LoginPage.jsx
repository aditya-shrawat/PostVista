import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'


const initialSignUpData = {
    username:'',
    email:'',
    password:'',
}

const LoginPage = () => {
    const navigate = useNavigate()

    const [account,setAccount] = useState('Login') ;
    const [signupData,setSignupData] = useState(initialSignUpData)

    const toggleAccount = ()=>{
        account==='Login'?setAccount('Signup'):setAccount('Login') ;
    }

    const onInputChange = (e)=>{
        setSignupData({...signupData,[e.target.name]:e.target.value}) ; // saving data saperately 
    }

    const handleSignupSubmit = (e)=>{
        e.preventDefault();

        const BackendURL = import.meta.env.VITE_backendURL // backend url 
        axios.post(`${BackendURL}/user/signup`,signupData)
        .then(response =>{
            if(response.status===200){
                navigate('/'); // redirected to home page 
            }
        })
        .catch(error =>console.log("error ",error))
    }

  return (
    <div className='h-screen w-screen'>
        <div className='md:w-96 w-80 p-4 py-8 rounded-lg bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[0px_5px_20px_rgba(0,0,0,0.2)]'>
            <div className='w-full text-center font-bold text-3xl text-blue-400 mb-6'><p>{account}</p></div>
        {
            (account==='Login')?
            <>
            <form className='flex flex-col'>
                <label className='mb-1 ' >Email</label>
                <input type="email" name='email' className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400' />
                <label className='mb-1 ' >Password</label>
                <input type="password" name='password' className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400 ' />
                <button type='submit' className='bg-blue-400 my-5 h-12 rounded-3xl cursor-pointer text-xl text-white font-semibold hover:shadow-lg' >Login</button>
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
                <input type="text" name='username' onChange={(e)=>{onInputChange(e)}} className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400' />
                <label className='mb-1 ' >Email</label>
                <input type="email" name='email' onChange={(e)=>{onInputChange(e)}} className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400' />
                <label className='mb-1 ' >Password</label>
                <input type="password" name='password' onChange={(e)=>{onInputChange(e)}} className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400' />
                <button type='submit' className='bg-blue-400 my-5 h-12 rounded-3xl cursor-pointer text-xl text-white font-semibold hover:shadow-lg' >Signup</button>
                <div className='w-full text-center text-base'>
                    <p className='mb-5'>OR</p>
                    <p>Already have an account?
                        <Link to={'/user/login'} onClick={toggleAccount} className='hover:underline font-bold text-blue-800' >Signin</Link>
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