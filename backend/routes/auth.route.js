import { Router } from "express";
import { sigin, signout, signup } from "../controllers/auth.controller.js";

const router=Router()
router.post('/signup',signup)
router.post('/signin',sigin)
router.get('/signout',signout)

export default router