const docs = require("./user-init.json");

const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("Userdb");
    const users = database.collection("Userdb");

    const option = { ordered: true };
    const result = await users.insertMany(docs, option);

    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
