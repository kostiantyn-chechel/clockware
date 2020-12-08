import { Request, Response } from 'express'
import { IError } from "../Type/interfaces"
const db = require("../models");
const Client = db.clients;

exports.create = (req: Request, res: Response) => {
    const client = {
        name: req.body.name,
        email: req.body.email,
    };

    Client.findOne({where: {email: client.email}})
        .then((data: any) => {
            if (data){
                res.send(data)
            } else {
                Client.create(client)
                    .then((data: any) => {
                        res.send(data);
                    })
                    .catch((err: IError) => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Client."
                        });
                    });
            }
        });


};

exports.findAll = (req: Request, res: Response) => {
    Client.findAll()
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

exports.findOne = (req: Request, res: Response) => {
    const id = req.params.id;

    Client.findByPk(id)
        .then((data: any) => {
            res.send(data);
        })
        .catch((err: IError) => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + id
            });
        });
};

exports.update = (req: Request, res: Response) => {
    const id = req.params.id;
    console.log('client update', id);
    Client.update(req.body, {
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
        .catch((err: IError) => {
            res.status(500).send({
                message: "Error updating Client with id=" + id
            });
        });
};

exports.delete = (req: Request, res: Response) => {
    const id = req.params.id;

    Client.destroy({
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
        .catch((err: IError) => {
            res.status(500).send({
                message: "Could not delete Client with id=" + id
            });
        });
};