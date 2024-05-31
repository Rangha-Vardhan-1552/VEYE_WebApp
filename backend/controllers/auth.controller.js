import user from "../models/users.model.js";
import bycrypt from 'bcrypt'
export const signup=async(req,res)=>{
    const {username,email,password}=req.body
    const hashPashword=bycrypt.hashSync(password,10)
    const newUser=new user({username,email,password:hashPashword})
    try {
        await newUser.save()
        res.status(201).json({message:'user created successfully..!'})

    } catch (error) {
        res.status(500).json({message:'Internal server error or Bad request'})
    }
}
