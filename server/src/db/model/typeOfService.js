const knex = require('../knex')

exports.getAllTypeOfService = async () => {
    return await knex('typeofservice')
}
exports.getAllTypeOfServiceByTypeId = async (typeId) => {
    return await knex('typeofservice').where('typeId', '=', typeId)
}

exports.getTypeOfServiceByRestaurantId = async (restaurantId) => {
    return await knex('typeofservice').where('restaurantId', '=', restaurantId)
}

exports.updateTypeOfService = async (typeOfService) => {
    await knex('typeofservice').where('typeId', '=', typeOfService.typeId)
        .update({
            typeName: typeOfService.typeName,
            typeTime: typeOfService.typeTime,
            typePrice: typeOfService.typePrice,
            typePathImage: typeOfService.typePathImage,
            service: typeOfService.service
        })
}

exports.insertTypeOfService = async (typeOfService) => {
    return await knex('typeofservice').insert({
        typeName: typeOfService.typeName,
        typeTime: typeOfService.typeTime,
        typePrice: typeOfService.typePrice,
        typePathImage: typeOfService.typePathImage,
        service: typeOfService.service,
        restaurantId: typeOfService.restaurantId
    })
}

exports.deleteTypeOfService = async (typeOfServiceId) => {
    try {
        await knex('typeofservice')
            .where('typeId', '=', typeOfServiceId)
            .del()
    } catch (error) {
        return false
    }
}
