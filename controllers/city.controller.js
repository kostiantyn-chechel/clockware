const db = require("../models");
const City = db.cities;

exports.create = (req, res) => {

    const city = {
        name: req.body.name,
    };

    City.create(city)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the City."
            });
        });
};

exports.findAll = (req, res) => {
    City.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cities."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    City.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving City with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    console.log('city update', id);
    City.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `City with id=${id} was updated successfully.`
                });
            } else {
                res.send({
                    message: `Cannot update City with id=${id}. Maybe City was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating City with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    City.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `City with id=${id} was deleted successfully!`
                });
            } else {
                res.send({
                    message: `Cannot delete City with id=${id}. Maybe City was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete City with id=" + id
            });
        });
};
