const knex = require('../knex')

exports.getAllTypeOfRestaurant = async() => {
    return await knex('typeofrestaurant')
}

exports.insertTypeOfRestaurant = async(typeOfRestaurant)=>{
    return await knex('typeofrestaurant').insert({
        typeResName:typeOfRestaurant.typeResName
    })
}

exports.updateTypeOfRestaurant = async (typeOfRestaurant) => {
    await knex('typeOfRestaurant').where('typeOfRestaurantId', '=', typeOfRestaurant.typeOfRestaurantId).update({
        typeOfRestaurantName: typeOfRestaurant.typeOfRestaurantName
    })
}
exports.deleteTypeOfRestaurant = async (typeOfRestaurantId) => {
    await knex('typeOfRestaurant').where('typeOfRestaurantId', '=', typeOfRestaurantId).del()
}