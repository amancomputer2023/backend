const { getDB } = require("../config/db");

const getAllFeedback = async() => {
    const db = getDB();
    return await db.collection("feedback").find({});
}

const addfeedback = async (feedback) => {
    const db = getDB();
    return await db.collection("feedback").insertOne(feedback);
};

module.exports = { addfeedback, getAllFeedback };
