const sendEmails = require('../processing/sendEmails');
const sendSGEmail  = require('../processing/sendGridMail');
const db = require("../models");
const Op = db.Sequelize.Op;
const Order = db.orders;
const Client = db.clients;
const Master = db.masters;
const City = db.cities;
const { sortingOrders } = require('../processing/sortingOptions');

exports.create = (req, res) => {

    let order = {
        ...req.body,
        hours: req.body.size,
    };

    const client = {
        name: req.body.clientName,
        email: req.body.clientEmail,
    };

    Client.findOne({where: {email: client.email}})
        .then(data => {
            if (data){
                order = {
                    ...order,
                    clientId: data.id,
                };
                creteOrder(order);
                return data.id;
            } else {
                Client.create(client)
                    .then(data => {
                        order = {
                            ...order,
                            clientId: data.id,
                        };
                        creteOrder(order);
                        return data.id;
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Client."
                        });
                    });
            }
        });


    const creteOrder = (order) => {
        Order.create(order)
            .then(data => {
                Order.findByPk(data.id, {
                    include: [
                        {model: Client, as: 'order_client',},
                        {model: Master, as: 'order_master',}
                    ]
                })
                    .then(resOrder => {
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
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Order."
                });
            });
    };


};

exports.findAll = (req, res) => {
    Order.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        });
};

exports.findFilter = (req, res) => {
    let word = req.query.word;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
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
    }).then(data => {
        res.send(data)
    });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Order with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    console.log('Order update', id);
    Order.update(req.body, {
        where: { id: id }
    })
        .then(num => {
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
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Order.destroy({
        where: { id: id }
    })
        .then(num => {
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
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order with id=" + id
            });
        });
};
