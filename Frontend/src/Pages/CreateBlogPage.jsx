import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiSolidImageAdd } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";


const initialPostData = {
  title:"",
  body:"",
}
const CreateBlogPage = () => {

  const [postData,setPostData]= useState(initialPostData) ;
  const navigate = useNavigate();
  const fileInputRef = useRef() ;
  const [previewPostImg,setPreviewPostImage] = useState(null);
  const [postImage,setPostImage] = useState(null) ;

  const handleSubmit = async (e)=>{
    e.preventDefault() ;

    if(postData.title.trim()==='' || postData.body.trim()===''){
      alert("All felds are required") ;
      return ;
    }
    
      const formData = new FormData() ;
      formData.append('coverImage',postImage) ;
      formData.append('title',postData.title) ;
      formData.append('body',postData.body) ;

      const BackendURL = import.meta.env.VITE_backendURL;
      axios.post(`${BackendURL}/new-blog`,formData,{ withCredentials: true })
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

  const handleUpload = (e)=>{
    e.preventDefault();
    fileInputRef.current.click();
  }

  const handlefileChange = (e)=>{
    const file = e.target.files[0];
    if(file){
      setPostImage(file);
      setPreviewPostImage(URL.createObjectURL(file)) ;
    }
  }

  const removePostImage = (e)=>{
    e.preventDefault();
    setPostImage(null);
    setPreviewPostImage(null) ;
  }

  return ( 
    <div className=' w-full min-h-screen '>
      <nav className='w-full h-16 px-4 bg-white dark:bg-black bg-opacity-55 backdrop-blur-sm flex flex-row justify-between items-center 
            border-b-[1px] dark:border-gray-500  sticky top-0 left-0 z-20'>
          <div className='bg-red-300'>logo image</div>
          <div className='flex items-center '>
            <div onClick={handleSubmit} className=' flex items-center h-8 px-6 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-3xl text-white 
                font-semibold shadow-md scale-105 '>Post</div>
          </div>
        </nav>
      <div className='m-auto w-full max-w-screen-lg px-2'>
        

        <div className=' mt-8 py-4 flex flex-col '>
          <div className=' mb-0 p-2'>
            <textarea className="w-full border-none resize-none overflow-hidden outline-none text-3xl md:text-5xl font-semibold bg-transparent font-plex"
            placeholder="Title" name='title' value={postData.title} onChange={handleTitleInput} />
          </div>

          <div className='w-full flex md:hidden px-2 mb-2 '>
            { (previewPostImg===null) && 
            <div>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handlefileChange} className="hidden " />
              <BiSolidImageAdd onClick={handleUpload} className='text-3xl text-gray-500 ' />
            </div>
            }
          </div>

          <div className='w-full p-2 mb-2 relative ' >
            { (previewPostImg !== null) && 
              <div className='w-full overflow-hidden'>
                <img src={previewPostImg} className='h-full w-full object-cover' />
              </div>
            }
            { (previewPostImg !== null) && 
              <div onClick={removePostImage}
                className=' bg-white dark:bg-black absolute top-4 right-4 cursor-pointer h-8 w-8 flex justify-center items-center text-gray-500' >
                <RxCrossCircled className='text-3xl ' />
              </div>
            }
          </div>

          <div className=' p-2 pt-5 border-t-[1px] dark:border-gray-500 relative'>
            <textarea className="w-full  border-none resize-none overflow-hidden outline-none text-2xl bg-transparent font-serif2"
            placeholder="body" name='body' value={postData.body} onChange={handleBodyeInput} style={{ whiteSpace: 'pre-wrap' }}  />

            {(previewPostImg===null) && 
            <div onClick={handleUpload} className=' absolute -left-12 top-5 hidden md:block '>
              <IoIosAddCircleOutline className='text-4xl text-gray-500' />
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBlogPage