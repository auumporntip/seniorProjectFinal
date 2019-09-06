const knex = require('../knex')

exports.getAllMenuService = async () => {
    return await knex('menuservice')
}

exports.insertMenuService = async (menuservice) => {
    return await knex('menuservice').insert({
        typeId: menuservice.menuId,
        menuId: menuservice.menuId
    })
}
exports.updateMenuService = async (menuservice) => {
    await knex('menuservice').where('menuServiceId', '=', menuservice.menuSerViceId).update({
        typeId: menuservice.menuId,
        menuId: menuservice.menuId
    })
}
exports.deleteMenuService = async (menuserviceId) => {
    await knex('menuservice').where('menuServiceId', '=', menuServiceId).del()
}
