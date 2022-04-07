"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getSeats = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("theatre");
  console.log("connected!");
  const result = await db.collection("seats").find().toArray();
  console.log(result);
  res
    .status(200)
    .json({ status: 200, seats: result, seatsPerRow: 12, numOfRows: 8 });

  client.close();
};
const updateSeat = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("theatre");
  console.log("connected!");
  const bookedBy = { name: req.body.name, email: req.body.email };
  const query = { _id: req.body._id };
  const newValues = { $set: { isBooked: true, bookedBy } };
  const seatCheck = await db.collection("seats").findOne(query);
  if (seatCheck.isBooked === false) {
    const result = await db.collection("seats").updateOne(query, newValues);
    console.log(result);

    res.status(200).json({ status: 200, seats: result, message: "success" });
  } else {
    res
      .status(400)
      .json({ status: 400, seats: result, message: "This seat is booked!" });
  }

  client.close();
};

module.exports = { getSeats, updateSeat };
