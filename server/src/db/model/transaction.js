const knex = require('../knex')

exports.getAllTransaction=async() => {
    return await knex('transaction')
}

exports.insertTransaction = async (transaction) => {
    return await knex('transaction').insert({
        menuName: transaction.menuName,
        transPrice: transaction.transPrice,
        totalPrice:transaction.totalPrice,
        amount: transaction.amount,
        statusName:transaction.statusName,
        billId:transaction.billId
    })
}
exports.updateTransaction = async (transaction) => {
    await knex('transaction').where('transId', '=', transaction.transId).update({
        menuName: transaction.menuName,
        transPrice: transaction.transPrice,
        totalPrice:transaction.totalPrice,
        amount: transaction.amount,
        statusName:transaction.statusName
    })
}
exports.deleteTransaction = async (transactionId) => {
    await knex('transaction').where('transId', '=', transId).del()
}
