const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("order_management");
    const collection = database.collection("orders");

    const orders = await collection.find({}).toArray();
    console.log(orders);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
