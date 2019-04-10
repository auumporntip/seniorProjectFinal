const knex = require('../knex')

exports.getAllMenu = async(restaurantId) => {
    return await knex('menu').where({
        restaurantId: restaurantId
    })
}

exports.getMenuById = async(menuId, restaurantId) => {
    return await knex('menu').where('menuId', '=', menuId)
    .andWhere('restaurantId', '=', restaurantId)
}

exports.getMenuByCategory = async(categoryId, restaurantId) => {
    return await knex('menu').where('categoryId', '=', categoryId)
    .andWhere('restaurantId', '=', restaurantId)
}

exports.deleteMenu = async(menuId, restaurantId) => {
    await knex('menu')
        .where('menuId', menuId)
        .andWhere('restaurantId', restaurantId)
        .del()
}

exports.insertMenu = async(menu) => {
    await knex('menu').insert({
        menuName: menu.menuName,
        menuPrice: menu.menuPrice,
        menuPathImage: menu.menuPathImage,
        categoryId: menu.categoryId,
        restaurantId: menu.restaurantId
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