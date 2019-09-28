const knex = require('../knex')

exports.getAllTypeOfService=async() => {
    return await knex('typeofservice')
}

exports.getTypeOfServiceByRestaurantId=async(restaurantId) => {
    return await knex('typeofservice').where('restaurantId','=',restaurantId)
}

exports.updateTypeOfService = async(typeOfService) => {
    await knex('typeOfService').where('typeId', '=', typeOfService.typeId)
        .update({
            typeName:typeOfService.typeName,
            typeTime:typeOfService.typeTime,
            typePrice:typeOfService.typePrice,
            typePathImage:typeOfService.typePathImage
        })
}

exports.insertTypeOfService = async(typeOfService) => {
    return await knex('typeOfService').insert({
        typeName:typeOfService.typeName,
        typeTime:typeOfService.typeTime,
        typePrice:typeOfService.typePrice,
        typePathImage:typeOfService.typePathImage,
        restaurantId:typeOfService.restaurantId
        })
}

exports.deleteTypeOfService = async (typeOfServiceId) => {
    await knex('typeOfService')
        .where('typeId','=', typeOfServiceId)
        .del()
}
