import { Router } from "express";
import { fetchPayments, order, verifyOrder } from "../controllers/payments/orders.controller.js";

const paymentRouter=Router()
paymentRouter.post('/createorder',order)
paymentRouter.post('/verifyorder',verifyOrder)
paymentRouter.post('/fetchPayments',fetchPayments)
export default paymentRouter;