const {Pokemon, Type} = require('../../db')
const {Router} = require('express')
const axios = require('axios')
const { UUID } = require('sequelize')



//------------ crea un pokemon en la db -------
const createPokemon = async (name, hp, attack, defense, speed, height, weight, types, image) => { // paso los parametros que eventualmente van a venir de forms

    const newPokemon = await Pokemon.create({ //usando el model de pokemon creo uno nuevo y lo devuelvo
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image
        }) 

        // Finds the Types linked
        let typeDb = await Type.findAll({
            where: {
                name: types
            }
        });
    
        // Links the Types to the Pokémon created
        newPokemon.addType(typeDb);
        
        return newPokemon;

}

//------------ getPokemons from api
const pokemonFromApi = async () => {

    const pokemonArr = [] // creo el array donde van a quedar todos los pokemones que me traigo de la api

    const apiData = await axios.get('https://pokeapi.co/api/v2/pokemon/') // con axios me traigo los primeros 20 pokemones

    const apiNext = await axios.get(apiData.data.next); // uso el next para traer los proximos 20 ya que necesito traer 40

    const allApi = [ // junto los dos resultados
        ...apiData.data.results,
        ...apiNext.data.results
    ]

    const pokemonByUrl = allApi.map(pokemon => {return axios(pokemon.url)}) // hago un arr nuevo con todos los pokemones en base a su url, lo traigo con axios para usar promesas

    return Promise.all(pokemonByUrl).then(r => { // por cada pokemon pusheo al arr que hice arriba solamente los elementos que necesito.
        r.forEach(p => {
                pokemonArr.push({
                    id: p.data.id,
                    name: p.data.name,
                    hp: p.data.stats[0].base_stat,
                    attack: p.data.stats[1].base_stat,
                    defense: p.data.stats[2].base_stat,
                    speed: p.data.stats[5].base_stat,
                    height: p.data.height,
                    weight: p.data.weigth,
                    types: p.data.types.map(t => t.type.name),
                    image: p.data.sprites.front_default
                })
            })
            return pokemonArr;
        }
    )
}

//-----------get Pokemons from db

const pokemonFromDb = async () => { // simplemente traigo todos los pokemones que fueron creados en la db

    const dbPokemons = await Pokemon.findAll({
        include: [{
            model: Type,
            atributes: ["name"],
            through: {
                atributes: [],
            },
        }],
    });

    return dbPokemons;
}

// ----------- gets all pokemons
const allPokemons = async () => { // concateno el arr de db y el de api en uno para despues devolver todos los pokemones
    const apiData = await pokemonFromApi()
    const dbData = await pokemonFromDb()
    const allData = apiData.concat(dbData)

    return allData

}

//--------- get pokemon by id

const pokemonById = async (id) => { //pasandole por parametro el id traigo el pokemon de ese id
    
    if (id.length > 5){
        const pokemonIdDb = await Pokemon.findByPk(id, 
           { include : [{
            model: Type,
            atributes: ["name"],
            through: {
                atributes: []
            }
        }]})
        return pokemonIdDb;
    } else {
        const pokemonIdApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return {
            id: pokemonIdApi.data.id,
            name: pokemonIdApi.data.name,
            hp: pokemonIdApi.data.stats[0].base_stat,
            attack: pokemonIdApi.data.stats[1].base_stat,
            defense: pokemonIdApi.data.stats[2].base_stat,
            speed: pokemonIdApi.data.stats[5].base_stat,
            height: pokemonIdApi.data.height,
            weight: pokemonIdApi.data.weight,
            types: pokemonIdApi.data.types.map(t => t.type.name),
            image: pokemonIdApi.data.sprites.front_default
        }
    }

}

//-------- get pokemon by name
const pokemonByName = async (name) => {

    //buscar todos los pokemones de api con atributo name
    //buscar todos los pokemones de db por findAll where
    // concatenar las respuestas

    const all = await allPokemons()

    const find = all?.filter(e => e.name.toLowerCase() === name.toLowerCase())

    return find;

    // const nameApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    // api = {
    //     id: nameApi.data.id,
    //     name: nameApi.data.name,
    //     hp: nameApi.data.stats[0].base_stat,
    //     attack: nameApi.data.stats[1].base_stat,
    //     defense: nameApi.data.stats[2].base_stat,
    //     speed: nameApi.data.stats[5].base_stat,
    //     height: nameApi.data.height,
    //     weight: nameApi.data.weigth,
    //     types: nameApi.data.types.map(t => t.type.name),
    //     image: nameApi.data.sprites.front_default
        
    // }

    // const nameDb = await Pokemon.findAll({
    //     where: {name}
    // })
    // return nameDb.concat(api);
}

const getType = async () => {
    let typeArr = []
    const apiTypes = await axios.get('https://pokeapi.co/api/v2/type')
    .then(response => response.data)
    apiTypes.results.forEach(t =>{
        typeArr.push({
            name: t.name,
        })
    })
    typeArr.forEach(t => {Type.findOrCreate({
        where: {
            name: t.name
        }
    })})
    return typeArr
}



module.exports = {
    createPokemon,
    pokemonFromApi,
    pokemonFromDb,
    allPokemons,
    pokemonById,
    pokemonByName,
    getType
}