const knex = require('../knex')

exports.getAllTypeOfService=async() => {
    return await knex('typeofservice')
}


exports.updateTypeOfService = async(typeOfService) => {
    await knex('typeOfService').where('typeId', '=', typeOfService.typeId)
        .update({
            typeName:typeOfService.typeName,
            typeTime:typeOfService.typeTime,
            typePrice:typeOfService.typePrice
        })
}

exports.insertTypeOfService = async(typeOfService) => {
    return await knex('typeOfService').insert({
        typeName:typeOfService.typeName,
        typeTime:typeOfService.typeName,
        typePrice:typeOfService.typePrice,
        restaurantId:typeOfService.restaurantId
        })
}

exports.deleteTypeOfService = async (typeOfServiceId) => {
    await knex('typeOfService')
        .where('typeId','=', typeOfServiceId.typeId)
        .del()
}
