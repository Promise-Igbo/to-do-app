import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Todos from './components/Todos';
import PreLoader from './components/PreLoader';
import Header from './components/Header';
import TodoInput from './components/TodoInput';

function App() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8080");
      setTodos(res.data);
    }

    fetchData();
  }, [])

  const createInput = async (text) => {
    const res = await axios.post("http://localhost:8080", { message: text });
    setTodos(res.data);
  }

  const DeleteTask =  (id) => {
  //  console.log("hello")

    axios.delete(`http://localhost:8080/delete/${id}`).then(() => {
      setTodos(
        todos.filter((val) => {
          return val._id !== id;
        })
      )
    })
  }

  return (
    <div className="App">
      <div className='container'>
      <Header />
      <TodoInput createInput={createInput} />
      {todos ? <Todos todos={todos} DeleteTask={DeleteTask} /> : <PreLoader />}
      </div>
    </div>
  );
}

export default App;
