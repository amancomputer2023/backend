const { getDB } = require("../config/db");

const Cart = async()=>{
    const db = getDB();
    return await db.collection("cart");
}

module.exports = { Cart };