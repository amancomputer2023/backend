const { getDB } = require("../config/db");

const createUser = async (user) => {
  const db = getDB();
  return await db.collection("users").insertOne(user);
};

const findUserByEmail = async (email) => {
  const db = getDB();
  return await db.collection("users").findOne({ email });
};

const updateUser = async (id , updatedData) => {
  const db = getDB();
  return await db
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
};

module.exports = { createUser, findUserByEmail, updateUser };
