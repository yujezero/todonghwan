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
    async function Delete(id) {
        console.log(id);
        setEditId(id)
        const response = await fetch(`http://localhost:4000/api/todos/${id}`,
            {method:"DELETE"}
        ).then(()=>getData())

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
            <div key={todo.id} className={style["body"]}>
                <input type="checkbox" checked={todo.isdone}/>
                <div onClick={()=>ModalHandler(todo.id)} className={style["text"]}>{todo.text}</div>
                <span className={style["delete"]} onClick={()=>Delete(todo.id)}>❌</span>
               
            </div>)

        })}
         {modal? createPortal(<Modal setModal={ModalHandler} todos={todoList?.find(todo => todo.id === editId)?.text || ""} todoList={todoList} editId={editId} getData={getData}
                />,document.body ) :null}
        </>
    )
}

export default Todo