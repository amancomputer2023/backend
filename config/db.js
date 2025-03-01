const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://gajrajchakrawarti12:GajrajChakrawarti@cluster0.gwfuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await client.connect();
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const getDB = () => client.db("AmanComputer");

module.exports = { connectDB, getDB };
