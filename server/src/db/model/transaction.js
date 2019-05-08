const knex = require('../knex')

exports.getTransaction = async (restaurantId) => {
    return await knex('transaction')
        .join('menu', 'menu.menuId', '=', 'transaction.menuId')
        .join('status', 'status.statusId', '=', 'transaction.statusId')
        .join('bill', 'bill.billId', '=', 'transaction.billId')
        .join('category', 'category.categoryId', '=', 'menu.categoryId')
        .where('menu.restaurantId', '=', restaurantId)
}

exports.getTransactionByCategory = async (restaurantId,categoryId) => {
    return await knex('transaction')
        .join('menu', 'menu.menuId', '=', 'transaction.menuId')
        .join('status', 'status.statusId', '=', 'transaction.statusId')
        .join('bill', 'bill.billId', '=', 'transaction.billId')
        .join('category', 'category.categoryId', '=', 'menu.categoryId')
        .where('menu.restaurantId', '=', restaurantId)
        .andWhere('category.categoryId', '=', categoryId)
}