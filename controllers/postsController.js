import mongoose from 'mongoose'
import postsModel from "../models/postsModel.js";

// getting all the posts
export const getPosts = async (req, res) => {
    console.log("getPosts");
    try{
        const getAllPost = await postsModel.find();
        res.status(200).json(getAllPost)
    } catch (e) {
        res.status(404).json({
            message: e.message
        })
    }
};

export const createPost = async (req, res) => {

    const post = req.body;
    const newPost = new postsModel(post);

    try{
        await newPost.save();
        res.status(200).json(newPost)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
};

export const updatePost = async (req, res) => {
    
    const { id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).send("No post found")
    }

    const updatePost = await postsModel.findByIdAndUpdate(_id, {...post, _id}, { new: true });

    await res.json(updatePost)
};