const express = require('express');
const morgan = require('morgan');
const { createUser, updateUser, getUser, deleteUser, getUsers} = require("./handlers")
const PORT = 8000;

var app = express();

app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) =>{
  res.status(200).json({
      status: 200,
      message: "Welcome to Giftcoin backend"
  });
});
app.post('/user', createUser);
app.patch("/user", updateUser);
app.get("/user/:username", getUser);
app.delete("/user", deleteUser);
app.get("/users", getUsers);

const server = app.listen(PORT, function () {
  console.info('🌍 Listening on port ' + server.address().port);
});
