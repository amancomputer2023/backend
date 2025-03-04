const { getDB } = require("../config/db");

const findNewsLetterSubscriber = async(email) => {
    const db = getDB();
    return await db.collection("Newsletter").findone(email);
}

const insertNewsLetterSubscriber = async () => {
    const db = getDB();
    return await db.collection("Newsletter").insertOne(service);
};

module.exports = { insertNewsLetterSubscriber, findNewsLetterSubscriber };
