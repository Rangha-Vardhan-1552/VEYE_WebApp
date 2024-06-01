import user from "../models/users.model.js";
import bycrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import cookie from "cookie-parser"

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

export const sigin= async(req,res)=>{
    const {email,password} = req.body
    try {
        const validUser= await user.findOne({email})
        if(!validUser){
            return res.status(404).json({message:'user not found...!'})
        }

        const validPassword=  bycrypt.compareSync(password,validUser.password)
        if (!validPassword){
            return res.status(401).json({message:'wrong credentials..!'})
        }

    const {password:pass , ...resUserInfo}=validUser._doc
    const createToken= jwt.sign({id:validUser._id},process.env.JWT_TOKEN)
    res.cookie('access_token',createToken,{httpOnly:true})
        .status(200)
        .json({message:resUserInfo})
    } catch (error) {
        return res.status(500).json({message:'internal server error...!'})

    }

}
