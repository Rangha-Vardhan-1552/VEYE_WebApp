import Razorpay from "razorpay"
import crypto from "crypto"

export const order= async(req,res)=>{
    try {
        var instance = new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID ,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
          });
        const options=req.body
        const order= await instance.orders.create(options)
        if(!order){
            return res.status(500).json({message:'Error in creating order'})
        }
        res.status(201).json(order)
    } catch (error) {
        return res.status(500).json("internal server error")
    }
}

export const verifyOrder= async(req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', key_secret)
                                    .update(body.toString())
                                    .digest('hex');
  
    if (expectedSignature === razorpay_signature) {
      res.status(200).json({ verified: true ,
        message:"Payment Successfully",
        orderId:razorpay_order_id,
        paymentId:razorpay_payment_id
      });
    } else {
      res.status(400).json({
         verified: false,
         message:"transcation failed...! Please try again.",
        });
    }
};