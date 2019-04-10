const knex = require('../knex')

exports.getCategory = async(restaurantId) => {
    return await knex('category').where({
        restaurantId: restaurantId
    })
}

exports.deleteCategory = async(categoryId, restaurantId) => {
    await knex('category')
        .where('categoryId', categoryId)
        .andWhere('restaurantId', restaurantId)
        .del()
}

exports.insertMenu = async(category) => {
    await knex('menu').insert({
        categoryName: category.categoryName,
        restaurantId: category.restaurantId
    })
}
