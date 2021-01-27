import { Request, Response } from 'express'
import { IError } from "../Type/interfaces";
const { selectMasters, masterRating } = require('../processing/selectMasters');
const { generateSalt, generatePassCrypt } = require('../processing/auth');
const db = require("../models");
const Op = db.Sequelize.Op;
const Order = db.orders;
const Review = db.reviews;
const User = db.users;

type filterOptionType = {
    where?: {
        name?: any
        status?: string
    },
    include: [{
        model: any,
    }],
}

exports.createMaster = (req: Request, res: Response) => {

    const salt = generateSalt();
    const master = {
        name: req.body.name,
        login: req.body.login,
        cityId: req.body.cityId,
        status: 'master',
        password: generatePassCrypt(req.body.password, salt),
        salt: salt,
    };

    User.findOne({
        where: {
            login: master.login
        }})
        .then((data: any) => {
            if (!data){
                User.create(master)
                    .then((data: any) => {
                        res.send(data);
                    })
                    .catch((err: IError) => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Master."
                        });
                    });
            } else {
                res.send({ message: `Пользователь с логином ${req.body.login} уже зарегистрирован в системе` })
            }
        });
};

exports.findAllMaster = (req: Request, res: Response) => {
    User.findAll({
        where: {
            status: 'master',
        },
        include: [{
            model: Review,
        }],
    })
        .then((data: any) => {
            res.send(masterRating(data));
        })
        .catch((err: IError) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving masters."
            });
        });
};

exports.findAllMasterFilter = (req: Request, res: Response) => {
    const name = req.query.name as string;
    let options: filterOptionType = {
        where: {
            status: 'master',
        },
        include: [{
            model: Review,
        }]
    };

    if (name) {
        // options.where = {...options.where, name: {[Op.like]: `%${name}%`}}
        options.where!.name = {[Op.like]: `%${name}%`}
    }

    User.findAll(options)
        .then((data: any) => {
            res.send(masterRating(data));
        })
        .catch((err: IError) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving masters."
            });
        });
};

exports.findAllFreeMasters = (req: Request, res: Response) => {
    const { date, time, cityId, size } = req.query;
    let ordersOnDate = <any>[];

    Order.findAll({where: {
            date: date + 'T00:00:00.000Z',
            cityId: cityId,
        }})
        .then((data: any) => {
            ordersOnDate = data
        })
        .then(() => {
            User.findAll({
                where: {
                    cityId: cityId,
                    status: 'master',
                },
                include: [{
                    model: Review,
                }],
            })
                .then((masters: any) => {
                    res.send(selectMasters(ordersOnDate, masters, time, size));
                })
        });
};

exports.findOneMaster = (req: Request, res: Response) => {
    const id = req.params.id;

    User.findOne({
        where: { id: id },
        attributes: ['id', 'name', 'cityId', 'login'],
        })
        .then((data: any) => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving Master with id=" + id
            });
        });
};

exports.updateMaster = (req: Request, res: Response) => {
    const id = req.params.id;

    const salt = generateSalt();
    const master = {
        name: req.body.name,
        login: req.body.login,
        cityId: req.body.cityId,
        status: 'master',
        password: generatePassCrypt(req.body.password, salt),
        salt: salt,
    };

    User.update(master, {
        where: { id: id }
    })
        .then((num: number) => {
            if (num == 1) {
                res.send({
                    message: `Master with id=${id} was updated successfully.`
                });
            } else {
                res.send({
                    message: `Cannot update Master with id=${id}. Maybe Master was not found or req.body is empty!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating Master with id=" + id
            });
        });
};

exports.deleteMaster = (req: Request, res: Response) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then((num: number) => {
            if (num == 1) {
                res.send({
                    message: `Master with id=${id} was deleted successfully!`
                });
            } else {
                res.send({
                    message: `Cannot delete Master with id=${id}. Maybe Master was not found!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Master with id=" + id
            });
        });
};

exports.listMasters = (req: Request, res: Response) => {
    User.findAll({
        where: {
            status: 'master'
        },
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

exports.masterOrders = (req: Request, res: Response) => {
    Order.findAll({
        where: {
            masterId: req.params.id
        },
        attributes: ['id', 'date', 'hours', 'orderStatus', 'photoURL', 'time'],
        include: [{
            model: User,
            as: 'order_user',
            attributes: ['name', 'login']
        }]
    }).then(orders => {
        res.send(orders)
    }).catch(() => {
        res.status(500).send({
            message: "Could not find Master Orders"
        });
    })
};