import { Request, Response } from 'express'
import { IError } from "../Type/interfaces"
const db = require('../models');
const Review = db.reviews;
const Order = db.orders;

exports.create = (req: Request, res: Response) => {
    let review = req.body;
    Order.findOne({where: {id: review.orderId}})
        .then((order: any) => {
            review['masterId'] = order.masterId;
            Review.create(review)
                .then(() => {
                    res.status(201).send(JSON.stringify('success added Review'))
                });
        });
};

exports.verify = (req: Request, res: Response) => {
    const orderId = req.query.orderId;

    Order.findOne({where: {id: orderId}})
        .then((order: any) => {
            if (order) {
                Review.findOne({where: {orderId: orderId}})
                    .then((result: any) => {
                        console.log('result Review.findOne:', result);
                        if (result) {
                            res.send(JSON.stringify('completed'))
                        } else {
                            res.send(JSON.stringify('review'))
                        }
                    })
                    .catch((err: IError) => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while find the Review."
                        });
                    });
            } else {
                res.send(JSON.stringify('no entry'))
            }
        });
};

exports.reviews = (req: Request, res: Response) => {

    Review.findAll({
        where: {
            masterId: req.query.masterId
        },
        include: {
            model: Order,
            as: 'review_order',
        }
    })
        .then((review: any) => {
            res.send(review);
        })
        .catch((err: IError) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while find the Master Reviews."
            });
        });
};