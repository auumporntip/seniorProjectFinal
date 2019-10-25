const knex = require('../knex')

exports.getAllTablechairs = async () => {
    return await knex('tablechairs')
}

exports.insertTablechairs = async (table) => {
    return await knex('tablechairs').insert({
        tableNumber: table.tableNumber
    })
}
exports.updateTablechairs = async (table) => {
    await knex('tablechairs').where('tableId', '=', table.tableId).update({
        tableNumber: table.tableNumber
    })
}
exports.deleteTablechairs = async (tableId) => {
    await knex('tablechairs').where('tableId', '=', tableId).del()
}
