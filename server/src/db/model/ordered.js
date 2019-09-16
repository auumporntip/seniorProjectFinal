const knex = require('../knex')

exports.getAllOrdered = async () => {
    return await knex('ordered')
}

exports.updateOrdered = async (ordered) => {
    await knex('ordered').where('orderId', '=', ordered.orderId)
        .update({
            pricePerPiece: ordered.pricePerPiece,
            amount: ordered.amount,
            menuId: ordered.menuId,
            statusId: ordered.statusId,
            billId: ordered.billId
        })
}

exports.insertOrdered = async (ordered) => {
    return await knex('ordered').insert({
        pricePerPiece: ordered.pricePerPiece,
        amount: ordered.amount,
        menuId: ordered.menuId,
        statusId: ordered.statusId,
        billId: ordered.billId
    })
}

exports.deleteOrdered = async (orderedId) => {
    await knex('ordered')
        .where('orderId', orderId)
        .del()
}
exports.getOrderedByResturantId = async (restaurantId) => {
    return await knex('ordered')
        .join('bill', 'bill.billId', '=', 'ordered.billId')
        .join('menu', 'menu.menuId', '=', 'ordered.menuId')
        .join('status', 'status.statusId', '=', 'ordered.statusId')
        .where('menu.restaurantId', '=', restaurantId)
}

exports.getOrderedByBillId = async (billId) => {
    console.log(billId)
    return await knex('ordered')
        .join('bill', 'bill.billId', '=', 'ordered.billId')
        .join('menu', 'menu.menuId', '=', 'ordered.menuId')
        .join('status', 'status.statusId', '=', 'ordered.statusId')
        .where('ordered.billId', '=', billId)
}

