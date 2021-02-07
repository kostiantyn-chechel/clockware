const db = require("../models");
import { Request, Response} from 'express'
const { and, gt, lt } = db.Sequelize.Op;
const sequelize = db.sequelize;
const City = db.cities;
const User = db.users;
const Review = db.reviews;
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

exports.filterAdminData = async (req: Request, res: Response) => {
    const startData = req.query.start;
    const endData = req.query.end;
    const cityIdArr = req.query.cities ? JSON.parse(req.query.cities as string) : null;
    const masterIdArr = req.query.masters ? JSON.parse(req.query.masters as string): null;

    let listDateOrder = [];
    let listCityCount = [];
    let listMasterCount = [];
    let listMasterData = [];
    let listMastersTablesData: any[] = [];

    const where = {
        [and]: [
            {date: {[gt]: startData}},
            {date: {[lt]: endData}},
        ],
        masterId: masterIdArr,
        cityId: cityIdArr,
    };

    await Order.findAll({
        where: where,
        attributes: [
            'date',
            [sequelize.fn('count', sequelize.col('date')), 'count']
        ],
        group: ['date'],
        order: ['date'],
    }).then(response => listDateOrder = response);

    await Order.findAll({
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
    }).then(response => listCityCount = response);

    await Order.findAll({
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
    }).then(response => listMasterCount = response);

    await Order.findAll({  //MastersTable
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
    }).then(response => listMasterData = response);

    await User.findAll({
        where: {
            id: masterIdArr,
        },
        attributes: ['id','name'],
        include: [{
            model: Order,
            where: where,
            as: 'master_orders',
            attributes: [
                'hours',
                [sequelize.fn('count', sequelize.col('hours')), 'count']
            ],
        }],
        group: ['id', 'hours']
    }).then(response => listMastersTablesData = response);

    res.send({
        listDateOrder,
        listCityCount,
        listMasterCount,
        listMasterData,
        listMastersTablesData,
    });
};

const masterRatingById = async (id: number): Promise<number> => {
    return Review.findAll({
        where: {
            userId: id,
        },
        attributes: ['rating']
    }).then(rating => {
        const aaa = rating.map(item => item.rating);
        return aaa.reduce((a, b) => a + b, 0) / aaa.length;
    });
};