const knex = require('../knex')

exports.getAllBill=async() => {
    return await knex('bill')
}
