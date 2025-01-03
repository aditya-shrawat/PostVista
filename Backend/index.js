
import dotenv from 'dotenv'
dotenv.config()


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

import userRouter from './routes/user.js';

mongoose.connect(process.env.mongodbURL)
.then(console.log("MongoDb is connected successfully"))

const app = express() ;
const PORT = 8000 ;

app.use(cors())
app.use(express.json()) 

app.use('/user',userRouter) ;


app.listen(PORT,()=>console.log(`server is running on port ${PORT}`)) ;
