const UserModel = require('../models/user');
const TaskModel = require('../models/task');
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
   return jwt.sign({ id }, "Reem Janina super secret key", {
    expiresIn: maxAge,
   });
}

const handleErrors = (err) => {
   let errors = {email:"", password: ""}

   if(err.message === "Incorrect Email")
    errors.email = "This Email is not registered!"

    if(err.message === "Incorrect Password")
    errors.password = "This password is not correct!"

   if(err.code === 11000){
    errors.email = "Email Already registered"
    return errors;
   }

   if(err.message.includes("users validation failed")){
    Object.values(err.errors).forEach((properties) => {
        errors[properties.path] = properties.message;
    })
   }

   return errors;
}

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user =   await UserModel.create({ email, password })
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    })

    res.status(201).json({ user: user._id, created: true})
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user =   await UserModel.login( email, password )
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    })

    res.status(200).json({ user: user._id, created: true})
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }

}


module.exports.read = async (req, res) => {
  TaskModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
}

module.exports.addTask = async (req, res) => {
  const task = req.body.task;

  const newTask = new TaskModel({ task: task });
  await newTask.save();
  res.send("inserted data");
}


module.exports.updateTask = async (req, res) => {
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
}



module.exports.removeTask = async (req, res) => {
  const id = req.params.id;

  await TaskModel.findByIdAndRemove(id).exec();
  res.send("item deleted!");
}