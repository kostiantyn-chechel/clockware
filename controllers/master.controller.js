const { selectMasters, masterRating } = require('../processing/selectMasters');
const db = require("../models");
const Master = db.masters;
const Order = db.orders;
const Review = db.reviews;

exports.create = (req, res) => {

    const master = {
        name: req.body.name,
        rating: req.body.rating,
        cityId: req.body.cityId,
    };

    Master.create(master)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Master."
            });
        });
};

exports.findAll = (req, res) => {
    Master.findAll({
        include: [{
            model: Review,
        }],
    })
        .then(data => {
            res.send(masterRating(data));
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving masters."
            });
        });
};

exports.findAllFreeMasters = (req, res) => {
    const {date, time, cityId, size} = req.query;
    let ordersOnDate = [];

    Order.findAll({where: {
            date: date + 'T00:00:00.000Z',
            cityId: cityId,
        }})
        .then(data => {
            ordersOnDate = data
        })
        .then(() => {
            Master.findAll({
                where: {
                    cityId: cityId,
                },
                include: [{
                    model: Review,
                }],
                // raw: true,
            })
                .then(masters => {
                    res.send(selectMasters(ordersOnDate, masters, time, size));
                })
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Master.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Master with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    console.log('Master update', id);
    Master.update(req.body, {
        where: { id: id }
    })
        .then(num => {
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
        .catch(err => {
            res.status(500).send({
                message: "Error updating Master with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Master.destroy({
        where: { id: id }
    })
        .then(num => {
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
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Master with id=" + id
            });
        });
};
