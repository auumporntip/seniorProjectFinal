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
    await knex('typeOfRestaurant').where('typeResId', '=', typeOfRestaurant.typeResId).update({
        typeResName: typeOfRestaurant.typeResName
    })
}
exports.deleteTypeOfRestaurant = async (typeOfRestaurantId) => {
    await knex('typeOfRestaurant').where('typeResId', '=', typeOfRestaurantId).del()
}