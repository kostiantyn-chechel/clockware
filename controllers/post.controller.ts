import {IError} from "../Type/interfaces";

const db = require("../models");
import { Request, Response} from 'express'
import {PostAttributes} from "../models/post.model";
const Post = db.posts;

exports.allPost = (req: Request, res: Response) => {

    Post.findAll({
        order: [['id', 'DESC']]
    })
        .then(data => res.send(data))
        .catch((err: IError) => { res.status(500)
            .send({ message: err.message || "Error find all Post" })});
};

exports.addPost = async (req: Request, res: Response) => {

    await Post.create(req.body)
        .catch((err: IError) => { res.status(500)
            .send({ message: err.message || "Error creating the Post" })});

    await Post.findAll({
        order: [['id', 'DESC']]
    })
        .then(data => res.send(data))
        .catch((err: IError) => { res.status(500)
            .send({ message: err.message || "Error find all Post" })});
};

exports.updatePost = async (req: Request, res: Response) => {
    const id = req.params.id;

    const post: PostAttributes = {
        date: req.body.date,
        post: req.body.post,
        photoURL: req.body.photoURL,
    };

    await Post.update(post, {
        where: { id: id }
    });

    await Post.findAll({
        order: [['id', 'DESC']]
    })
        .then(data => res.send(data))
        .catch((err: IError) => { res.status(500)
            .send({ message: err.message || "Error find all Post" })});

};

exports.deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;

    await Post.destroy({
        where: { id: id }
    });

    await Post.findAll({
        order: [['id', 'DESC']]
    })
        .then(data => res.send(data))
        .catch((err: IError) => { res.status(500)
            .send({ message: err.message || "Error find all Post" })});

};