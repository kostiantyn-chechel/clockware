import { Request, Response } from 'express';
import { eventDateWithTime } from '../processing/dateTime';
import { masterToCalendar } from '../processing/masterRating';
const db = require("../models");
const Order = db.orders;
const User = db.users;
const Review = db.reviews;

exports.masterList = async (req: Request, res: Response) => {
    const cityId = req.params.cityId;
    const masters = await User.findAll({
        where: {
            status: 'master',
            cityId: cityId,
        },
        include: [{
            model: Review,
            attributes:['rating']
        }],
        attributes: ['id', 'name'],
    });

    try {
        res.send(masterToCalendar(masters));
    } catch (e) {
        res.status(500).send({ message: "Could not find Masters" });
    }

};

exports.masterOrders = async (req: Request, res: Response) => {
    const orders =  await Order.findAll({
        where: {
            masterId: req.params.id
        },
        attributes: ['id', 'date', 'hours', 'orderStatus', 'photoURL', 'time'],
        include: [{
            model: User,
            as: 'order_user',
            attributes: ['name', 'login']
        }]
    });

    try {
        if (orders.length){
            const orderArr = orders.map((order) => {
                return {
                    title: `#${order.id} ${order.order_user.name}`,
                    start: eventDateWithTime(order.date, order.time),
                    end: eventDateWithTime(order.date, order.time, order.hours),
                    status: order.orderStatus,
                    clientName: order.order_user.name,
                    clientEmail: order.order_user.login,
                    photoURL: order.photoURL,
                }
            });

            res.send(orderArr);
        } else {
            res.send(orders);
        }

    } catch (e) {
        res.status(500).send({ message: "Could not find Master Orders" });
    }

};
