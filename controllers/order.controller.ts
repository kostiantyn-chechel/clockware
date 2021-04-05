import { NextFunction, Request, Response } from 'express'
import { IDBUser, IError } from "../Type/interfaces"
// const sendEmails = require('../processing/sendEmails'); // <-- send Email(Gmail)
const mail  = require('../processing/sendGridMail');
const db = require("../models");
const Op = db.Sequelize.Op;
const Order = db.orders;
const City = db.cities;
const User = db.users;
const Review = db.reviews;
const { sortingOrders } = require('../processing/sortingOptions');

exports.create = (req: Request, res: Response) => {
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
                    orderStatus: 'queue'
                };
                creteOrder(order);
            } else {
                user.status ='notAuth';
                User.create(user)
                    .then((data:any) => {
                        order = {
                            ...order,
                            userId: data.id,
                            orderStatus: 'queue'
                        };
                        creteOrder(order);
                    })
            }
        });

    const creteOrder = (order: any) => {
        Order.create(order)
            .then((data: any) => {
                Order.findByPk(data.id, {
                    include: [
                        {model: User, as: 'order_user',},
                        {model: User, as: 'order_master',}
                    ]
                })
                    .then((resOrder: any) => {
                        const fullOrder = {
                            id: resOrder.id,
                            clientName: resOrder.order_user.dataValues.name,
                            clientEmail: resOrder.order_user.dataValues.login,
                            masterName: resOrder.order_master.dataValues.name,
                            date: resOrder.date,
                            time: resOrder.time,
                            hours: resOrder.hours,
                        };
                        // sendEmails(fullOrder); // <-- send Email(Gmail)
                        mail.sendSGEmail(fullOrder); // <-- send Email(SGEmail)

                        const newOrder = {
                            masterName: resOrder.order_master.dataValues.name,
                            date: resOrder.date,
                            time: resOrder.time,
                            size: resOrder.hours,
                            email: resOrder.order_user.dataValues.login,
                        };
                        res.send(newOrder)
                    });
            })
            .catch((err: IError) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Order."
                });
            });
    };
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
                '$order_user.name$': {[Op.like]: `%${word}%`},
                '$order_user.login$': {[Op.like]: `%${word}%`},
                '$order_city.name$': {[Op.like]: `%${word}%`},
                '$order_master.name$': {[Op.like]: `%${word}%`},
            }
        },
        order: [ sorting ],
        include: [{
            model: User,
            as: 'order_user',
            attributes: ['id', 'login', 'name'],
        },{
            model: City,
            as: 'order_city',
        },{
            model: User,
            as: 'order_master'
        }],
    }).then((data: any) => {
        res.send(data)
    });
};

exports.getOrderById = async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const order = await Order.findOne({
        where: {id: orderId},
        attributes: ['date', 'time', 'hours', 'photoURL', 'cost', 'costStatus'],
        include: [{
            model: City,
            as: 'order_city',
            attributes: ['name'],
        },{
            model: User,
            as: 'order_master',
            attributes: ['name'],
        },{
            model: User,
            as: 'order_user',
            attributes: ['name'],
        }],
    });
    res.send(order)
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

exports.clientOrders = (req: Request, res: Response) => {
    const id = req.params.id;
    Order.findAll({
        // raw: true,
        where: {UserId: id},
        attributes: ['id', 'date', 'time', 'hours', 'photoURL', 'cost', 'costStatus'],
        include: [{
            model: City,
            as: 'order_city',
            attributes: ['name'],
        },{
            model: User,
            as: 'order_master',
            attributes: ['name'],
        },{
            model: Review,
            attributes: ['review', 'rating'],
        }],
    })
        .then((orders: any) => res.send(orders))
};

exports.changeStatus = (req: Request, res: Response, next: NextFunction) => {
    const order = { orderStatus: req.body.status };

    Order.update(order, {
        where: { id: req.body.orderId }
    })
        .then((num: number) => {
            console.log('update:', num);
            if (num == 1) {
                next()
            } else {
                res.send({
                    message: `Cannot update Order with id=${req.body.orderId}`
                });
            }
        });
};

exports.updatePayStatus = (req: Request, res: Response) => {
    const id = req.body.orderId;
    const order = {
        costStatus: req.body.payStatus
    };

    Order.update(order, {
        where: {
            id: id
        }
    })
        .then((num: number) => {
            if (num == 1) {
                res.send({
                    message: `Order with id=${id} was updated successfully.`
                });
            } else {
                res.send({
                    message: `Cannot update Order with id=${id}. Maybe Master was not found or req.body is empty!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating Order with id=" + id
            });
        });


};