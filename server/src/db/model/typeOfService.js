const knex = require('../knex')

exports.getAllTypeOfService=async() => {
    return await knex('typeofservice')
}


exports.updatetypeOfService = async(typeOfService) => {
    await knex('typeOfService').where('typeId', '=', typeOfService.typeId)
        .update({
            typeName:typeOfService.typeName,
            typeTime:typeOfService.typeTime,
            typePrice:typeOfService.typePrice
        })
}

exports.inserttypeOfService = async(typeOfService) => {
    return await knex('typeOfService').insert({
        typeName:typeOfService.typeName,
        typeTime:typeOfService.typeName,
        typePrice:typeOfService.typePrice,
        restuarantId:typeOfService.restuarantId
        })
}

exports.deletetypeOfService = async (typeOfServiceId) => {
    await knex('typeOfService')
        .where('typeOfServiceId', typeOfServiceId)
        .del()
}
