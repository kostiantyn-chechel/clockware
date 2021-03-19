import { Request, Response } from 'express'
const db = require("../models");
const Order = db.orders;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getClientSecret = async (req: Request, res: Response) => {
    const orderId = req.params.id;

    const order = await Order.findByPk(orderId);

    const options = {
        amount: order.cost * 100,
        currency: 'USD',
    };

    try {
        const paymentIntent = await stripe.paymentIntents.create(options);
        res.json(paymentIntent.client_secret);
    } catch (err) {
        res.json(err);
    }
};
