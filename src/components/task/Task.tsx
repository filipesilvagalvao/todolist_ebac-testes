"use client"
import styles from "./Task.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Task_props } from "@/utils/post_task"
import { useState } from "react"

function Task({ text, status, id }: Task_props) {

    const [change_status, setChange_status] = useState(status)

    const tasks_in_storage = localStorage.getItem("tasks");
    const tasks: Task_props[] = typeof tasks_in_storage === "string" && JSON.parse(tasks_in_storage) || [];

    const chageStatus = () => {

        const new_task = tasks.map((task) =>
            task.id === id
                ? { ...task, status: !task.status }
                : task
        )

        localStorage.setItem("tasks", JSON.stringify(new_task))
         
        setChange_status(!change_status)
       
    }

    const deleteTask = () =>{
        const deleted_task = tasks.filter(task=> task.id !== id)
        localStorage.setItem("tasks", JSON.stringify(deleted_task))
         
        setChange_status(!change_status)
    }

    return (
        <article className={styles.task}>

            <div className={styles.task__check}>
                <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={change_status}
                    onChange={chageStatus}
                />
            </div>

            <p className={styles.task__text}>{text}</p>

            <div className={styles.task__delete}>
                <button>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>

        </article>
    )
}

export default Task