const knex = require('../knex')

exports.getRestaurant = async(restaurantId) => {
    return await knex('menu').where({
        restaurantId: restaurantId
    })
}

exports.deleteRestaurant = async(restaurantId) => {
    await knex('menu')
        .Where('restaurantId', restaurantId)
        .del()
}

exports.insertRestuarant = async(restaurant) => {
    await knex('menu').insert({
        restaurantName : restaurant.restaurantName,
        restaurantLocation : restaurant.restaurantLocation,
        timeOpenClose : restaurant.timeOpenClose,
        restaurantPhone : restaurant.restaurantPhone
    })
}

exports.updateMenu = async(menu) => {
    await knex('menu').where('menuId', '=', menu.menuId).andWhere('restaurantId', '=', menu.restaurantId)
        .update({
            menuName: menu.menuName,
            menuPrice: menu.menuPrice,
            menuPathImage: menu.menuPathImage,
            categoryId: menu.categoryId,
        })
}