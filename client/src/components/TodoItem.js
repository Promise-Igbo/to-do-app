import React from 'react';
import './Todoitem.css';

const TodoItem = ({ todo }) => {

  // const handleRemove = (e, id) => {
  //   e.preventDefault();

  //   DeleteTask(id);

  // }


  return (
    <div className='todoitem'>
       <h1>{todo.message}</h1>
       {/* <button type='button' onClick={handleRemove}>Remove</button> */}
    </div>
  )
}

export default TodoItem
