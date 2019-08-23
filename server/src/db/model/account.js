const knex = require('../knex')

exports.getAllAccount=async() => {
    return await knex('account')
}

exports.getAccountByUsername =async(userName) => {
    return await knex('account').where('username', '=', userName)
}

exports.getAccountById =async(accountId) => {
    return await knex('account').where('accountId', '=', accountId)
}

exports.insertAccount = async(account)=>{
    return await knex('account').insert({
        username: account.username,
        password : account.password,
        email: account.email,
        name: account.name,
        surname : account.surname,
        phone : account.phone
    })
}

exports.updateAccount = async(account) => {
    return await knex('account').where('accountId', '=', account.accountId)
        .update({
            email: account.email,
            name: account.name,
            surname : account.surname,
            phone : account.phone
        })
}

exports.deleteAccount = async(accountId) =>{
    return await knex('account').where('accountId',accountId).del()
}
