const TaskModel = require('../models/task');

module.exports.read = async  (req, res) => {
  TaskModel.find({ addedBy: req.user._id }, (err, result) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.json({ result });
    }
  });
}

module.exports.addTask = async  (req, res) => {
  const { task } = req.body;

  const newTask = new TaskModel({ task });
  if (req.user) {
    newTask.addedBy = req.user._id;
  }

  await newTask.save();
  res.json({ message: "inserted data" });
}


module.exports.updateTask = async (req, res) => {
  const { newTask, id } = req.body;

  try {
     await TaskModel.findById(id, (error, taskToUpdate) => {
        taskToUpdate.task = newTask;
        taskToUpdate.save();
     })
  } catch (err) {
    res.status(500).json({ message: err });
  }

  res.json({ message: "updated1" })
}



module.exports.removeTask = async (req, res) => {
  const { id } = req.params;

  await TaskModel.findByIdAndRemove(id).exec();
  res.json({ message: "item deleted!" });
}
