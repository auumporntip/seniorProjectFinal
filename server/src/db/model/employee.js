const knex = require('../knex')

exports.getAllEmployee=async() => {
    return await knex('employee')
}

exports.insertEmployee = async (employee) => {
    return await knex('employee').insert({
        empUsername: employee.empUsername,
        empPassword: employee.empPassword,
        empName:employee.empName,
        empPhone:employee.empPhone,
        empEmail:employee.empEmail,
        positionId:employee.positionId,
        restaurantId:employee.restaurantId
    })
}
exports.updateEmployee = async (employee) => {
    await knex('employee').where('employeeId', '=', employee.employeeId).update({
        empUsername: employee.empUsername,
        empPassword: employee.empPassword,
        empName:employee.empName,
        empPhone:employee.empPhone,
        empEmail:employee.empEmail,
        positionId:employee.positionId
    })
}
exports.deleteEmployee = async (employeeId) => {
    await knex('employee').where('employeeId', '=', employeeId).del()
}
