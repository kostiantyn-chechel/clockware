import { Request, Response } from 'express'
import {IDBUser, IError} from "../Type/interfaces"
// const sendEmails = require('../processing/sendEmails');
const sendSGEmail  = require('../processing/sendGridMail');
const db = require("../models");
const Op = db.Sequelize.Op;
const Order = db.orders;
const Client = db.clients;
const Master = db.masters;
const City = db.cities;
const User = db.users;
const { sortingOrders } = require('../processing/sortingOptions');

exports.createN = (req: Request, res: Response) => {
    let order = {
        ...req.body,
        hours: req.body.size,
    };

    const user: IDBUser = {
        name: req.body.clientName,
        login: req.body.clientEmail,
        status: "client",
    };

    User.findOne({
        where: {
            login: user.login,
            status: "client",
        }})
        .then((data: any) => {
            if (data) {
                order = {
                    ...order,
                    userId: data.id,
                };
                creteOrderN(order);
            } else {
                user.status ='notAuth';
                User.create(user)
                    .then((data:any) => {
                        order = {
                            ...order,
                            userId: data.id,
                        };
                        creteOrderN(order);
                    })
            }
        });

    const creteOrderN = (order: any) => {
        Order.create(order)
            .then((data: any) => {
                Order.findByPk(data.id, {
                    include: [
                        {model: User, as: 'order_user',},
                        {model: Master, as: 'order_master',}
                    ]
                })
                    .then((resOrder: any) => {
                        const fullOrder = {
                            id: resOrder.id,
                            clientName: resOrder.order_user.dataValues.name,
                            clientEmail: resOrder.order_user.dataValues.email,
                            masterName: resOrder.order_master.dataValues.name,
                            date: resOrder.date,
                            time: resOrder.time,
                            hours: resOrder.hours,
                        };
                        // sendEmails(fullOrder); // <-- send Email(Gmail)
                        sendSGEmail(fullOrder); // <-- send Email(SGEmail)
                    });
                res.send(data);
            })
            .catch((err: IError) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Order."
                });
            });
    };
};

exports.create = (req: Request, res: Response) => {
    let order = {
        ...req.body,
        hours: req.body.size,
    };
    const client = {
        name: req.body.clientName,
        email: req.body.clientEmail,
    };
    Client.findOne({where: {email: client.email}})
        .then((data: any) => {
            if (data){
                order = {
                    ...order,
                    clientId: data.id,
                };
                creteOrder(order);
                return data.id; //TODO ??? WTF
            } else {
                Client.create(client)
                    .then((data: any) => {
                        order = {
                            ...order,
                            clientId: data.id,
                        };
                        creteOrder(order);
                        return data.id;
                    })
                    .catch((err: IError) => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the ClientCabinet."
                        });
                    });
            }
        });

    const creteOrder = (order: any) => {
        Order.create(order)
            .then((data: any) => {
                Order.findByPk(data.id, {
                    include: [
                        {model: Client, as: 'order_client',},
                        {model: Master, as: 'order_master',}
                    ]
                })
                    .then((resOrder: any) => {
                        const fullOrder = {
                            id: resOrder.id,
                            clientName: resOrder.order_client.dataValues.name,
                            clientEmail: resOrder.order_client.dataValues.email,
                            masterName: resOrder.order_master.dataValues.name,
                            date: resOrder.date,
                            time: resOrder.time,
                            hours: resOrder.hours,
                        };
                        // sendEmails(fullOrder); // <-- send Email
                        sendSGEmail(fullOrder);
                    });
                res.send(data);

            })
            .catch((err: IError) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Order."
                });
            });
    };
};

exports.findAll = (req: Request, res: Response) => {
    Order.findAll()
        .then((data: any) => {
            res.send(data);
        })
        .catch((err: IError) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        });
};

exports.findFilter = (req: Request, res: Response) => {
    let word = req.query.word;
    let limit = parseInt(req.query.limit as string);
    let offset = parseInt(req.query.offset as string);
    const sorting = sortingOrders(req.query.sortBy, req.query.sort);

    Order.findAndCountAll({
        limit: limit,
        offset: offset,
        where: {
            [Op.or]: {
                '$order_client.name$': {[Op.like]: `%${word}%`},
                '$order_client.email$': {[Op.like]: `%${word}%`},
                '$order_city.name$': {[Op.like]: `%${word}%`},
                '$order_master.name$': {[Op.like]: `%${word}%`},
            }
        },
        order: [ sorting ],
        include: [{
            model: Client,
            as: 'order_client',
        },{
            model: City,
            as: 'order_city',
        },{
            model: Master,
            as: 'order_master'
        }],
    }).then((data: any) => {
        res.send(data)
    });
};


exports.findOne = (req: Request, res: Response) => {
    const id = req.params.id;

    Order.findByPk(id)
        .then((data: any) => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving Order with id=" + id
            });
        });
};

exports.update = (req: Request, res: Response) => {
    const id = req.params.id;
    console.log('Order update', id);
    Order.update(req.body, {
        where: { id: id }
    })
        .then((num: number) => {
            if (num == 1) {
                res.send({
                    message: `Order with id=${id} was updated successfully.`
                });
            } else {
                res.send({
                    message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating Order with id=" + id
            });
        });
};

exports.delete = (req: Request, res: Response) => {
    const id = req.params.id;

    Order.destroy({
        where: { id: id }
    })
        .then((num: number) => {
            if (num == 1) {
                res.send({
                    message: `Order with id=${id} was deleted successfully!`
                });
            } else {
                res.send({
                    message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Order with id=" + id
            });
        });
};