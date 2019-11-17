const knex = require('../knex')

exports.getAllOrdered = async () => {
    return await knex('ordered')
}

exports.updateOrdered = async (ordered) => {
    await knex('ordered').where('orderId', '=', ordered.orderId)
        .update({
            pricePerPiece: ordered.pricePerPiece,
            amount: ordered.amount,
            menuId: ordered.menuId,
            statusId: ordered.statusId,
            billId: ordered.billId
        })
}

exports.changeStatus = async (orderId,statusId) => {
    await knex('ordered').where('orderId', '=', orderId)
        .update({
            statusId: statusId,
        })
}

exports.insertOrdered = async (ordered) => {
    return await knex('ordered').insert({
        pricePerPiece: ordered.pricePerPiece,
        amount: ordered.amount,
        menuId: ordered.menuId,
        statusId: ordered.statusId,
        billId: ordered.billId
    })
}

exports.deleteOrdered = async (orderedId) => {
    await knex('ordered')
        .where('orderId', orderId)
        .del()
}
exports.getOrderedByResturantId = async (restaurantId) => {
    return await knex.select(
        'ordered.orderId','ordered.created_at','ordered.pricePerPiece'
        ,'ordered.amount','ordered.menuId','ordered.statusId'
        ,'ordered.billId','bill.totalPrice','bill.tableNumber','bill.numOfCust'
        ,'bill.eatTimeStart','bill.eatTimeEnd','menu.menuName','menu.menuPrice','menu.menuPathImage'
        ,'status.statusName')
        .from('ordered')
        .leftJoin('bill', 'bill.billId', '=', 'ordered.billId')
        .leftJoin('menu', 'menu.menuId', '=', 'ordered.menuId')
        .leftJoin('status', 'status.statusId', '=', 'ordered.statusId')
        .where('menu.restaurantId', '=', restaurantId)
        .orderBy('ordered.created_at','asc')
}

exports.getOrderedByStatusPrepareAndCooking = async (restaurantId) => {
    return await knex.select(
        'ordered.orderId','ordered.created_at','ordered.pricePerPiece'
        ,'ordered.amount','ordered.menuId','ordered.statusId'
        ,'ordered.billId','bill.totalPrice','bill.tableNumber','bill.numOfCust'
        ,'bill.eatTimeStart','bill.eatTimeEnd','menu.menuName','menu.menuPrice','menu.menuPathImage'
        ,'status.statusName')
        .from('ordered')
        .leftJoin('bill', 'bill.billId', '=', 'ordered.billId')
        .leftJoin('menu', 'menu.menuId', '=', 'ordered.menuId')
        .leftJoin('status', 'status.statusId', '=', 'ordered.statusId')
        .where('menu.restaurantId', '=', restaurantId)
        .andWhere('ordered.statusId','!=','3')
        .andWhere('ordered.statusId','!=','4')
        .andWhere('ordered.statusId','!=','5')
        .orderBy('ordered.created_at','asc')
}
exports.getOrderedByStatusServing = async (restaurantId) => {
    return await knex.select(
        'ordered.orderId','ordered.created_at','ordered.pricePerPiece'
        ,'ordered.amount','ordered.menuId','ordered.statusId'
        ,'ordered.billId','bill.totalPrice','bill.tableNumber','bill.numOfCust'
        ,'bill.eatTimeStart','bill.eatTimeEnd','menu.menuName','menu.menuPrice','menu.menuPathImage'
        ,'status.statusName','categoryName')
        .from('ordered')
        .leftJoin('bill', 'bill.billId', '=', 'ordered.billId')
        .leftJoin('menu', 'menu.menuId', '=', 'ordered.menuId')
        .leftJoin('category', 'category.categoryId', '=', 'menu.categoryId')
        .leftJoin('status', 'status.statusId', '=', 'ordered.statusId')
        .where('menu.restaurantId', '=', restaurantId)
        .andWhere('ordered.statusId','=','3')
        .orderBy('ordered.created_at','asc')
}

exports.getOrderedByBillId = async (billId) => {
    console.log(billId)
    return await knex('ordered')
        .join('bill', 'bill.billId', '=', 'ordered.billId')
        .join('menu', 'menu.menuId', '=', 'ordered.menuId')
        .join('status', 'status.statusId', '=', 'ordered.statusId')
        .where('ordered.billId', '=', billId)
        .andWhere('ordered.statusId','!=','5')
}


exports.getOrderedByStatusPreparing = async (restaurantId) => {
    return await knex.select(
        'ordered.orderId','ordered.created_at','ordered.pricePerPiece'
        ,'ordered.amount','ordered.menuId','ordered.statusId'
        ,'ordered.billId','bill.totalPrice','bill.tableNumber','bill.numOfCust'
        ,'bill.eatTimeStart','bill.eatTimeEnd','menu.menuName','menu.menuPrice','menu.menuPathImage'
        ,'status.statusName','category.categoryName')
        .from('ordered')
        .leftJoin('bill', 'bill.billId', '=', 'ordered.billId')
        .leftJoin('menu', 'menu.menuId', '=', 'ordered.menuId')
        .leftJoin('status', 'status.statusId', '=', 'ordered.statusId')
        .leftJoin('category', 'category.categoryId', '=', 'menu.categoryId')
        .where('menu.restaurantId', '=', restaurantId)
        .andWhere('ordered.statusId','!=','2')
        .andWhere('ordered.statusId','!=','3')
        .andWhere('ordered.statusId','!=','4')
        .andWhere('ordered.statusId','!=','5')
        .orderBy('ordered.created_at','asc')
}

exports.getOrderedByStatusCooking = async (restaurantId) => {
    return await knex.select(
        'ordered.orderId','ordered.created_at','ordered.pricePerPiece'
        ,'ordered.amount','ordered.menuId','ordered.statusId'
        ,'ordered.billId','bill.totalPrice','bill.tableNumber','bill.numOfCust'
        ,'bill.eatTimeStart','bill.eatTimeEnd','menu.menuName','menu.menuPrice','menu.menuPathImage'
        ,'status.statusName','category.categoryName')
        .from('ordered')
        .leftJoin('bill', 'bill.billId', '=', 'ordered.billId')
        .leftJoin('menu', 'menu.menuId', '=', 'ordered.menuId')
        .leftJoin('status', 'status.statusId', '=', 'ordered.statusId')
        .leftJoin('category', 'category.categoryId', '=', 'menu.categoryId')
        .where('menu.restaurantId', '=', restaurantId)
        .andWhere('ordered.statusId','!=','1')
        .andWhere('ordered.statusId','!=','3')
        .andWhere('ordered.statusId','!=','4')
        .andWhere('ordered.statusId','!=','5')
        .orderBy('ordered.created_at','asc')
}
