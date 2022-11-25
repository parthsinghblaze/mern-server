import postsModel from "../models/postsModel.js";

// getting all the posts
export const getPosts = async (req, res) => {
    try{
        const getAllPost = await postsModel.find()
        res.status(200).json(getAllPost)
    } catch (e) {
        res.status(404).json({
            message: e.message
        })
    }
}

export const createPost = async (req, res) => {

    const post = req.body
    const newPost = new postsModel(post)

    try{
        await newPost.save()
        res.status(200).json(newPost)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}