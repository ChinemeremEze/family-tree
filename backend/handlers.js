"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const createUser = async (req, res) =>{
  try{
    const username = req.body.userName;
      if(!username){
          return res.status(400).json({status: 400, message: "Username is required"});
      }
      //create a client and connect to the database
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const db = client.db("GiftCoin");
      //add the new user if a user with that username does not exists, sends error message if the user does
      const userExists =  await db.collection("users").findOne({username});
      if(userExists){
          return res.status(400).json({status: 400, message: "Username taken"});
      }
      const user = {
          "email": username,
          "date_created": new Date(),
          "image_url": null,
          "role": "user",
      }
      await db.collection("users").insertOne(user);
      client.close();
      res.status(200).json({status: 200, message:"User created", data: user});
  }catch (err){
      console.log(err)
      res.status(400).json({status:400, message:"Caught an error"});
  }
  
}
const updateUser = async(req, res) =>{

}
const getUser = async(req, res) =>{
  try{
    const username = req.body.userName;
    if(!username){
        return res.status(400).json({status: 400, message: "Username required to get a user"});
    }
    //create a client and connect to the database
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GiftCoin");
    //return the user if a user with that username is found, sends error message if the user does not
    const userExists = await db.collection("users").findOne({username});
    if(!userExists){
        return res.status(400).json({status: 400, message: "Username does not exist"});
    }
    client.close();
    res.status(200).json({status: 200, message:"User found", data: userExists});
}catch (err){
    res.status(400).json({status:400, message:"Caught an error"});
} 
}
const deleteUser = async(req, res) =>{
  try{
    const username = req.body.userName;
    if(!username){
        return res.status(400).json({status: 400, message: "Username required to delete a user"});
    }
    //create a client and connect to the database
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GiftCoin");

    //delete the user if a user with that username is found, sends error message if the user does not
    const userExists =  await db.collection("users").findOne({username});
    if(!userExists){
        return res.status(400).json({status: 400, message: "Username  does not exist"});
    }
    await db.collection("users").deleteOne(userExists);
    client.close();
    res.status(500).json({status: 500, message:"User deleted"});
  }catch (err){
      res.status(400).json({status:400, message:"Caught an error"});
  } 
}
const getUsers = async(req, res) =>{
  try{
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GiftCoin");
  
    const users = await db.collection("users").find().toArray();
    console.log(users);
  
    if (users.length === "0") {
      return res
        .status(404)
        .json({ status: "404", message: "No users are in this collection" });
    }
     res.status(200).json({ status: "200", message: "Success", data: users });
  
    // close the connection to the database server
    client.close();
  
    console.log("disconnected!");
    }catch(err){
        console.log(err);
        res.status(400).json({status:400, message:"Caught an error"});
    }
}
module.exports = { createUser, updateUser, getUser, deleteUser, getUsers };
