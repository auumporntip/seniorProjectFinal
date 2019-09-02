const knex = require('../knex')

exports.getAllBill=async() => {
    return await knex('bill')
}

exports.updateBill = async(bill) => {
    return await knex('bill').where('billId', '=', bill.billId)
        .update({
            totalPrice: bill.totalPrice,
            eatTime: bill.eatTime,
            numOfCust:bill.numOfCust,
            typeId:bill.typeId,
            tableNumber : bill.tableNumber
        })
}

exports.insertBill = async(bill) => {
    return await knex('bill').insert({
            totalPrice: bill.totalPrice,
            eatTimeEnd: bill.eatTimeEnd,
            eatTimeStart: bill.eatTimeStart,
            numOfCust: bill.numOfCust,
            typeId:bill.typeId,
            tableNumber : bill.tableNumber
        })
}

exports.deleteBill = async (billId) => {
    return await knex('bill')
        .where('billId', billId)
        .del()
}