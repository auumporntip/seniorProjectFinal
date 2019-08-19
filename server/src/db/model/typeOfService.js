const knex = require('../knex')

exports.getAllTypeOfService=async() => {
    return await knex('typeofservice')
}
