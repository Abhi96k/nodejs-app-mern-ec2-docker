import { MongoClient } from "mongodb";

const password = encodeURIComponent(process.env.MONGO_PASSWORD?.trim());

if (!password) {
  throw new Error(
    "MONGO_PASSWORD is not defined or empty. Please check your environment variables."
  );
}

// Connection string for your MongoDB cluster
const connectionString = `mongodb+srv://abhisheknangare96k:${password}@cluster0.ajigh.mongodb.net/`;

let client;
let db;

async function connectToDatabase() {
  if (db) return db; // Reuse the existing connection if already established

  try {
    client = new MongoClient(connectionString);
    await client.connect();
    console.log("MongoDB connection successful");

    db = client.db("integration_ninjas"); // Replace with your actual database name
    return db;
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    throw new Error("Failed to connect to MongoDB");
  }
}

export default connectToDatabase;
