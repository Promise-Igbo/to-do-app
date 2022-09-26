const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(cors());


// middleware for data on post request
app.use(express.json({extended: false}))

const todos = [
  {
    message: 'call mom',
    id: 1
  },
  {
    message: "eat chiken",
    id: 2
  },
  {
    message: "go to the coffe shop",
    id: 3
  }
]

app.get('/', (req, res) => {
    res.status(200).json(todos)
})

app.post('/', (req, res) => {

  const newTodo = {
  message: req.body.message,
  id: uuidv4()
  }

  todos.push(newTodo);
  res.status(201).json(todos)
})

app.delete('/:id', (req, res) => {
  const id = req.body.id;

  todos.findByIdAndDelete(id)
  res.status(200).json(todos)
})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
     console.log(`server running on: ${PORT}`)
})