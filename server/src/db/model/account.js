const knex = require('../knex')

exports.getAccount =async(userName) => {
    return await knex('account').where('username', '=', userName).select('password')
}

exports.getAccountById =async(accountId) => {
    return await knex('account').where('accountId', '=', accountId)
}

exports.insertAccount = async(account)=>{
    await knex('account').insert({
        accountId: account.accountId,
        userName: account.userName,
        password : account.password,
        email: account.email,
        name: account.name,
        surname : account.surname,
        phone : account.phone
    })
}

exports.updateAccount = async(Account) => {
    await knex('menu').where('menuId', '=', account.accountId)
        .update({
            email: account.email,
            name: account.name,
            surname : account.surname,
            phone : account.phone
        })
}
