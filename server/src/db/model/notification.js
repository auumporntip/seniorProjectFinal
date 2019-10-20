const knex = require('../knex')

exports.getAllNotification=async() => {
    return await knex('notification')
}

exports.updateNotification = async(notification) => {
    await knex('notification').where('notiId', '=', notification.notiId)
        .update({
            notiMessage: notification.notiMessage,
            restuarantId: notification.restuarantId,
            billId:notification.billId,
            update_at : Date(),
        })
}

exports.insertNotification = async(notification) => {
    return await knex('notification').insert({
        notiMessage: notification.notiMessage,
        restaurantId: notification.restaurantId,
        billId: notification.billId,
        created_at : Date(),
        update_at : Date(),
        })
}

exports.deletenotification = async (notificationId) => {
    await knex('notification')
        .where('notiId', notificationId)
        .del()
}