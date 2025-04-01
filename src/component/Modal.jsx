import { useState } from "react"
import style from "./Modal.module.css"
function Modal({setModal,todos,editId,todoList}){
    const [newtodo,setNewTodo] =useState(todos);

    function cancel(){
        setModal()
    }
    function changeHandler(e){
        setNewTodo(e.target.value)
    }
    function ChangeEdit(){
        todoList.map((item)=>{
            
        })
    }
    return(
        <>
            <div className={style["main"]}>
            <div className={style["modal"]}>
               <div className={style["modal-header"]}> 
                <span className={style["close"]}  onClick={cancel}>x</span>
                </div>
                <div className={style["modal-center"]}>
                <input type="text" placeholder="수정 할 내용을 입력해주세요."
                value={newtodo} onChange={changeHandler}/>
                </div>
                <div className={style["modal-footer"]}>
                <button className={style["btn"]} onClick={ChangeEdit} >edit</button>
                <button className={style["btn"]} onClick={cancel}>cancel</button>
                </div>
            </div>
            </div>
        </>
    )
}

export default Modal