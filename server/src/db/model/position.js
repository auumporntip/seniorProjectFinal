const knex = require('../knex')

exports.getAllPosition = async () => {
    return await knex('position')
}

exports.insertPosition = async (position) => {
    return await knex('position').insert({
        positionName: position.positionName,
        created_at : Date(),
        update_at : Date(),
    })
}
exports.updatePosition = async (position) => {
    await knex('position').where('positionId', '=', position.positionId).update({
        positionName: position.positionName,
        update_at : Date(),
    })
}
exports.deletePosition = async (positionId) => {
    await knex('position').where('positionId', '=', positionId).del()
}
