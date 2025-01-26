
import User from '../model/user.js'
import bcrypt from 'bcrypt' 
import  {createToken}  from '../services/authentication.js';

export const handleSignup =async (req,res)=>{
    console.log(req.body);
    const {username,email,password} = req.body ;

    try {
        if(!username || !email || !password){
            return res.status(400).json({message:"All feilds are required"})
        }
    
        const existingEmail = await User.findOne({email})  // one email - one account
        if(existingEmail){
            return res.status(400).json({message:"Email already in use."}) 
        }

        const hashedPassword = await bcrypt.hash(password,12) ; // password get hashed
    
        const newUser = await User.create({
            username:username,
            email:email,
            password:hashedPassword,
        })

        const token = createToken(newUser) ;
    
        return res.status(201).cookie('token',token,{
            path:"/",
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production',
        }).json({message:"signup successfully"}) ;
    } catch (error) {
        return res.status(500).json({error:`something went wrong - ${error}`})
    }
}


export const handleSignin = async (req,res)=>{
    const {email,password} = req.body ;

    try {
        if(!email || !password){
            return res.status(400).json({message:"Enter email or password"})
        }

        const user = await User.findOne({email}) ;

        if(!user){
            return res.status(400).json({message:"User doesn't exist"})
        }

        const passwordMatched = await bcrypt.compare(password,user.password) ;

        if(passwordMatched){
            const token = createToken(user) ;

            return res.status(200).cookie('token',token,{
                path:"/",
                httpOnly: true,
                sameSite: 'None',
                secure: process.env.NODE_ENV === 'production',
            }).json({message:"signin successfully"}) ;
        }
        else{
            return res.status(400).json({message:"Incorrect password"})
        }
    } catch (error) {
        return res.status(500).json({error:`something went worng - ${error}`})
    }
}

