import { Request, Response } from 'express'
import { IError } from "../Type/interfaces"
const db = require("../models");
const User = db.users;

exports.createClient = (req: Request, res: Response) => {
    console.log('createClient', req.body);
    const client = {
        name: req.body.name,
        login: req.body.login,
        status: 'client',
    };

    User.findOne({
        where: {login: client.login}})
        .then((data: any) => {
            if (!data){
                User.create(client)
                    .then((data: any) => {
                        res.send(data);
                    })
                    .catch((err: IError) => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the ClientCabinet."
                        });
                    });
            }
        });
};

exports.findAllClient = (req: Request, res: Response) => {
    User.findAll({
        where: {
            status: 'client'
        },
        attributes: ['id', 'login', 'name']
    })
        .then((data: any) => {
            res.send(data);
        })
        .catch((err: IError) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving clients."
            });
        });
};

exports.updateClient = (req: Request, res: Response) => {
    const id = req.params.id;
    console.log('client update', id);
    User.update(req.body, {
        where: { id: id }
    })
        .then((num: number) => {
            if (num == 1) {
                res.send({
                    message: `Client with id=${id} was updated successfully.`
                });
            } else {
                res.send({
                    message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating ClientCabinet with id=" + id
            });
        });
};

exports.deleteClient = (req: Request, res: Response) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then((num: number) => {
            if (num == 1) {
                res.send({
                    message: `Client with id=${id} was deleted successfully!`
                });
            } else {
                res.send({
                    message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete ClientCabinet with id=" + id
            });
        });
};

exports.list = (req: Request, res: Response) => {
    User.findAll({
        where: {status: 'client'},
        attributes: ['name']
    })
        .then((data:any) => {
            res.send(data)
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not find Masters"
            });
        });
};