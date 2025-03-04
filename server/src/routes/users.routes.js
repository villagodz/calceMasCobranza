import express from 'express';
import userControllers from '../controllers/users.controllers.js';


const router = express.Router();

//CREATE
router.post("/", userControllers.create);

//Find all
router.get("/", userControllers.findAll)

//FIND BY ID
router.get("/:id", userControllers.findById);

export default router