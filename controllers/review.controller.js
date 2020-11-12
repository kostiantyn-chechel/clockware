const db = require('../models');
const Review = db.reviews;
const Order = db.orders;

exports.create = (req, res) => {
    let review = req.body;
    Order.findOne({where: {id: review.orderId}})
        .then(order => {
            review['masterId'] = order.masterId;
            Review.create(review)
                .then(() => {
                    res.status(201).send(JSON.stringify('success added Review'))
                });
        });
};

exports.verify = (req,res) => {
    const orderId = req.query.orderId;

    Order.findOne({where: {id: orderId}})
        .then(order => {
            if (order) {
                Review.findOne({where: {orderId: orderId}})
                    .then(result => {
                        console.log('result Review.findOne:', result);
                        if (result) {
                            res.send(JSON.stringify('completed'))
                        } else {
                            res.send(JSON.stringify('review'))
                        }
                    })
                    .catch(err => {
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

exports.reviews = (req, res) => {

    Review.findAll({
        where: {
            masterId: req.query.masterId
        },
        include: {
            model: Order,
            as: 'review_order',
        }
    })
        .then(review => {
            res.send(review);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while find the Master Reviews."
            });
        });
};