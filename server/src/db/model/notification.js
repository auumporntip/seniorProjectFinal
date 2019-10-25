const knex = require('../knex')

exports.getAllNotification=async() => {
    return await knex('notification')
}

exports.getCheckBill=async() => {
    return await knex('notification').where('notiMessage','=','check bill')
}
exports.getOtherNotification=async() => {
    return await knex('notification').where('notiMessage','!=','check bill')
}

exports.updateNotification = async(notification) => {
    await knex('notification').where('notiId', '=', notification.notiId)
        .update({
            notiMessage: notification.notiMessage,
            restuarantId: notification.restuarantId,
            billId:notification.billId
        })
}

exports.insertNotification = async(notification) => {
    return await knex('notification').insert({
        notiMessage: notification.notiMessage,
        restaurantId: notification.restaurantId,
        billId: notification.billId,
        })
}

exports.deletenotification = async (notificationId) => {
    await knex('notification')
        .where('notiId', notificationId)
        .del()
}