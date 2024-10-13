import express from "express";
import bodyParser from "body-parser";
import connectToDatabase from "./mongoC.js"; // MongoDB connection

const port = 4000;
const app = express();

// Enable CORS for all origins and headers
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Parses the text as URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as JSON
app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

// Add a user to the database
app.post("/addUser", async (req, res) => {
  try {
    const db = await connectToDatabase(); // Ensure DB connection
    const collection = db.collection("users");
    let newDocument = req.body;
    newDocument.date = new Date();

    const result = await collection.insertOne(newDocument);
    console.log("Request Body:", req.body);

    res.status(201).send(result); // 201 status code for a successful POST request
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get all users from the database
app.get("/getUsers", async (req, res) => {
  try {
    const db = await connectToDatabase(); // Ensure DB connection
    const collection = db.collection("users");
    const results = await collection.find({}).toArray();

    res.status(200).send(results); // 200 status code for successful GET request
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, function () {
  console.log("Server is listening at port:", port);
});
