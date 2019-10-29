const knex = require('../knex')

exports.getAllAccount = async () => {
    return await knex('account')
}

exports.getAllAccountByRestaurantIdAndPositionId = async (restaurantId, positionId) => {
    console.log(restaurantId, positionId);

    if (positionId === '3') {
        return await knex('account')
            .where('restaurantId', '=', restaurantId)
            .andWhere('positionId', '!=', positionId)
    } else if (positionId === '1') {
        return await knex('account')
            .where('restaurantId', '=', restaurantId)
            .andWhere('positionId', '!=', positionId)
            .andWhere('positionId', '!=', 3)
    } else {
        return { notPosition: false }
    }
}

exports.getAccountByUsername = async (userName) => {
    return await knex('account').where('username', '=', userName)
}

exports.getAccountById = async (accountId) => {
    return await knex('account').where('accountId', '=', accountId)
}

exports.insertAccount = async (account) => {
    return await knex('account').insert({
        userName: account.userName,
        password: account.password,
        email: account.email,
        name: account.name,
        surname: account.surname,
        phone: account.phone,        
        restaurantId: 1,
        positionId: account.positionId
    })
}

exports.updateAccount = async (account) => {
    await knex('account').where('accountId', '=', account.accountId)
        .update({
            userName: account.userName,
            password: account.password,
            email: account.email,
            name: account.name,
            surname: account.surname,
            phone: account.phone,
            positionId: account.positionId
        })
}

exports.deleteAccount = async (accountId) => {
    await knex('account').where('accountId', accountId).del()
}
