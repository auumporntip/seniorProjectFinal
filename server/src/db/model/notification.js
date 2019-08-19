const knex = require('../knex')

exports.getAllNotification=async() => {
    return await knex('notification')
}
