const knex = require('../knex')

exports.getAllCategory = async () => {
    return await knex('category')
}

exports.getCategory = async (restaurantId) => {
    return await knex('category').where({
        restaurantId: restaurantId
    })
}

exports.deleteCategory = async (categoryId) => {
    await knex('category')
        .where('categoryId', categoryId)
        .del()
}

exports.insertCategory = async (category) => {
    return await knex('category').insert({
        categoryName: category.categoryName,
        restaurantId: category.restaurantId,
        created_at : category.created_at,
        update_at : category.update_at,
    })
}

exports.updateCategory = async (category) => {
    await knex('category').where('categoryId', '=', category.categoryId).update({
        categoryName: category.categoryName,
        restaurantId: category.restaurantId,
        update_at : Date(),
    })
}