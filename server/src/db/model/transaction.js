const knex = require('../knex')

exports.getTransaction = async(restaurantId) => {
    return await knex('menu').where({
        restaurantId: restaurantId
    })
}

exports.deleteTransaction = async(restaurantId,transactionId) => {
    await knex('menu')
        .Where('restaurantId', restaurantId)
        .andWhere('transactionId',transactionId)
        .del()
}

exports.insertTransaction = async(transaction) => {
    await knex('menu').insert({

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