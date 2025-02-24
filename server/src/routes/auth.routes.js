import express from "express";
import { login, logout, session } from '../controllers/auth.controllers.js'
import authenticate from '../../config/jwt.config.js';

const router = express.Router();


//LOGIN
router.post("/", login)

//LOGOUT
router.delete("/", authenticate, logout)

//SESSION
router.get("/", authenticate, session)

export default router;