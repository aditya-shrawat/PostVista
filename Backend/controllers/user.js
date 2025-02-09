
import User from '../model/user.js'
import bcrypt from 'bcrypt' 
import  {createToken}  from '../services/authentication.js';

export const checkEmail = async (req,res)=>{
    try {
        const {email,password} = req.body ;

        if(email==='' || password ===''){
            return res.status(400).json({error:'All fields are required.'});
        }

        const emailExist = await User.findOne({email}) ;
        if(emailExist){
            return res.status(400).json({error:'Email is already in use.'});
        }
        if(password.length < 8){
            return res.status(400).json({error:'Password must be at least 8 characters!'})
        }

        return res.status(200).json({message:'Email is unique.'});
    } catch (error) {
        return res.status(500).json({error:`something went wrong`})
    }
}


const generateUsername = async (email)=>{
    const [localName,domainName] = email.split('@');
    const domainLetter = domainName[0].toLowerCase();
    let username = localName ;

    const userNameExist = await User.findOne({username}) ;
    if(userNameExist){
        username = `${localName}_${domainLetter}` ;
    }

    return username ;
}

export const createAccount =async (req,res)=>{
    try {
        const {name,email,password} = req.body ;

        if(!name){
            return res.status(400).json({error:"Name is required."});
        }

        const username = await generateUsername(email) ;
        const existingUsername = await User.findOne({username})
        if(existingUsername){
            return res.status(400).json({error:"Username is already in use."}) 
        }

        const hashedPassword = await bcrypt.hash(password,12) ;
    
        const newUser = await User.create({
            username:username,
            email:email,
            password:hashedPassword,
            name:name,
        })

        const token = createToken(newUser) ;
    
        return res.status(201).cookie('token',token).json({message:"signup successfully."}) ;
    } catch (error) {
        return res.status(500).json({error:`something went wrong,try again later.`})
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

            return res.status(200).cookie('token',token).json({message:"signin successfully"}) ;
        }
        else{
            return res.status(400).json({message:"Incorrect password"})
        }
    } catch (error) {
        return res.status(500).json({error:`something went worng - ${error}`})
    }
}

