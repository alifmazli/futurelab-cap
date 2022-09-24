// About the packages

// express: It is a minimal and flexible Node.js web application framework.
// helmet: It helps in securing HTTP headers in express applications.
// morgan: It is an HTTP request logger middleware for Node. js
// body-parser: It is responsible for parsing the incoming request bodies.
// monk: A tiny layer that provides substantial usability improvements for MongoDB usage.
// joi: It is an object schema description language and object validator.
// dotenv: It loads environment variables from a .env file.

const { application } = require("express");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const monk = require('monk');

app.get("/api", (req, res) => {
  res.json({
    users: ["userOne", "userTwo", "userThree"],
  });
});

app.listen(5000, () => { console.log("Server started on port 5000") });