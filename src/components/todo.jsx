import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
    const [form, setform] = useState(false)
    const [Input, setInput] = useState("")
    const [Tasks, setTasks] = useState([])

    useEffect(() => {
        let todoString = localStorage.getItem("Task")
        if(todoString){
          let tasks = JSON.parse(localStorage.getItem("Task")) 
          setTasks(tasks)
        }
      }, [])

      
    const addTodo = () => {
        if (Input.length < 3) {
            alert("Your Task length must be of 3 characters atleast")
            setInput("")

        } else {
            
            setTasks([...Tasks, { id: uuidv4(), title: Input, isDone: false }])
            setInput("")
        }
        savetoLS()
    }
    
    const savetoLS = () =>{
        localStorage.setItem("Task", JSON.stringify(Tasks))
        console.log("ls called called")
        console.log(JSON.parse(localStorage.getItem("Task")))
    }
    
    const handleDone = (e) => {
        let Id = e.target.name;
        for (let i = 0; i < Tasks.length; i++) {
            if (Tasks[i].id == Id) {
                let newTodo = [...Tasks]
                newTodo[i].isDone = !newTodo[i].isDone;
                setTasks(newTodo)
            }
        }
        savetoLS()
    }

    const handleEdit = (id) => {
        for (let i = 0; i < Tasks.length; i++) {
            if (Tasks[i].id == id) {
                setInput(Tasks[i].title);
                let newTodo = Tasks.filter((item) => {
                    return item.id !== id
                })
                setTasks(newTodo)
            }
        }
        savetoLS()
    }

    const handleDelete = (id) => {
        let newTodos = Tasks.filter(item => {
            return item.id != id
        });
        setTasks(newTodos)
        localStorage.setItem("Task", JSON.stringify(newTodos))
        
    }
    return (
        <>

            <div className='h-screen flex justify-center mt-10'>
                {
                    (form ?
                        <div className='top-0 fixed w-full h-full backdrop-blur-sm  z-10 flex items-center justify-center '> <div className='relative rounded-lg shadow-md h-[40%] w-[70%] md:w-[30%]  bg-gray-100 flex flex-col items-center justify-center'>
                            <div className=' absolute top-[-50px] w-[60%] my-5 bg-[#b17dea] p-3 flex justify-center text-white rounded-2xl shadow-2xl font-  bold '>
                                <h1 className='font-bold text-lg '> Add a Task!!</h1>
                            </div>
                            <button onClick={() => {
                                setform(!form)
                                savetoLS()
                            }} className='bg-red-600 text-white p-4 rounded-xl absolute top-2 right-5 my-3'>
                                <ImCross />
                            </button>
                            <input className='mt-10 rounded-lg w-[90%] p-3' type="text" value={Input} onChange={(e) => {
                                setInput(e.target.value)
                            }} />
                            <button onClick={addTodo} className='w-[90%] my-5 bg-[#b17dea] p-3 flex justify-center text-white rounded-2xl shadow-2xl font-  bold '>
                                Add
                            </button>
                        </div>  </div> : "")
                }
                <div className='px-2 w-full md:w-2/4 min-h-[500px]'>
                    <div className=' bg-[#b17dea] p-3 flex justify-center text-white '>
                        <h1 className='font-extrabold text-2xl '>TODOS</h1></div>

                    <div className='flex flex-col items-center bg-white my-5  min-h-20 p-2 py-10 shadow-2xl '>
                        {
                            Tasks.length != 0 ? Tasks.map((item) => {
                                return (
                                    <div key={item.id} className='w-[80%]  m-2 min-h-14 h-auto flex rounded-lg overflow-hidden bg-[#e3e9ff]'>
                                        <div className='w-[10%]  flex items-center justify-center'>
                                            <input type="checkbox" checked={item.isDone? true: false} onChange={handleDone} name={item.id} />
                                        </div>
                                        <div className={item.isDone ? "line-through w-[65%] flex items-center justify-center" : "w-[65%] flex items-center justify-center"}>{item.title}</div>
                                        <div className='text-2xl text-[#b17dea] w-[25%]  flex justify-around items-center'>
                                            <button onClick={() => {
                                                setform(!form)
                                                handleEdit(item.id)
                                            }}><FaEdit /></button>
                                            <button onClick={() => { handleDelete(item.id) }}><MdDelete /></button>
                                        </div>
                                    </div>
                                )
                            }) :
                                <div className='w-[80%]  m-2 min-h-14 h-auto flex justify-center rounded-lg overflow-hidden bg-[#e3e9ff]'>

                                    <div className='w-[80%] flex items-center justify-center'>No Tasks to Show</div>

                                </div>
                        }
                    </div>
                    <div className='relative flex justify-center  mt-[-50px]' >
                        <button onClick={() => {
                            setform(!form)
                        }} className='absolute w-2/4 md:w-1/4  bg-[#b17dea] p-3 flex justify-center text-white rounded-2xl shadow-2xl font-  bold '>
                            + New Task
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Todo
// jabmdak
// adbkadkad
// aksjdnakndakndaksdnaskdnaskdw
