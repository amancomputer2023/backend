const { getDB } = require("../config/db");

const getAllMessages = async () => {
  const db = getDB();
  return await db
    .collection("message")
    .find({})
    .sort({
      createdAt: -1,
    })
    .limit(10)
    .toArray();
};

const addMessage = async (message) => {
  const db = getDB();
  return await db.collection("message").insertOne(message);
};

module.exports = { addMessage, getAllMessages };
