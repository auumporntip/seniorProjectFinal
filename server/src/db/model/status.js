const knex = require('../knex')

exports.getAllStatus=async() => {
    return await knex('status')
}
