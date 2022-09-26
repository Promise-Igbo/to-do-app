const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  }
});

const TaskModel = mongoose.model("tasks", TaskSchema);

module.exports = TaskModel;