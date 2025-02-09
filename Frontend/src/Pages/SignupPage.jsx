import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const initialSignUpData = {
    email:'',
    password:'',
    confirmPassword:'',
    name:'',
}
const SignupPage = () => {
    const navigate = useNavigate()

    const [errorMsg,setErrorMsg] = useState('') ;
    const [signupData,setSignupData] = useState(initialSignUpData)
    const [passwordError,setpasswordError] = useState('');
    const [nextSlide,setNextSlide] = useState(false);

    const onSignupInputChange = (e)=>{
        setSignupData({...signupData,[e.target.name]:e.target.value}) ;
    }

    const checkPasswordLength  = ()=>{
        if(signupData.password.length < 8){
            setpasswordError('Password must be at least 8 characters!');
        }
    };
    useEffect(()=>{
        if(signupData.password.length > 0 && signupData.password.length < 8 ){
            checkPasswordLength()
        }
        else{
            setpasswordError('');
        }
    },[signupData.password]);

    const isPassAndConfirmpassSame = ()=>{
        if(signupData.password !== signupData.confirmPassword){
            setErrorMsg("Password is not same.");
            return false;
        }
        setErrorMsg('');
        return true;
    }

    const handleSignupSubmit = (e)=>{
        e.preventDefault();
        if(!isPassAndConfirmpassSame()){
            return ;
        }

        const BackendURL = import.meta.env.VITE_backendURL 
        axios.post(`${BackendURL}/user/check-email`,{email:signupData.email,password:signupData.confirmPassword}, 
            { withCredentials: true })
        .then(response =>{
            if(response.status===200){ 
                setNextSlide(true) ;
            }
        })
        .catch(error =>{
            if(error.response && error.response.data.error){
                setErrorMsg(error.response.data.error) ;
            }
            else{
                setErrorMsg("Something went wrong, please try again")
            }
        })
    }

    const createAccount = async (e)=>{
        e.preventDefault();

        const BackendURL = import.meta.env.VITE_backendURL
        axios.post(`${BackendURL}/user/create-account`,{email:signupData.email,password:signupData.confirmPassword,name:signupData.name}, 
        { withCredentials: true })
        .then(response =>{
            if(response.status===201){
                navigate('/');
            }
        })
        .catch(error =>{
            if(error.response && error.response.data.error){
                setErrorMsg(error.response.data.error) ;
            }
            else{
                setErrorMsg("Something went wrong, please try again")
            }
        })
    }

  return (
    <div className='h-screen w-screen'>
        <div className='md:w-96 w-80 p-4 py-8 rounded-lg bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[0px_5px_20px_rgba(0,0,0,0.2)]'>
            <div className='w-full text-center font-bold text-3xl text-blue-400 mb-6'>
                <p>{(!nextSlide)?'Sign up':'Almost there!'}</p>
            </div>
            {
                (!nextSlide)?
                <>
                <form onSubmit={handleSignupSubmit} className='flex flex-col'>
                    <label className='mb-1 ' >Email</label>
                    <input type="email" name='email' onChange={(e)=>{onSignupInputChange(e)}} value={signupData.email}
                    className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400' />
                    <label className='mb-1 ' >Password</label>
                    <div className='mb-4 w-full'>
                        <input type="password" name='password' onChange={(e)=>{onSignupInputChange(e)}}  value={signupData.password}
                        className='h-10 w-full p-1 px-2 text-lg rounded-lg border-2 outline-blue-400' />
                        {passwordError!=='' && <div className='text-red-500 px-2' >{passwordError}</div> }
                    </div>
                    <label className='mb-1 ' >Confirm password</label>
                    <input type="password" name='confirmPassword' onChange={(e)=>{onSignupInputChange(e)}} value={signupData.confirmPassword}
                    className='mb-4 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400' />
                    {errorMsg!=='' && <div className='text-red-500 px-2' >{errorMsg}</div> }
                    <button type='submit' className='bg-blue-400 my-5 h-12 rounded-3xl cursor-pointer text-xl text-white font-semibold hover:shadow-lg' >Sign up</button>
                    <div className='w-full text-center text-base'>
                        <p className='mb-5'>OR</p>
                        <p>Already have an account?
                            <span onClick={()=>{navigate('/user/signin')}} className='hover:underline font-bold text-blue-800 cursor-pointer' >Sign in</span>
                        </p>
                    </div>
                </form>
                </>:
                <>
                <div>
                    <div className='w-full text-base font-semibold mb-8 text-center '>
                        <p>Finish creating your account by choosing a display name.</p>
                    </div>
                    <form onSubmit={createAccount} className='flex flex-col'>
                        <label className='mb-1 ' >Full name</label>
                        <input type="text" name='name' onChange={(e)=>{onSignupInputChange(e)}} value={signupData.name}
                        className='mb-2 h-10 p-1 px-2 text-lg rounded-lg border-2 outline-blue-400' />
                        {errorMsg!=='' && <div className='text-red-500 px-2 mt-2' >{errorMsg}</div> }
                        <div className='flex mt-2 mb-3'>
                            <p className='font-semibold'>Email:</p>
                            <p className='ml-1'>{signupData.email}</p>
                        </div>
                        <button type='submit' className='bg-blue-400 my-5 h-12 rounded-3xl cursor-pointer text-xl
                        text-white font-semibold hover:shadow-lg' >Create account</button>
                    </form>
                </div>
                </>
            }
        </div>
    </div>
  )
}

export default SignupPage