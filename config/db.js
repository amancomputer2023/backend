const { MongoClient, GridFSBucket } = require("mongodb");

const uri = "mongodb://localhost:27017/";
let db, bucket;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = client.db("AmanComputer");
    bucket = new GridFSBucket(db, { bucketName: "uploads" });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// Export a function to get `db` and `bucket` safely after initialization
const getDB = () => {
  if (!db) throw new Error("Database not initialized. Call connectDB() first.");
  return db;
};

const getBucket = () => {
  if (!bucket) throw new Error("GridFSBucket not initialized. Call connectDB() first.");
  return bucket;
};

module.exports = { connectDB, getDB, getBucket };
