import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")   // todo is input text
  const [todos, setTodos] = useState([]) // todos is array which holds all todos
  const [showFinished, setshowFinished] = useState(true)



  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos"))
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit=(e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!== id;
    });
    setTodos(newTodos)
    saveToLS()

  }

  const handleDelete=(e, id)=>{
    const confirmed = window.confirm("Are you sure you want to delete this todo activity?");
    if(confirmed)
      {
          let newTodos = todos.filter(item=>{
          return item.id!== id;
          });
          setTodos(newTodos);
          alert("Deleted successfully")
      } else {
        alert("Deletion cancelled")
      } 
      saveToLS()
    
    
  }

  const handleAdd=()=>{
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()

  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  
  }


  return (
    <>
    <Navbar/>
    <div className="mx-4 my-4 rounded-xl p-4  sm:mx-auto md:w-1/2 items-center min-h-[80vh]" style={{backgroundImage:"url('https://images.pexels.com/photos/5088017/pexels-photo-5088017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}} >
     <h1 className='font-bold text-center text-lg sm:text-xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo flex flex-col sm:flex-row my-7 gap-5 text-center items-center justify-center">
          <h2 className='text-base sm:text-lg font-bold '>Add a Todo</h2>
          <div className="placeholder flex flex-col sm:flex-row gap-4 w-full ">
             <input onChange={handleChange} type='text' value={todo} className=' w-full sm:w-3/4 p-2 sm:p-4 rounded-xl' />
            <button onClick={handleAdd} disabled={todo.length<=3} className='w-full sm:w-auto bg-violet-500 disabled:bg-violet-700 hover:bg-violet-700 px-4 py-2 sm:py-1 text-white rounded-xl'>Save</button>
          </div>
         
        </div>
        <div className="input flex items-center justify-center sm:justify-start gap-3 my-4" >
            <input className='w-4' onChange={toggleFinished} type="checkbox" checked={showFinished}/> 
            <label className="text-sm sm:text-base font-bold font-opacity-100">Show Finished</label>
        </div>
        
          <h2 className='font-bold text-lg sm:text-xl my-5 text-center sm:text-left'>Your Todos</h2>
          <div className="todos space-y-5">
            {todos.length ===0 && <div className='m-5 font-bold text-center'>No Todos to display</div> }
            {todos.map(item =>{
              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex flex-col sm:flex-row justify-between items-center p-4 sm:p-7 bg-[#dbd5d145] rounded-2xl font-semibold text-black">
                <div className='flex gap-4 items-center w-full sm:w-3/4'>
                  <input name={item.id} type='checkbox' checked={item.isCompleted} onChange={handleCheckbox} className='w-6'/>
                  <div className={`${item.isCompleted?"line-through":""} break-words w-full`}>{item.todo}</div>  
                </div>
                
                
                <div className="buttons flex gap-2 mt-4 sm:mt-0 sm:flex-wrap sm:w-auto justify-center">
                  <button onClick={(e)=>{handleEdit(e, item.id)}} className=' hover:bg-violet-700 p-3 sm:p-4 sm:h-12 text-white rounded-md'><MdEditNote />
                  </button>
                  <button onClick={(e)=>{handleDelete(e, item.id)}} className=' hover:bg-violet-700 p-3 sm:p-4 sm:h-12 text-white rounded-md'><MdOutlineDeleteSweep /></button>
                </div> 
              </div>
            })}
         
          </div>

  


     
    </div>
    </>
  )
}

export default App