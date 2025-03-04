const { getDB } = require("../config/db");

const findNewsLetterSubscriber = async(email) => {
    const db = getDB();
    return await db.collection("newsletter").findOne({email});
}

const insertNewsLetterSubscriber = async (subscriber) => {
    const db = getDB();
    return await db.collection("newsletter").insertOne(subscriber);
};

module.exports = { insertNewsLetterSubscriber, findNewsLetterSubscriber };
