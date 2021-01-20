const db = require("../models");
import {Request, Response} from 'express'
const { or, and, gt, lt } = db.Sequelize.Op;
const sequelize = db.sequelize;
const City = db.cities;
const Master = db.masters;
const Order = db.orders;

exports.listAllCityWithMasters = (req: Request, res: Response) => {
    City.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: Master,
        }]
    }).then(data => res.send(data))
};

exports.filterAdminData = (req: Request, res: Response) => {
    const startData = req.query.start;
    const endData = req.query.end;
    const cityIdArr = req.query.cities ? JSON.parse(req.query.cities as string) : null;
    const masterIdArr = req.query.masters ? JSON.parse(req.query.masters as string): null;

    let listDateOrder = [];
    let listCityCount = [];

    Order.findAll({
        where: {
            [and]: [
                {date: {[gt]: startData}},
                {date: {[lt]: endData}},
            ],
            masterId: masterIdArr,
            cityId: cityIdArr,
        },
        attributes: [
            'date',
            [sequelize.fn('count', sequelize.col('date')), 'count']
        ],
        group: ['date'],
        order: ['date'],
    }).then(response => {
        listDateOrder = response;
    }).then(() => {
        Order.findAll({
            where: {
                [and]: [
                    {date: {[gt]: startData}},
                    {date: {[lt]: endData}},
                ],
                masterId: masterIdArr,
                cityId: cityIdArr,
            },
            attributes: [
                'cityId',
                [sequelize.fn('count', sequelize.col('cityId')), 'count']
            ],
            include: {
                model: City,
                as: 'order_city',
                attributes: [
                    'name'
                ],
            },
            group: ['cityId'],
        }).then(response => {
            console.log('listCityCount:', response);
            listCityCount = response
        }).then(() => {
            res.send({
                listDateOrder,
                listCityCount,
            })
        });
    });
};