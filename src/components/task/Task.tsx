"use client"
import styles from "./Task.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Task_props } from "@/utils/post_task"
import { useEffect, useState } from "react"

function Task({ text, status, id }: Task_props) {

    const [change_status, setChange_status] = useState(status)

    const [tasks, setTasks] = useState<Task_props[]>([]);

    useEffect(() => {
        const tasksInStorage = localStorage.getItem("tasks");

        if (tasksInStorage) {
            const parsedTasks: Task_props[] = JSON.parse(tasksInStorage);
            setTasks(parsedTasks);
        }
    }, []);

    const chageStatus = () => {

        const new_task = tasks.map((task) =>
            task.id === id
                ? { ...task, status: !task.status }
                : task
        )

        localStorage.setItem("tasks", JSON.stringify(new_task))

        setChange_status(!change_status)

    }

    const deleteTask = () => {
        const deleted_task = tasks.filter(task => task.id !== id)
        localStorage.setItem("tasks", JSON.stringify(deleted_task))
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
                <button onClick={deleteTask}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>

        </article>
    )
}

export default Task