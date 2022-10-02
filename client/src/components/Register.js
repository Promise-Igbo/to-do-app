// import { Axios } from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { credentialContext } from '../App';

 export const handleErrors = async (response) => {
  if(!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
   return response;
}

const Register = () => {
   const [username, setUserName] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();
   const [, setCredentials] = useContext(credentialContext);



  const submitHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(handleErrors)
      .then( response => {
        setCredentials({
          username,
          password,
        })
        navigate('/');
      }).catch((error) => {
       setError(error.message);
    })
  }


  return (
    <div className='container m-5 p-8'>
      <h1>Resgister A new User</h1>
      {error && <span style={{ color: "red"}}>{error}</span>}
      <form onSubmit={submitHandler}>
  <div className="mb-3">
    <label className="form-label">USERNAME</label>
    <input 
    type="text" 
    className="form-control" 
    aria-describedby="emailHelp" 
    required 
    placeholder='your username' 
    onChange={(e) => setUserName(e.target.value)}
    />
  </div>
  <div className="mb-3">
    <label className="form-label">PASSWORD</label>
    <input 
    type="password" 
    className="form-control" 
    required 
    placeholder='your password'
    onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  <button type="submit" className="btn btn-primary">Register</button>
</form>
    </div>
  )
}

export default Register;
