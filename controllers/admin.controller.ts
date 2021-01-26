const db = require("../models");
import {Request, Response} from 'express'
const { or, and, gt, lt } = db.Sequelize.Op;
const sequelize = db.sequelize;
const City = db.cities;
const User = db.users;
const Order = db.orders;

exports.listAllCityWithMasters = (req: Request, res: Response) => {
    City.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: User,
            attributes: ['id', 'name', 'cityId']
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
    let listMasterCount = [];
    let listMasterData = [];

    const where = {
        [and]: [
            {date: {[gt]: startData}},
            {date: {[lt]: endData}},
        ],
        masterId: masterIdArr,
        cityId: cityIdArr,
    };

    Order.findAll({
        where: where,
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
            where: where,
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
            listCityCount = response
        }).then(() => {
            Order.findAll({
                where: where,
                attributes: [
                    'masterId',
                    [sequelize.fn('count', sequelize.col('masterId')), 'count']
                ],
                include: {
                    model: User,
                    as: 'order_master',
                    attributes: [
                        'name'
                    ],
                },
                group: ['masterId'],
            }).then(response => {
                listMasterCount = response;
            }).then(() => { //MastersTable
                Order.findAll({
                    where: where,
                    attributes: [
                        'masterId',
                    ],
                    include: {
                        model: User,
                        as: 'order_master',
                        attributes: [
                            'name'
                        ],
                    },
                    group: ['masterId'],

                }).then(response => {
                    listMasterData = response;
                }).then(() => {
                    res.send({
                        listDateOrder,
                        listCityCount,
                        listMasterCount,
                        listMasterData,
                    });
                });
            });
        });
    });
};

const threeLargestMaster = (masterArr: []) => {
    if (masterArr.length < 3) {
        const list = [];
             const biggest = (arr: []): number => arr.length;
        return list
    }
    return masterArr
};