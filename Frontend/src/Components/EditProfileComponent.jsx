import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


const EditProfileComponent = ({setEdit,userDetails,setIsProfileUpdated}) => {
    const [newProfileInfo,setNewProfileInfo] = useState({}) ;
    const [initialInfo,setInitialInfo] = useState({});
    const [saveBtnStatus,setSaveBtnStatus] = useState(false) ;
    const divRef = useRef(null)
    const fileInputRef = useRef(null) ;
    const [newProfilePic,setNewProfilePic] = useState(null) ;
    const [previewPfp,setPreviewPfp] = useState(null) ;
    const [isProfileInfoChanged,setIsProfileInfoChanged] = useState(false) ;
    const [defaultProfilePic,setDefaultProfilePic] = useState('https://res.cloudinary.com/dmeaz48sd/image/upload/v1740665174/defaultProfilePic_qjozwa.jpg');
    const [removeProfilePic,setRemoveProfilePic] = useState(false) ;

    useEffect(()=>{
        if(userDetails){
            setNewProfileInfo(userDetails);
            setInitialInfo(userDetails) ;
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

    useEffect(() => {
        if(newProfileInfo.name ==='' && newProfileInfo.bio ===''){
            setSaveBtnStatus(false);
        }
        else{
            setIsProfileInfoChanged(JSON.stringify(initialInfo) !== JSON.stringify(newProfileInfo)) ;
            setSaveBtnStatus(
                (JSON.stringify(initialInfo) !== JSON.stringify(newProfileInfo)) || newProfilePic || removeProfilePic
            );
        }
    }, [newProfileInfo, initialInfo,newProfilePic,removeProfilePic]);

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
            setEdit(false);
            const BackendURL = import.meta.env.VITE_backendURL;

            if(newProfilePic || removeProfilePic){ // only update profile pic not user information
                const formData = new FormData() ;
                if (newProfilePic) {
                    formData.append('ProfilePic', newProfilePic);
                }
                formData.append('removeProfilePic',removeProfilePic);

                await axios.put(`${BackendURL}/${userDetails.username}/profile-picture`,formData,{withCredentials:true, headers:{'Content-Type':'multipart/form-data'}});
            }

            if(isProfileInfoChanged){ // only update the user information , not profile picture 
                await axios.put(`${BackendURL}/${userDetails.username}`,newProfileInfo,{withCredentials:true,});
            }

            setIsProfileUpdated(true) ;
        } catch (error) {
            console.log("Error in updating user info -",error) ;
        }
    }

    const handleUpdateClick = (e)=>{
        e.preventDefault();
        fileInputRef.current.click() ;
    }

    const handlefileChange = (e)=>{
        const file = e.target.files[0];
        setRemoveProfilePic(false);
        if(file){
            setNewProfilePic(file);
            setPreviewPfp(URL.createObjectURL(file));
        }
    }

    const handleRemoveClick = (e)=>{
        e.preventDefault();
        setRemoveProfilePic(true) ;
        setNewProfilePic(null);
        setPreviewPfp(defaultProfilePic) ;
    }

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-transparent z-20 fixed top-0 left-0 bg-black bg-opacity-15 backdrop-blur-sm ">
        <div ref={divRef} className=" max-w-[95%] md:max-w-lg w-full sm:max-w-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
            <div className="w-full p-5 py-6 bg-white dark:bg-black border-[1px] border-gray-300 dark:border-gray-500 rounded-xl">
                <div className="w-full h-36 flex items-center ">
                    <div>
                        <div className="mr-6 sm:mr-8 sm:h-32 sm:w-32 h-24 w-24 rounded-full cursor-pointer overflow-hidden">
                            <img src={(previewPfp !== null)? previewPfp : newProfileInfo.profilePicURL} className="h-full w-full object-cover" />
                        </div>
                    </div>
                    <div className="w-auto h-full">
                        <div className="h-full w-full flex flex-col justify-center font-plex">
                            <p className="text-base mb-3">Change profile picture</p>
                            <div className="flex ">
                                <div>
                                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handlefileChange} className="hidden " />
                                    <button onClick={handleUpdateClick} className="cursor-pointer px-3 font-semibold text-green-500 mr-10 outline-none ">
                                        Update
                                    </button>
                                </div>
                                <div>
                                    <button onClick={handleRemoveClick} className="cursor-pointer px-3 font-semibold text-red-500 outline-none ">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    (!newProfileInfo)?
                    <></>:
                    <>
                    <form className="w-full font-plex">
                        <div className="w-full text-lg my-6">
                            <label name="name" className="w-full text-gray-500 ">
                                Name
                            </label>
                            <input onChange={(e)=>{handleNameInput(e)}} name="name" value={newProfileInfo.name || ''} type="text" placeholder="Enter new name" 
                                className="w-full mt-2 p-2 outline-none border-[1px] dark:border-gray-500 dark:bg-black rounded-lg "/>
                        </div>
                        <div className="w-full text-lg my-6">
                            <label name="bio" className="w-full text-gray-500 ">
                                Bio
                            </label>
                            <textarea onChange={(e)=>{handleBioInput(e)}} name="bio"type="text" value={newProfileInfo.bio || ''} placeholder="Enter new bio" 
                                className="w-full resize-none overflow-hidden mt-2 p-2 outline-none border-[1px] rounded-lg dark:bg-black dark:border-gray-500 "/>
                        </div>
                    </form>
                    </>
                }
                <div className="w-full flex justify-evenly">
                    <button onClick={()=>{setEdit(false)}} className="border-2 dark:border-gray-500 outline-none bg-transparent
                    px-6 py-1 text-lg font-semibold cursor-pointer rounded-3xl">
                    Cancel
                    </button>
                    <button onClick={updateUserInfo} className={`outline-none px-6 py-1 text-lg text-white font-semibold 
                         rounded-3xl ${saveBtnStatus?`bg-[#6356E5] hover:bg-[#7166e5] cursor-pointer`:`bg-[#7166e5] cursor-not-allowed`} `} 
                        disabled={!saveBtnStatus}>Save
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default EditProfileComponent;
