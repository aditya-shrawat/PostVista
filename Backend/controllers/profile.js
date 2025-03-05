
import fs from 'fs' ;
import User from '../model/user.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.Cloudinary_CloudName , 
    api_key: process.env.Cloudinary_API , 
    api_secret: process.env.Cloudinary_APIsecret 
});



export const getUserProfileDetails = async (req,res)=>{
    try {
        const username = req.params.username ;
        const user = await User.findOne({username}) ;

        const isYou = username === req.user.username ;
        if(user){
            return res.status(200).json({
                User:{id:user._id,
                username:user.username,
                name:user.name,
                bio:user.bio,
                profilePicURL:user.profilePicURL,
                profilePicPublicId:user.profilePicPublicId
            },
                isYou:isYou,
            }) ;
        }
        return res.status(400).json({message:"User does not exist"}) ;
    } catch (error) {
        return res.status(500).json({ message: "Internal server error",error:error });
    }
}



export const updateUserProfilePic = async (req,res)=>{
    try {
        const {removeProfilePic} = req.body;
        const username = req.params.username ;
        const filePath = req.file ? req.file.path : null ;

        if(username !== req.user.username){
            return res.status(400).json({message:"Unauthorized to update this profile pic."});
        }

        const user = await User.findOne({username}) ;
        if(!user){
            return res.status(400).json({message:"User not found."}) ;
        }

        if(removeProfilePic==='true' && !req.file){
            if (user.profilePicPublicId) {
                await cloudinary.uploader.destroy(user.profilePicPublicId);
            }

            user.profilePicURL = 'https://res.cloudinary.com/dmeaz48sd/image/upload/v1740665174/defaultProfilePic_qjozwa.jpg';
            user.profilePicPublicId = '';
            await user.save();
        }
        else if(req.file) {
            try {
                if (user.profilePicPublicId) {
                    await cloudinary.uploader.destroy(user.profilePicPublicId);
                }
    
                const response = await cloudinary.uploader.upload(filePath,{
                    folder:'profilePics',
                    type:'upload',
                    access_mode: 'authenticated',
                    transformation: [
                        { quality: "auto:low" }
                    ]
                });
    
                user.profilePicURL = response.secure_url;
                user.profilePicPublicId = response.public_id;
                await user.save();
            } catch (err) {
                console.error("Error in file uploading:", err);
                return res.status(500).json({ message: "Failed to upload profile picture" });
            }
            finally{
                if (filePath) {
                    try {
                        fs.unlinkSync(filePath) ;
                    } catch (error) {
                        console.log("Failed to delete local ProfilePic file:", err) ;
                    }
                }
            }
        }

        return res.status(200).json({message:"Profile picture updated successfully."});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}



export const updateUserInfo = async (req,res)=>{
    try {
        const {name,bio} = req.body ;
        const newInfo = {
            name:name,
            bio:bio
        };

        const username = req.params.username ;

        if(username !== req.user.username){
            return res.status(400).json({message:"Unauthorized to update this profile."});
        }

        const user = await User.findOne({username}) ;
        if(!user){
            return res.status(400).json({message:"User not found."}) ;
        }

        Object.assign(user,newInfo) ;
        await user.save();
        
        return res.status(200).json({message:"Profile updated successfully."});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error"});
    }
}
