import express from "express";
import { login } from '../controllers/auth.controllers.js'

const router = express.Router();


//LOGIN
router.get("/", login)

//LOGOUT
//router.delete("/",  logout)

//SESSION
//router.get("/", session)

export default router;