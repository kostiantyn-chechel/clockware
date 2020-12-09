import { Request, Response} from 'express'
import { IError } from "../Type/interfaces";
const db = require("../models");
const City = db.cities;

exports.create = (req: Request, res: Response) => {

    const city = {
        name: req.body.name,
    };

    City.create(city)
        .then((data: any) => {
            res.send(data);
        })
        .catch((err: IError) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the City."
            });
        });
};

exports.findAll = (req: Request, res: Response) => {
    City.findAll()
        .then((data: any) => {
            res.send(data);
        })
        .catch((err: IError) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cities."
            });
        });
};

exports.findOne = (req: Request, res: Response) => {
    const id = req.params.id;

    City.findByPk(id)
        .then((data: any) => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving City with id=" + id
            });
        });
};

exports.update = (req: Request, res: Response) => {
    const id = req.params.id;
    console.log('city update', id);
    City.update(req.body, {
        where: { id: id }
    })
        .then((num: number) => {
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
        .catch(() => {
            res.status(500).send({
                message: "Error updating City with id=" + id
            });
        });
};

exports.delete = (req: Request, res: Response) => {
    const id = req.params.id;

    City.destroy({
        where: { id: id }
    })
        .then((num: number) => {
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
        .catch(() => {
            res.status(500).send({
                message: "Could not delete City with id=" + id
            });
        });
};