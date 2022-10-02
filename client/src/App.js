import React, { useState } from 'react'
// import TaskItem from './components/TaskItem';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Welcome from './components/Welcome';
import Register from './components/Register';
import NavBar from './components/NavBar';
import Login from './components/Login';


export const credentialContext = React.createContext();


const App = () => {
const credentialState = useState(null)

  return (
    <div>
      <credentialContext.Provider value={credentialState}>
      <Router>
        <NavBar />
        <Routes>
        <Route  path='/' element={<Welcome />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/tasks' element={<TaskItem />} /> */}
        </Routes>

      </Router>
      </credentialContext.Provider>
    </div>
  )
}

export default App
