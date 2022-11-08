const { Router } = require('express');
const { Pokemon } = require('../db');



const pokemonRouter = Router();



pokemonRouter.post('/', async (res, req) => {

    try {
        const {name, hp, attack, defense, speed, height, weight} = req.body;

        const newPokemon = await Pokemon.create({
            where: {
                name, 
                hp, 
                attack, 
                defense, 
                speed, 
                height, 
                weight
            }
        })
        return res.status(200).json(newPokemon)

    } catch (error) {

        return res.status(404).send('error')

    }
})

pokemonRouter.get('/', async (res, req) => {
    try {
        const allPokemons = await Pokemon.findAll()

        return res.status(200).json(allPokemons)
    } catch (error) {
        return res.status(404).send(error.message)
    }
})


module.exports = pokemonRouter;
