import {Todo} from '../model'
import {SingleTodo} from './SingleTodo'
import './styles.css'

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodosList = ({
  todos,
  dispatch
}) => {
  return (
  <div className="todos">
    {todos.map(todo => (<SingleTodo 
    key={todo.id} 
    todo={todo} 
    dispatch={dispatch}/>))}
  </div>
  )
}