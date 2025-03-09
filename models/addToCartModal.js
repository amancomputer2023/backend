const { getDB } = require("../config/db");

async function getCartCollection() {
    const db = getDB();
    return db.collection("cart"); // Returns the cart collection
}

module.exports = { getCartCollection };
