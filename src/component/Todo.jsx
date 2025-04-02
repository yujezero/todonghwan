import { useEffect, useState } from "react"
import style from "./Todo.module.css"
import Modal from "./Modal";
import { createPortal } from "react-dom";
function Todo(){
    const [todos,setTodos] = useState("");
    const [todoList,setTodoList] =useState(null);
    const [modal,setModal] =useState(false);
    const [editId, setEditId] = useState(null);
    
    const url="http://localhost:4000/api/todos"
function getData(){
    fetch(url)
    .then((response)=> response.json())
    .then((data)=> {
        console.log(data.data)
        setTodoList(data.data);
    })
    // setTodoList(data.data));
}


    useEffect(()=>{
        getData()
    },[])
    function subMitHandler(e){
        e.preventDefault();
        fetch(url,
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({text:todos , idsone:false })
        }
    ).then(()=>getData())
        console.log(todos);
    }
    function changeHandler(e){
        setTodos(e.target.value)
    }

    function ModalHandler(id){
        setEditId(id)
        setModal((prev)=>!prev)
    }

    return (
        <>
        <div className={style["header"]} >
            <p>TODO LIST</p>
        </div>
        <form onSubmit={subMitHandler}>
            <span>TODO</span>
            
            <input type="text" placeholder="할 일을 적어주세요"
            onChange={changeHandler} className={style["input"]}/>
          
            <button className={style["button"]}>add</button>
        </form>

        {todoList?.map((todo)=>{
            return(
            <div key={todo.id}>
                <input type="checkbox" checked={todo.isdone}/>
                <div onClick={()=>ModalHandler(todo.id)}>{todo.text}</div>
                <button>❌</button>
            </div>)

        })}
        {modal? createPortal(<Modal setModal={ModalHandler} todos={todos} todoList={todoList} editId={editId} getData={getData}
        />,document.body ) :null}
        </>
    )
}

export default Todo