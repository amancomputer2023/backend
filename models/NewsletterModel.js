const { getDB } = require("../config/db");

const findNewsLetterSubscriber = async(email) => {
    const db = getDB();
    return await db.collection("newsletter").findone({email});
}

const insertNewsLetterSubscriber = async () => {
    const db = getDB();
    return await db.collection("newsletter").insertOne(service);
};

module.exports = { insertNewsLetterSubscriber, findNewsLetterSubscriber };
