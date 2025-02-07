import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


const EditProfileComponent = ({setEdit,userDetails,setIsProfileUpdated}) => {
    const [newProfileInfo,setNewProfileInfo] = useState({}) ;
    const divRef = useRef(null)

    useEffect(()=>{
        if(userDetails){
            setNewProfileInfo(userDetails);
        }
    },[userDetails]);
    const handleNameInput = (e) => {
        setNewProfileInfo({...newProfileInfo,[e.target.name]:e.target.value});
    }

    const handleBioInput = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto"; 
        textarea.style.height = `${textarea.scrollHeight}px`; 
        setNewProfileInfo({...newProfileInfo,[e.target.name]:e.target.value});
    }

    useEffect(()=>{
        const handleOutsideClick = (e)=>{
            if( divRef.current && !divRef.current.contains(e.target) ){
                setEdit(false);
            }
        }

        document.addEventListener('mousedown',handleOutsideClick) ;

        return ()=>{
            document.removeEventListener('mousedown',handleOutsideClick)
        }
    },[setEdit]);

    const updateUserInfo = async (e)=>{
        e.preventDefault() ;
        try {
            const BackendURL = import.meta.env.VITE_backendURL;
            await axios.put(`${BackendURL}/${userDetails.username}`,newProfileInfo,{withCredentials:true,});
            setIsProfileUpdated(true) ;
        } catch (error) {
            console.log("Error in updating user info -",error) ;
        }
    }

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-transparent z-20 fixed top-0 left-0 bg-black bg-opacity-15 backdrop-blur-sm ">
        <div ref={divRef} className=" max-w-[95%] md:max-w-lg w-full sm:max-w-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
            <div className="w-full p-5 py-10 bg-white border-2 border-gray-300 rounded-xl">
                <div className="w-full h-36 flex items-center ">
                    <div>
                        <div className="mr-6 sm:mr-8 sm:h-32 sm:w-32 h-24 w-24 bg-green-500 rounded-full cursor-pointer "></div>
                    </div>
                    <div className="w-auto h-full">
                        <div className="h-full w-full flex flex-col justify-center">
                            <p className="text-base mb-3">Update profile picture</p>
                            <div className="flex ">
                                <button className="cursor-pointer text-green-500 hover:text-green-700 mr-10 outline-none border-none">
                                    Update
                                </button>
                                <button className="cursor-pointer text-red-500 hover:text-red-700 outline-none border-none">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    (!newProfileInfo)?
                    <></>:
                    <>
                    <form className="w-full ">
                        <div className="w-full text-lg my-6">
                            <label name="name" className="w-full font-semibold ">
                                Name
                            </label>
                            <input onChange={(e)=>{handleNameInput(e)}} name="name" value={newProfileInfo.name || ''} type="text" placeholder="Enter new name" 
                                className="w-full mt-2 p-2 outline-blue-500 border-2 rounded-lg "/>
                        </div>
                        <div className="w-full text-lg my-6">
                            <label name="bio" className="w-full font-semibold ">
                                Bio
                            </label>
                            <textarea onChange={(e)=>{handleBioInput(e)}} name="bio"type="text" value={newProfileInfo.bio || ''} placeholder="Enter new bio" 
                                className="w-full resize-none overflow-hidden mt-2 p-2 outline-blue-500 border-2 rounded-lg "/>
                        </div>
                    </form>
                    </>
                }
                <div className="w-full flex justify-evenly">
                    <button onClick={()=>{setEdit(false)}} className="border-2 border-blue-500 outline-none bg-transparent
                    hover:text-blue-400 px-6 py-1 text-lg text-blue-500 font-semibold cursor-pointer rounded-3xl">
                    Cancel
                    </button>
                    <button onClick={updateUserInfo} className="outline-none bg-blue-500 hover:bg-blue-400 px-6 py-1 text-lg text-white font-semibold 
                        cursor-pointer rounded-3xl">Save
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default EditProfileComponent;
