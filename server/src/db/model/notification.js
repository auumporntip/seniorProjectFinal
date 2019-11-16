const knex = require('../knex')

exports.getAllNotification = async () => {
    return await knex('notification')
}

exports.getNotificationByBillId = async (billId) => {
    return await knex('notification')
        .where('billId', '=', billId)
}

exports.getCheckBill = async () => {
    return await knex('notification')
        .join('bill', 'bill.billId', '=', 'notification.billId')
        .where('notiMessage', '=', 'check bill')
        .andWhere('notification.notiStatus', '=', 0)
        .orderBy('notification.created_at')
}
exports.getOtherNotification = async () => {
    return await knex('notification')
        .join('bill', 'bill.billId', '=', 'notification.billId')
        .where('notiMessage', '!=', 'check bill')
        .andWhere('notification.notiStatus', '=', 0)
        .orderBy('notification.created_at')
}

exports.updateNotification = async (notification) => {
    await knex('notification').where('notiId', '=', notification.notiId)
        .update({
            notiMessage: notification.notiMessage,
            restuarantId: notification.restuarantId,
            billId: notification.billId,
            notiStatus: notification.notiStatus
        })
}

exports.insertNotification = async (notification) => {
    return await knex('notification').insert({
        notiMessage: notification.notiMessage,
        restaurantId: notification.restaurantId,
        billId: notification.billId,
        notiStatus: 0
    })
}

exports.deletenotification = async (notificationId) => {
    await knex('notification')
        .where('notiId', notificationId)
        .del()
}

exports.changeStatusNotification = async (notificationId) => {
    await knex('notification')
        .where('notiId', notificationId)
        .update({
            notiStatus: 1
        })
}