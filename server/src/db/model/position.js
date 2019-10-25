const knex = require('../knex')

exports.getAllPosition = async () => {
    return await knex('position')
}

exports.getExceptPosition = async (positionId) => {
    return await knex('position').where('positionId','!=',positionId)
}

exports.insertPosition = async (position) => {
    return await knex('position').insert({
        positionName: position.positionName
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
