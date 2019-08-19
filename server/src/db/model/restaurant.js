const knex = require('../knex')

exports.getAllRestaurant = async () => {
    return await knex('restaurant')
}

exports.getRestaurant = async (accountId) => {
    return await knex('restaurant').where('accountId', accountId
    )
}

exports.getRestaurantByRestaurantId = async (restaurantId) => {
    return await knex('restaurant')
        .join('typeofrestaurant', 'typeofrestaurant.typeResId', '=', 'restaurant.typeResId')
        .where('restaurantId', restaurantId
        )
}

exports.deleteRestaurant = async (restaurantId) => {
    await knex('restaurant')
        .Where('restaurantId', restaurantId)
        .del()
}

exports.insertRestuarant = async (restaurant) => {
    return await knex('restaurant').insert({
        restaurantName: restaurant.restaurantName,
        restaurantLocation: restaurant.restaurantLocation,
        timeOpenClose: restaurant.timeOpenClose,
        restaurantPhone: restaurant.restaurantPhone,
        restaurantDescription: restaurant.restaurantDescription,
        typeResId: restaurant.typeResId,
        accountId: restaurant.accountId
    })
}

exports.updaterestaurant = async (restaurant) => {
    await knex('restaurant').where('restaurantId', '=', restaurant.restaurantId)
        .update({
            restaurantName: restaurant.restaurantName,
            restaurantLocation: restaurant.restaurantLocation,
            timeOpenClose: restaurant.timeOpenClose,
            restaurantPhone: restaurant.restaurantPhone,
            restaurantDescription: restaurant.restaurantDescription,
            typeResId: restaurant.typeResId
        })
}