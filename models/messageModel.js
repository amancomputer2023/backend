const { getDB } = require("../config/db");

const getAllMessages = async() => {
    const db = getDB();
    return await db.collection("message").find({});
}

const addMessage = async (message) => {
    const db = getDB();
    return await db.collection("message").insertOne(message);
};

module.exports = { addMessage, getAllMessages };
