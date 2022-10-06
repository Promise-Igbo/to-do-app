const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TaskModel = require('./models/task');
const UserModel = require("./models/user")
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const { checkUser } = require("./Middlewares/authMiddleware");


app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}))

// middleware for data on post request
app.use(cookieParser());
app.use(express.json())
app.use("/", authRoutes);


/// DATABASE CONNECTION
mongoose.connect(
  "mongodb://localhost:27017/TodoList?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { 
    useNewUrlParser: true,
  }
).then(() => {
  console.log("DB connected successfully");
}).catch((err) => {
  console.log(err.message);
})

app.get("/read", async (req, res) => {
  TaskModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


app.post("/addTask", async (req, res ) => {
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

