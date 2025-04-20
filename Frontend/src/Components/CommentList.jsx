import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CommentItem from './CommentItem';
import { FaLocationArrow } from "react-icons/fa";
import { toast } from 'react-toastify';
import { CustomThemeContext} from '../Contexts/CustomThemeProvider'

const commentList = ({postId}) => {
    const [Comments,setComments] = useState([]) ;
    const [commentCount,setCommentCount] = useState(0) ;
    const [commentContent,setCommentContent] = useState('') ;

    const fetchComments = async ()=>{
        try {
            const BackendURL = import.meta.env.VITE_backendURL;
            const response = await axios.get(`${BackendURL}/post/${postId}/comment`,{withCredentials:true}) ;
            setComments(response.data.allComments) ;
            setCommentCount(response.data.commentCount) ;
        } catch (error) {
            console.log("Error in fetching Comments.");
        }
    }

    const postComments = async (e)=>{
        e.preventDefault() ;
        try {
            const BackendURL = import.meta.env.VITE_backendURL;
            const response = await axios.post(`${BackendURL}/post/${postId}/comment`,{content:commentContent},{withCredentials:true}) ;
            setCommentContent('')
            fetchComments()
        } catch (error) {
            toast.error("Unable to post comment. Please try again.",{
                theme: (theme==='dark')?"dark" : "light",
            })
        }
    }

    const handleInput = (e)=>{
        e.preventDefault() ;
        setCommentContent(e.target.value) ;
    };

    useEffect(()=>{
        fetchComments();
    },[]);


  return (
    <div className='w-full h-auto mt-4 px-2'>
        <h1 className=' text-2xl font-bold font-plex'>{`Comments (${commentCount}) `}</h1>
        <div className='  py-8 border-b-[1px] dark:border-gray-500 '>
            <div className='w-full h-12 p-2 flex text-lg rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.3)] dark:shadow-[0px_0px_10px_rgba(252,252,252,0.5)] '>
                <input onChange={(e)=>handleInput(e)} value={commentContent} type="text" name='commentFeild' placeholder='Write your comment...' 
                className='w-full h-full dark:bg-black border-none outline-none mr-4  ' />
                <button onClick={postComments} className={`flex items-center outline-none font-semibold cursor-pointer bg-[#6356E5] text-white px-3  rounded-md`}>
                    <span className='sm:block hidden mr-2 font-plex' >Reply</span><FaLocationArrow className=' text-lg' />
                </button>
            </div>
        </div>
        <div className='mt-4'>
        {
            (Comments.length === 0)?
            <>
            </>:
            <>
            { Comments.map((comment)=>{
            return <CommentItem key={comment._id} comment={comment} />
            }) }
            </>
        }
        </div>
    </div>
  )
}

export default commentList