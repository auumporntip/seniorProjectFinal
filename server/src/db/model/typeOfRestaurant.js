const knex = require('../knex')

exports.getTypeOfRestaurant = async() => {
    return await knex('typeofrestaurant')
}

exports.insertTypeOfRestaurant = async(typeOfRestaurant)=>{
    return await knex('typeofrestaurant').insert({
        typeResName:typeOfRestaurant.typeResName
    })
}