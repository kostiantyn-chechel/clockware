// @ts-ignore
import { dateToString } from "../client/src/helpers/dateTime";

const mail = require('./sendGridMail');
const db = require('../models');
const User = db.users;
const Order = db.orders;

const masterTodayReport = () => {
    const date = new Date();
    const todayDate = dateToString(date);

    User.findAll({
        where: {
            status: 'master'
        },
        attributes: ['id', 'name', 'login']
    })
        .then((masters) => {
            masters.forEach(master => {
                Order.findAll({
                    where: {
                        masterId: master.id,
                    },
                    attributes: ['id', 'date', 'time', 'hours'],
                    include: {
                        model: User,
                        as: 'order_user',
                        attributes: ['name'],
                    }
                }).then(orders => {
                    const orderList = orders.filter(order => {
                        return dateToString(order.date) === todayDate
                    }).map(order => {
                        return {
                            order: order.id,
                                   date: order.date,
                                   time: order.time,
                                   size: order.hours,
                                   client: order.order_user.name,
                        }
                    });

                    mail.sendSGMasterReport(master, orderList, todayDate);
                })
            })
        })
};

module.exports = {
    masterTodayReport,
};