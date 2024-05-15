import './App.css';
import Header from './components/Header';
import TodoList from './components/TodoList';
import React, { useReducer , useState} from 'react';



const reducer=(state, action) => {
  console.log("Action:", action); 

  switch (action.type) {
    case "ADDITEM":
        return {
         todos: [action.payload, ...state.todos],
      };
      case "REMOVEITEM":
      return {
        todos: state.todos.filter(todo => todo !== action.payload),
      };
      case "COMPLETEITEM":
      return {
        todos: state.todos.map(todo => todo === action.payload ? {...todo, complete: !todo.complete}
          : todo
        ),
      };
      //------
      case "EDITITEM":
      return {
        todos: state.todos.map(todo => todo === action.payload.todo ? {...todo, text: action.payload.text} 
          : todo
        ),
      };
      
    default:
      return state
  }

}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    todos: []
  });
  const [newTodo, setNewTodo] = useState('');
  const [showAll, setShowAll] = useState(false);

  const addNewTodo = () => {
    if (state.todos.length >= 10) {
      alert("You can only add up to 10 items.");
      return; 
    }
    if (newTodo.trim() !== ''){
      dispatch({
        type: 'ADDITEM',
        payload:{
          text: newTodo,
          complete: false,
        },
      });
      setNewTodo('');
    }    
  };
  const removeTodo = todo => {
    dispatch({ type: 'REMOVEITEM', payload: todo});
  };
  const toggleComplete = todo => {
    dispatch({ type: 'COMPLETEITEM', payload: todo});
  };
  const editTodo = (todo, editText) => {
    dispatch({ type: 'EDITITEM', payload:{ todo, text: editText }});
  };
  const todosToShow = showAll ? state.todos : state.todos.slice(0, 7);
  return (
    <div className='app'>
      <Header/>
      <div className='input-container'>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button className='addBtn' onClick={addNewTodo}>Add Items</button>
      </div>
      <div >
        {todosToShow.map((todo, idx) => (
          <div key={idx}>
            <TodoList
              todo={todo}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
              editTodo={editTodo}
            />
            {idx < todosToShow.length - 1 && <hr />} 
          </div>
        ))}
         {!showAll && state.todos.length > 7 && (
         <button className='seeMore' onClick={() => setShowAll(true)}>See more</button>
      )}
      </div>
    </div>
  )
}


