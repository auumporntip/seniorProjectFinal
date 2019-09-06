const knex = require('../knex')

exports.getAllNotification=async() => {
    return await knex('notification')
}

exports.updateNotification = async(notification) => {
    await knex('notification').where('notificationId', '=', notification.notificationId)
        .update({
            notiMessage: notification.notiMessage,
            restuarantId: notification.restuarantId,
            billId:notification.billId
        })
}

exports.insertNotification = async(notification) => {
    return await knex('notification').insert({
        notiMessage: notification.notiMessage,
        restuarantId: notification.restuarantId,
        billId : notification.billId
        })
}

exports.deletenotification = async (notificationId) => {
    await knex('notification')
        .where('notiId', notificationId)
        .del()
}