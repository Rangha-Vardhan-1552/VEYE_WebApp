import mongoose from "mongoose";
const paymentListSchema= new mongoose.Schema(
    {
    paymentID:{
        type:String,
        unique:true,
        required:true
    },
    orderID:{
        type:String,
        unique:true,
        required:true
    },
    amount:{
        type:String,
        unique:true,
        required:true
    },
    status:{
        type:String,
        unique:true,
        required:true
    }
    },{timestamps:true}
)
const paymentList= mongoose.model('PaymentList',paymentListSchema)
export default paymentList;