const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TaskModel = require('./models/task');
const UserModel = require("./models/user")
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(cors());

// middleware for data on post request
app.use(express.json())


/// DATABASE CONNECTION
mongoose.connect(
  "mongodb://localhost:27017/TodoList?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true }
);

app.get("/read", async (req, res) => {
  TaskModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username })

  if(user){
    res.status(500);
    res.send('user already exist');
    return;
  }

  await UserModel.create({ username, password })
  res.send('success');
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username })

  if(!user || user.password !== password){
    res.status(503);
    res.send('invalid login');
    return;
  }
  res.send('success');
})

app.post("/addTask", async (req, res) => {
   const task = req.body.task;

  const newTask = new TaskModel({ task: task });
  await newTask.save();
  res.send("inserted data");
});

app.put("/update", async (req, res) => {
    const newTask = req.body.newTask;
    const id = req.body.id;

    try {
       await TaskModel.findById(id, (error, taskToUpdate) => {
          taskToUpdate.task = newTask;
          taskToUpdate.save();
       })
    } catch (err) {
      console.log(err)
    }

    res.send("updated1")

})



app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await TaskModel.findByIdAndRemove(id).exec();
  res.send("item deleted!");
})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
     console.log(`server running on: ${PORT}`)
})

