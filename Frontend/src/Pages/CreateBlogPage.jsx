import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const initialPostData = {
  title:"",
  body:"",
}
const CreateBlogPage = () => {

  const [postData,setPostData]= useState(initialPostData) ;
  const [title, setTile] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault() ;

    if(postData.title.trim()==='' || postData.body.trim()===''){
      alert("All felds are required") ;
    }
    else{
      const BackendURL = import.meta.env.VITE_backendURL;
      axios.post(`${BackendURL}/new-blog`,postData,{ withCredentials: true })
      .then(response=>{
        if(response.status === 201){
          navigate('/');
        }
      })
      .catch(error=>{
        if(error.response && error.response.data.message){
          console.log("error :",error.response.data.message)
        }
        else{
          console.log("error :",error) ;
        }
      })
    }
  }

  const handleTitleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
    setPostData({...postData,[e.target.name]:e.target.value});
  }

  const handleBodyeInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
    setPostData({...postData,[e.target.name]:e.target.value});
  }

  return ( 
    <div className='px-2 min-w-screen min-h-screen '>
      <div className='m-auto max-w-[600px] '>
        <nav className='w-full h-16 px-4 bg-white bg-opacity-55 backdrop-blur-sm flex flex-row justify-between items-center 
            border-b-[1px]  sticky top-0 left-0 z-20'>
          <div className='bg-red-300'>logo image</div>
          <div className='flex items-center '>
            <div onClick={handleSubmit} className=' flex items-center h-8 px-4 cursor-pointer bg-blue-400 rounded-3xl text-white 
                font-semibold hover:shadow-md hover:scale-105 '>Post</div>
          </div>
        </nav>

        <div className=' mt-8 p-4'>
          <div className=' mb-3 p-2'>
            <textarea className="w-full border-none resize-none overflow-hidden outline-none text-3xl font-semibold bg-transparent"
            placeholder="Title" name='title' value={postData.title} onChange={handleTitleInput} />
          </div>

          <div className=' p-2 pt-5 border-t-[1px]'>
            <textarea className="w-full  border-none resize-none overflow-hidden outline-none text-2xl bg-transparent"
            placeholder="body" name='body' value={postData.body} onChange={handleBodyeInput} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBlogPage