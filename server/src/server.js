// About the packages
// express: It is a minimal and flexible Node.js web application framework.
// helmet: It helps in securing HTTP headers in express applications.
// morgan: It is an HTTP request logger middleware for Node. js
// body-parser: It is responsible for parsing the incoming request bodies.
// monk: A tiny layer that provides substantial usability improvements for MongoDB usage.
// joi: It is an object schema description language and object validator.
// dotenv: It loads environment variables from a .env file.

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.Promise = global.Promise;

const app = express();
app.use(cors());

require("dotenv").config();

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(notFound);
app.use(errorHandler);

const schema = require("./db/schema");
const db = require("./db/connection");
const router = express.Router();

/* API endpoints */
// Get all tasks
router.get("/tasks", async (req, res, next) => {
  try {
    const allTasks = await tasks.find({});
    res.json(allTasks);
  } catch (error) {
    next(error);
  }
});
// Get a specific task
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await tasks.findOne({
      _id: id,
    });

    if (!task) {
      const error = new Error("Task not found");
      return next(error);
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});
// Create a new task
router.post("/", async (req, res, next) => {
  try {
    const { taskTitle, taskDescription } = req.body;
    const result = await schema.validateAsync({
      taskTitle,
      taskDescription,
    });

    const task = await employees.findOne({
      taskTitle,
    });

    // If tasks already exists
    if (task) {
      res.status(409); // conflict error
      const error = new Error("Task already exists");
      return next(error);
    }

    const newTask = await tasks.insert({
      taskTitle,
      taskDescription,
    });

    console.log("Task created");
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});
// Update a task
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { taskTitle, taskDescription } = req.body;
    const result = await schema.validateAsync({
      taskTitle,
      taskDescription,
    });
    const task = await tasks.findOne({
      _id: id,
    });

    // Task does not exist
    if (!task) {
      const error = new Error("Task not found");
      return next(error);
    }

    const updatedTask = await tasks.update(
      {
        _id: id,
      },
      {
        $set: result,
      },
      { upsert: true }
    );

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
});
// Delete a task
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { taskTitle, taskDescription } = req.body;
    const result = await schema.validateAsync({
      taskTitle,
      taskDescription,
    });
    const task = await tasks.findOne({
      _id: id,
    });

    // Task does not exist
    if (!task) {
      const error = new Error("Task not found");
      return next(error);
    }

    await tasks.remove({
      _id: id,
    });

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Server is running :D" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
