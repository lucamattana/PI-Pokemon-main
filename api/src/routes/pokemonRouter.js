const {Pokemon} = require('../db')
const { Router } = require('express');
const { createPokemon, allPokemons, pokemonById, pokemonByName } = require('./Controllers/Controllers');



const pokemonRouter = Router();

pokemonRouter.get('/', async (req, res) => {
    const { name } = req.query

    try {

        if(!name) {
            const allPokemon = await allPokemons()
        
            return res.status(200).json(allPokemon)
        } else {
            const pokemons = await pokemonByName(name)

            res.status(200).json(pokemons)
        }
  } catch (error) {
    console.log(error)
    return res.status(404).json({message: 'Error: Ese pokemon no existe'})
  }
})

pokemonRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const pokemon = await pokemonById(id)

        res.status(200).json(pokemon)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: 'El id no existe'})
    }

})

pokemonRouter.post('/', async (req, res) => {
    try {
        const { name, hp, attack, defense, speed, height, weight, types} = req.body
        
        const exists = await Pokemon.findOne({
            where: {name}
        })
        if(exists) return res.status(400).send('A Pokemon with that name already exists')
       
        const newPokemon = await createPokemon(name, hp, attack, defense, speed, height, weight, types)

       return res.status(200).json(newPokemon, 'New Pokemon created successfully')
    } catch (error) {
        return res.status(404).send(error.message)
    }
})


module.exports = pokemonRouter;
