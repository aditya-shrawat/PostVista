import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CommentItem from './CommentItem';
import { IoIosSend } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";

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
            console.log("Error in fetching Comments -",error);
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
            console.log("Error in posting Comments -",error);
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
    <div className='w-full h-auto mt-7 '>
        <h1 className=' text-2xl font-bold'>{`Comments (${commentCount}) `}</h1>
        <div className=' p-2 px-3 py-10 border-b-[1px] '>
            <div className='w-full h-12 p-2 flex text-lg rounded-lg shadow-[0px_0px_18px_rgba(0,_0,_0,_0.3)] '>
                <input onChange={(e)=>handleInput(e)} value={commentContent} type="text" name='commentFeild' placeholder='Write your comment...' 
                className='w-full h-full  border-none outline-none mr-4  ' />
                <button onClick={postComments} className={`flex items-center font-semibold cursor-pointer bg-green-500 text-white px-3  rounded-md`}>
                    <span className='sm:block hidden mr-2' >Reply</span><FaLocationArrow className=' text-lg' />
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