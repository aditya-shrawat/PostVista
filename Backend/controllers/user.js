
import User from '../model/user.js'
import bcrypt from 'bcrypt' 

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
    
        return res.status(201).json({message:`new user is created ${newUser}`}) 
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
            return res.status(200).json({message:"Login successfully"}) ;
        }
        else{
            return res.status(400).json({message:"Incorrect password"})
        }
    } catch (error) {
        return res.status(500).json({error:`something went worng - ${error}`})
    }
}

