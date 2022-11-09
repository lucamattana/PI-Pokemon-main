const { Router } = require('express');
const { Type } = require('../db');
const { getType } = require('./Controllers/Controllers');



const typeRouter = Router();


typeRouter.get('/', async (req, res) => {
    try {
        const types = await getType()

        return res.status(200).json(types)
    } catch (error) {
        return res.status(404).send({message: 'No se encuentran Types'})
    }
})

module.exports = typeRouter;