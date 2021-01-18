const db = require("../models");
import { Request, Response } from 'express'
const City = db.cities;
const Master = db.masters;

exports.listAllCityWithMasters = (req: Request, res: Response) => {
    City.findAll({
        // where:{
        //     id: 0
        // },
        attributes: ['id', 'name'],
        include: [{
            model: Master,
        }]
    }).then(data => res.send(data))
};