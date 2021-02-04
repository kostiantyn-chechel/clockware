import {IError} from "../Type/interfaces";

const db = require("../models");
import { Request, Response} from 'express'
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