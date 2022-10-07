const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require('cookie-parser');
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


const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
     console.log(`server running on: ${PORT}`)
})

