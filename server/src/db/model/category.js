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
    try {

        await knex('category')
            .where('categoryId', categoryId)
            .del()
    } catch (error) {
        return false
    }
}

exports.insertCategory = async (category) => {
    return await knex('category').insert({
        categoryName: category.categoryName,
        restaurantId: category.restaurantId
    })
}

exports.updateCategory = async (category) => {
    await knex('category').where('categoryId', '=', category.categoryId).update({
        categoryName: category.categoryName,
        restaurantId: category.restaurantId
    })
}