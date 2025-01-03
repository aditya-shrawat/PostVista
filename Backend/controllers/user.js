
import User from '../model/user.js'
import bcrypt from 'bcrypt' 

export const handleSignup =async (req,res)=>{
    console.log(req.body);
    const {username,email,password} = req.body ;

    try {
        if(!username || !email || !password){
            return res.json({message:"All feilds are required"})
        }
    
        const existingEmail = await User.findOne({email})  // one email - one account
        if(existingEmail){
            return res.json({message:"email already in use"}) 
        }

        const hashedPassword = await bcrypt.hash(password,12) ; // password get hashed
    
        const newUser = await User.create({
            username:username,
            email:email,
            password:hashedPassword,
        })
    
        return res.status(200).json({message:`new user is created ${newUser}`}) 
    } catch (error) {
        return res.status(500).json({error:`something went wrong - ${error}`})
    }
}

