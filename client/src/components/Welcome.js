import React, { useContext } from 'react';
import TaskItem from './TaskItem';
import './welcome.css';

import { credentialContext } from '../App';

const Welcome = () => {
 const [credentials, setCredentials] = useContext(credentialContext);


 const logout = () => {
  setCredentials(null);
 }

  return (
    <div>
       <div className='welcome'>
      <h1>Welcome {credentials &&  credentials.username} !</h1>
      {credentials && <button className='logout' onClick={logout}>Log out</button>}
      </div>
      {credentials && <TaskItem />}
    </div>
  )
}

export default Welcome
