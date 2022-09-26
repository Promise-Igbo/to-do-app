import React from 'react';
import TodoItem from './TodoItem';

const Todos = ({ todos, DeleteTask }) => {
  return todos.map((todo) => (
    <>
            <TodoItem key={todo.id} todo={todo} />
            <button type='button' onClick={(id) => {
              DeleteTask(id)
            }}>Remove</button>

</>
        ))
}

export default Todos
