import React, { useState } from 'react'

const CreateBlogPage = () => {

  const [title, setTile] = useState("");
  const [body, setBody] = useState("");

  const handleTitleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
    setTile(textarea.value)
  }

  const handleBodyeInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
    setBody(textarea.value); 
  }

  return ( 
    <div className='px-2 min-w-screen min-h-screen '>
      <div className='m-auto max-w-[600px] '>
        <nav className='w-full h-16 px-4 bg-white bg-opacity-55 backdrop-blur-sm flex flex-row justify-between items-center 
            border-b-[1px]  sticky top-0 left-0 z-20'>
          <div className='bg-red-300'>logo image</div>
          <div className='flex items-center '>
            <div className=' flex items-center h-8 px-4 cursor-pointer bg-blue-400 rounded-3xl text-white 
                font-semibold hover:shadow-md hover:scale-105 '>Post</div>
          </div>
        </nav>

        <div className=' mt-8 p-4'>
          <div className=' mb-3 p-2'>
            <textarea className="w-full border-none resize-none overflow-hidden outline-none text-3xl font-semibold bg-transparent"
            placeholder="Title" name='title' value={title} onChange={handleTitleInput} />
          </div>

          <div className=' p-2 pt-5 border-t-[1px]'>
            <textarea className="w-full  border-none resize-none overflow-hidden outline-none text-2xl bg-transparent"
            placeholder="body" name='body' value={body} onChange={handleBodyeInput} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBlogPage