import { useEffect, useState } from 'react';
import './App.css';
function App() {
  // STATES
  const [newItem,setNewItem] = useState("")
  const [todos,setTodos] = useState(() =>{
    const localVal = localStorage.getItem("Items")
    if(localVal == null) return []
    return JSON.parse(localVal)
  })
  // HANDLES SUBMIT
  const handleSubmit = (event)=>{
    event.preventDefault()
    setTodos((current) =>{
      return [
        ...current,{
          id:crypto.randomUUID()
          ,title:newItem,completed:false},
      ]
    })
    setNewItem("")
  }
  // TOGGLES CHECKBOX
  const toggle = (id,completed) =>{
    setTodos((current) =>{
      return current.map(todo =>{
        if(todo.id === id)
        {
          todo.completed = completed
          return {...todo,completed}
        }
        return todo
      })
    })
  }
  // DELETES TODO
  const deleteTodo = (id) =>{
    setTodos(current =>{
      return current.filter((todo) => todo.id !== id
      )
    })
  }
  // useEffect Hook
  useEffect(() =>{
    localStorage.setItem("Items",JSON.stringify(todos))
  },[todos])
   return (
    <div className='main'>
    <form
    onSubmit={handleSubmit}
    className='new-item-form'>
      <div className='form-row'>
        <input type='text' id='item' 
        placeholder='Add Item...'
        value={newItem}
        onChange={(event) =>{
          setNewItem(event.target.value)
        }}
        />
      </div>
      <button className='btn submit-button'>Add</button>
    </form>
    <h1 className='header'>Todo List</h1>
    <ul className='list'>
      {todos.length === 0 && "No TODOS"}
      {
        todos.map((items) =>{
          return(
          <li>
          <label key={items.id}>
          <input className='checkbox' type='checkbox'
           checked={items.completed}
           onChange={(event) =>{
            toggle(items.id,event.target.checked)
           }}
           />
          <span>{items.title}</span>
          </label>
          <button
          onClick={()=>deleteTodo(items.id)}
          className='btn btn-danger'>Delete</button>
        </li>
        )
        })
      }

    </ul>
    </div>
  )
}

export default App;
