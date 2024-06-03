import { Router } from "express";
import { order, verifyOrder } from "../controllers/payments/orders.controller.js";

const paymentRouter=Router()
paymentRouter.post('/createorder',order)
paymentRouter.post('/verifyorder',verifyOrder)

export default paymentRouter;