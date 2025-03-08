const { getDB } = require("../config/db");

const getAllFeedback = async(limit = 4) => {
    const db = getDB();
    return await db.collection("feedback").find({}).sort({ createdAt: -1 }).limit(limit).toArray();
}

const addfeedback = async (feedback) => {
    const db = getDB();
    return await db.collection("feedback").insertOne(feedback);
};

module.exports = { addfeedback, getAllFeedback };
