import express from 'express';
import mongoose from 'mongoose';

import PostEmploye from '../models/postEmploye.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postEmploye = await PostEmploye.find();
                
        res.status(200).json(postEmploye);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostEmploye.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { name, dateofbirth, selectedFile, salary, gender } = req.body;

    const newPostEmploye = new PostEmploye({ name, dateofbirth, selectedFile, salary, gender })

    try {
        await newPostEmploye.save();

        res.status(201).json(newPostEmploye );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { name, dateofbirth, salary, selectedFile, gender } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { salary, name, dateofbirth, gender, selectedFile, _id: id };

    await PostEmploye.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostEmploye.findByIdAndRemove(id);

    res.json({ dateofbirth: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostEmploye.findById(id);

    const updatedPost = await PostEmploye.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}


export default router;