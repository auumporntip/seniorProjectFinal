const knex = require('../knex')

exports.getAllBill=async() => {
    return await knex('bill')
}

exports.updateBill = async(bill) => {
    return await knex('bill').where('billId', '=', bill.billId)
        .update({
            totalPrice: bill.totalPrice,
            eatTime: bill.eatTime,
            billDate : bill.billDate,
            tableNumber : bill.tableNumber
        })
}

exports.deleteBill = async (billId) => {
    return await knex('bill')
        .where('billId', billId)
        .del()
}