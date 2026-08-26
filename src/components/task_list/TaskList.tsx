"use client"
import styles from "./TaskList.module.css"
import { Task_props } from "@/utils/post_task"
import { getTasksInStorage } from "@/utils/tasks_in_storage"
import Task from "../task/Task";

function TaskList() {
    const tasks_in_storage = getTasksInStorage()
    const tasks:Task_props[] = typeof tasks_in_storage === "string" && JSON.parse(tasks_in_storage) || [];

  return (
    <section className={styles.TaskList}>
        {
            tasks?.map((task)=>(
                <Task text={task.text} status={task.status} key={task.id}/>
            ))
        }
    </section>
  )
}

export default TaskList