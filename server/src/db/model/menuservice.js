const knex = require('../knex')

exports.getAllMenuService = async () => {
    return await knex('menuservice')
}

exports.insertMenuService = async (menuservice) => {
    return await knex('menuservice').insert({
        typeId: menuservice.typeId,
        menuId: menuservice.menuId,
        created_at : Date(),
        update_at : Date(),
    })
}
exports.updateMenuService = async (menuservice) => {
    await knex('menuservice').where('menuServiceId', '=', menuservice.menuSerViceId).update({
        typeId: menuservice.menuId,
        menuId: menuservice.menuId,
        update_at : Date(),
    })
}
exports.deleteMenuService = async (menuServiceId) => {
    await knex('menuservice').where('menuServiceId', '=', menuServiceId).del()
}
