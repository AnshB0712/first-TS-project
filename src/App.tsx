import { useState,useReducer } from 'react'
import { InputField } from './components/InputField'
import { TodosList } from './components/TodosList'
import { Todo } from './model'

type Actions =
 | { type: 'ADD', payload: Todo }
 | { type: 'UPDATE', payload: {id: number,text:string} }
 | { type: 'REMOVE',payload: {id: number} }
 | { type: 'DONE', payload: {id: number} }
 
const reducer = (state: Todo[],action: Actions) => {
  const {type,payload} = action
  
  if(type==="ADD"){
  return [...state,payload]
  }
  
  if(type==="DELETE"){
  return [...state.filter(todo => todo.id!==payload)]
  }
  
  if(type==="DONE"){
  return [...state.map(todo => {
    if(todo.id!==payload) return todo
    return {...todo,isDone:!todo.isDone}
    })]
  }
  
  if(type==="UPDATE"){
  return [...state.map(todo => {
    
    if(todo.id !== payload.id)
    return todo
    
    return ({...todo,todo:payload.text})
    
  })]
  }
  
  return state
}

const initialState: Todo[] = []

const App: React.FC = () => {
  
  const [todo,setTodo] = useState<string>("")
  
  const [state,dispatch]:[Todo[],React.Dispatch<Actions>] = useReducer(reducer,initialState)
  
  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault()
    
    if(!todo) return
    
    dispatch({
      type:"ADD",
      payload:{
        id: Date.now(),
        todo,
        isDone: false}
    })
    
    setTodo("")
  
  }
  
  return (
  <div className="App">
    <span className="heading">
    Taskify
    </span>
    
    <InputField 
    todo={todo} 
    setTodo={setTodo}
    handleAdd={handleAdd}
    />
    
    <TodosList 
    todos={state} 
    dispatch={dispatch}/>
    
  </div>
  )
}

export default App
