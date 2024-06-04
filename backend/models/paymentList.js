import mongoose from "mongoose";
const paymentListSchema= new mongoose.Schema(
    {
    signature:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
   },
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
        required:true
    },
    status:{
        type:String,
        required:true
    }
    },{timestamps:true}
)
const paymentList= mongoose.model('PaymentList',paymentListSchema)
export default paymentList;