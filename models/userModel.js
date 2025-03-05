const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb"); // Import ObjectId

const createUser = async (user) => {
  try {
    const db = getDB();
    const result = await db.collection("users").insertOne(user);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User creation failed");
  }
};

const findUserByEmail = async (email) => {
  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ email });
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("User lookup failed");
  }
};

const updateUser = async (id, updatedData) => {
  try {
    const db = getDB();
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

    return result.modifiedCount > 0 ? "User updated successfully" : "No changes made";
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("User update failed");
  }
};

module.exports = { createUser, findUserByEmail, updateUser };
