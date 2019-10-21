const knex = require('../knex')

exports.getAllBill = async () => {
    return await knex('bill')
}

exports.getBillByBillId = async (billId) => {
    return await knex('bill').where('billId', '=', billId)
}

exports.updateBill = async (bill) => {
    await knex('bill').where('billId', '=', bill.billId)
        .update({
            totalPrice: bill.totalPrice,
            eatTime: bill.eatTime,
            numOfCust: bill.numOfCust,
            typeId: bill.typeId,
            tableNumber: bill.tableNumber,
            update_at : bill.update_at,
        })
}

exports.insertBill = async (bill) => {

    return await knex('bill').insert({
        totalPrice: bill.totalPrice,
        eatTimeEnd: bill.eatTimeEnd,
        eatTimeStart: bill.eatTimeStart,
        numOfCust: bill.numOfCust,
        typeId: bill.typeId,
        tableNumber: bill.tableNumber,
        created_at : bill.created_at,
        update_at : bill.update_at,
    })
}

exports.deleteBill = async (billId) => {
    await knex('bill')
        .where('billId', billId)
        .del()
}