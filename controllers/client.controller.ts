import { Request, Response } from 'express'
import {IError, TUserStatus} from "../Type/interfaces"
const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.users;

type filterOptionType = {
    where: {
        name?: any,
        status: TUserStatus
    },
    attributes: string[],
}

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

exports.findAllClientFilter = (req: Request, res: Response) => {
    const name = req.query.name as string;
    let options: filterOptionType = {
        where: {
            status: 'client'
        },
        attributes: ['id', 'login', 'name']
    };
    if (name) {
        options.where = {
            ...options.where,
            [Op.or]: {
                name: {[Op.like]: `%${name}%`},
                login: {[Op.like]: `%${name}%`},
            }
        }
    }

    User.findAll(options)
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