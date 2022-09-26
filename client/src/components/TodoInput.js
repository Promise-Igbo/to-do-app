import React, { useRef }from 'react';
import "./TodoInput.css";

const TodoInput = ({ createInput }) => {
  const todoinput = useRef("")
   
  const handleSubmit = (e) => {
      e.preventDefault();

      createInput(todoinput.current.value)
      e.target.value = " "
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={todoinput} required className='input'/>
      <input type="submit" className='submitbtn' />
    </form>
  )
}

export default TodoInput
