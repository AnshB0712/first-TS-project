import './styles.css'

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e:React.FormEvent) => void;
}

export const InputField = ({todo,setTodo,handleAdd}:Props) => {
  return (
  <form 
  onSubmit={handleAdd}
  className="input">
    <input 
    type="text" 
    value={todo}
    onChange={e => setTodo(e.target
    .value)}
    placeholder="Type your task" 
    className="input__box"/>
    <button 
    type="submit"
    className="input_submit"
    >GO</button>
  </form>
  )
}