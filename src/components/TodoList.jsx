import React from 'react'


export default function TodoList({ todo, toggleComplete, removeTodo, editTodo }) {
    // console.log("Todo:", todo);
    return (
    <div>
      <div className='todoContainer'>
      <label className='checkbox'>
      <input 
      type="checkbox"
      checked={todo.complete}
      onChange={() => toggleComplete(todo)}
      />
      {todo.complete ? <del>{todo.text}</del> : <span>{todo.text}</span>}
      </label>
      <div className='btnContainer'>
      <button className='delete' onClick={() => removeTodo(todo)} disabled={!todo.complete}>
        Delete
      </button>
      
      <button className='edit' onClick={() => editTodo(todo, prompt('Edit item', todo.text))}>
        Edit
      </button>
      </div>
   
        </div>

       
    </div>
  )
}

