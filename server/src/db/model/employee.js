const knex = require('../knex')

exports.getAllEmployee=async() => {
    return await knex('employee')
}
