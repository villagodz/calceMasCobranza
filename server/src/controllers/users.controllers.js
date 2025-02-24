import User from "../models/User.model.js";

const create = async (req,res) => {
    try {
        const data = req.body;
        const newElement = await User.create(data);
        res.status(201).json(newElement);
        return
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
        return;
    }
}

const findAll = async (req,res) => {
    try {
        const elements = await User.find();
        res.status(200).json(elements)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        return;
    }
}

const findById = async (req,res) => {
    try {
        const id = req.params.id;
        const element = await User.findById(id);
        if(!element){
            res.status(404).json({mensaje: "NOT FOUND"})
            return
        }
        res.status(200).json(element);
        return
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        return;
    }
}

export default {
    create,
    findById,
    findAll
}