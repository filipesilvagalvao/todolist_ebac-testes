"use client"
import styles from "./Task.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Task_props } from "@/utils/post_task"

function Task({text, status}:Task_props) {
    return (
        <article className={styles.task}>

            <div className={styles.task__check}>
                <input type="checkbox" name="" id="" />
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