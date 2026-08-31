"use client"
import styles from "./Task.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Task_props } from "@/utils/post_task"
import { useEffect, useState } from "react"
import { tasks_in_storage } from "@/utils/tasks_in_storage"
import { deleteTask } from "@/utils/delete_task"
import { chageStatus } from "@/utils/change_status"

function Task({ text, status, id }: Task_props) {

    const [change_status, setChange_status] = useState(status)

    const [tasks, setTasks] = useState<Task_props[]>([]);

    useEffect(() => {
        if (tasks_in_storage) {
            const parsedTasks: Task_props[] = JSON.parse(tasks_in_storage);
            setTasks(parsedTasks);
        }
    }, []);

    return (
        <article className={styles.task}>

            <div className={styles.task__check}>
                <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={change_status}
                    onChange={()=>chageStatus(tasks,setChange_status,change_status,id)}
                />
            </div>

            <p className={styles.task__text}>{text}</p>

            <div className={styles.task__delete}>
                <button onClick={()=>deleteTask(tasks, id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>

        </article>
    )
}

export default Task