const knex = require('../knex')

exports.getAllStatus = async () => {
    return await knex('status')
}

exports.insertStatus = async (status) => {
    return await knex('status').insert({
        statusName: status.statusName,
        created_at: Date(),
        update_at: Date(),
    })
}
exports.updateStatus = async (status) => {
    await knex('status').where('statusId', '=', status.statusId).update({
        statusName: status.statusName,
        update_at : Date(),
    })
}
exports.deleteStatus = async (statusId) => {
    await knex('status').where('statusId', '=', statusId).del()
}
