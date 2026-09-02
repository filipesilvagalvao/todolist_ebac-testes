"use client"
import styles from "./Task.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Task_props } from "@/utils/post_task"
import { memo } from "react"
import { useTask } from "@/app/context/Tasks_Context"

const Task = memo(function Task({ text, status, id }: Task_props) {

    const { deleteTask, toggleTask } = useTask()

    const textClassName = status
        ? `${styles.task__text} ${styles["task__text--completed"]}`
        : styles.task__text

    return (
        <article className={styles.task}>

            <div className={styles.task__check}>
                <input
                    type="checkbox"
                    checked={status}
                    onChange={() => toggleTask(id!)}
                />
            </div>

            <p className={textClassName}>{text}</p>

            <div className={styles.task__delete}>
                <button onClick={() => deleteTask(id!)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>

        </article>
    )
})

export default Task
