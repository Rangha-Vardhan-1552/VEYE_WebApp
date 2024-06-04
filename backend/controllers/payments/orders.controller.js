import Razorpay from "razorpay";
import crypto from "crypto";
import paymentList from "../../models/paymentList.js";

var paymentData = {
  orderID: '',
  paymentID: '',
  amount: '',
  status: ''
};

export const order = async (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = req.body;
    const order = await instance.orders.create(options);
    if (!order) {
      return res.status(500).json({ message: 'Error in creating order' });
    }
    paymentData = { ...paymentData, orderID: order.id, amount: order.amount ,username:options.receipt};
    res.status(201).json(order);
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

export const verifyOrder = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', key_secret)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    paymentData = { ...paymentData, paymentID: razorpay_payment_id, status: 'success',signature:razorpay_signature ,createdSignature:expectedSignature};
    const createPaymentDetails= new paymentList(paymentData)
    await createPaymentDetails.save()
    res.status(200).json({
      verified: true,
      message: "Payment Successfully",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
    
  } else {
    paymentData = { ...paymentData, status: 'failed' };
    res.status(400).json({
      verified: false,
      message: "transcation failed... Please try again.",
    });
  }
  
};

export const fetchPayments=async (req,res)=>{
  const {username} =req.body
  try {
    let userDetails=[]
    const fetchDetails= await paymentList.find()
    if(fetchDetails){
      fetchDetails.map((items)=>{
        if (items.username===username){
          userDetails.push(items)
        }
      })
      res.status(200).json(userDetails)
    }else{
      res.status(401).json("error in fetching in details...!")
    }

  } catch (error) {
    res.status(500).json('internal server error')
  }
  
}

