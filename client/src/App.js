import { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import Header from './components/Header';


function App() {
  const [task, setTask] = useState("");
  const [listOfTasks, setListOfTask] = useState([]);


  const addTask = () => {
      Axios.post("http://localhost:8080/addTask",
       { task: task })
       .then(() => {
        setListOfTask([...listOfTasks, { task: task}])
       })
  };


  const updateTask = (id) => {
      const newTask = prompt("Enter new task");

      Axios.put("http://localhost:8080/update", { newTask: newTask, id: id}).then(() => {
        setListOfTask(listOfTasks.map((val) => {
           return val._id === id ? { _id: id, task: newTask} : val;
        }))
      })
  }

  const deleteTask = (id) => {
    Axios.delete(`http://localhost:8080/delete/${id}`).then(() => {
        setListOfTask(
          listOfTasks.filter((val) => {
            return val._id !== id;
          })
        )
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:8080/read")
    .then((response)  => {
     setListOfTask(response.data)
   })
   .catch(() => {
     console.log("Err");
   });
  }, [setListOfTask, listOfTasks]);



  return (
    <div className="App">
      <Header />
      <div className='container'>
            <input 
            className='input'
            type="text" 
            placeholder='Add your to do task...'
            onChange={(e) => {
              setTask(e.target.value)
            }}
            />
      <button className='submitbtn' onClick={addTask}>Add task</button>

      { listOfTasks.length > 0 && listOfTasks.map((val) => (
            <div key={val._id} id={val._id} className='todoitem'>
                 <h1>{val.task}</h1>
                 <button 
                 className='updatebtn'
                 onClick={()=> {
                    updateTask(val._id);
                 }}
                 >
                  Update
                 </button>
                 <button 
                 className='removebtn'
                 onClick={()=> { 
                  deleteTask(val._id) 
                }}
                 >
                  Remove
                  </button>
           </div>
              ))
      }

      </div>
    </div>
  );
}

export default App;
