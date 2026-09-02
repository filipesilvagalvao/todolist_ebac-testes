import { Dispatch, SetStateAction } from "react"
import { Task_props } from "./post_task"

const deleteTask = (
    tasks: Task_props[],
    id: number | undefined,
    setTasks: Dispatch<SetStateAction<Task_props[]>>
) => {
    const deleted_task = tasks.filter(task => task.id !== id)
    localStorage.setItem("tasks", JSON.stringify(deleted_task))
    setTasks(deleted_task)
}

export { deleteTask }
