const knex = require('../knex')

exports.getAllAccount = async () => {
    return await knex('account')
}

exports.getAllAccountByRestaurantIdAndPositionId = async (restaurantId, positionId) => {
    console.log(restaurantId,positionId);
    
    if (positionId === '3') {
        return await knex('account')
            .where('restaurantId', '=', restaurantId)
            .andWhere('positionId', '!=', positionId)
    } else if (positionId === '1') {
        return await knex('account')
            .where('restaurantId', '=', restaurantId)
            .andWhere('positionId', '!=', positionId)
            .andWhere('positionId', '!=', 3)
    } else{
        return {notPosition : false}
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
        username: account.username,
        password: account.password,
        email: account.email,
        name: account.name,
        surname: account.surname,
        phone: account.phone
    })
}

exports.updateAccount = async (account) => {
    await knex('account').where('accountId', '=', account.accountId)
        .update({
            email: account.email,
            name: account.name,
            surname: account.surname,
            phone: account.phone
        })
}

exports.deleteAccount = async (accountId) => {
    await knex('account').where('accountId', accountId).del()
}
