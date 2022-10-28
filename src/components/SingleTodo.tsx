import { useState } from 'react'
import {Todo} from '../model'
import {PencilSquare,Trash,Check2} from 'react-bootstrap-icons'

interface Props {
  todo: Todo;
}

interface EditInfo {
  show: boolean,
  text: string
}

export const SingleTodo = ({todo,dispatch}:Props) => {
  
  const [editInfo,setEditInfo] = useState<EditInfo>({
    show: false,
    text: todo.todo
  })
  
  const handleDone = (id:number) => {
    dispatch({type:'DONE',payload:id})
  }
  
  const handleDelete = (id:number) => {
    dispatch({type:'DELETE',payload:id})
  }
  
  const handleEdit = (e:React.FormEvent,id:number) => {
    e.preventDefault();
    dispatch({
      type:"UPDATE",
      payload: {
        id,
        text: editInfo.text
      }
    })
    setEditInfo(p =>({...p,show:!p.show}))
  }
  
  return(
  <form 
  onSubmit={e => handleEdit(e,todo.id)}
  className="todos__single">
  
    { !editInfo.show && (todo.isDone ?
    <s 
    className="todos__single--text">
    {todo.todo}
    </s>
    :
    <span 
    className="todos__single--text">
    {todo.todo}
    </span> )
    }
    
    {editInfo.show 
    && 
    <input 
    type="text" 
    value={editInfo.text} 
    onChange={e => setEditInfo(p => ({...p,text:e.target.value}))}
    />
    }
    
    <div>
      <span className="icon">
      <PencilSquare onClick={() => setEditInfo(p => ({...p,show:!p.show}))}/>
      </span>
      
      <span className="icon">
      <Trash onClick={() => handleDelete(todo.id)}/>
      </span>
      
      <span className="icon">
      <Check2 onClick={() => handleDone(todo.id)}/>
      </span>
    </div>
    
  </form>
  )
}