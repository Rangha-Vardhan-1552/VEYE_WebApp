import { Router } from "express";
import { sigin, signup } from "../controllers/auth.controller.js";

const router=Router()
router.post('/signup',signup)
router.post('/signin',sigin)

export default router