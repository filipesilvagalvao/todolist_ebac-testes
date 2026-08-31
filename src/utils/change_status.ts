import { Dispatch, SetStateAction } from "react"
import { Task_props } from "./post_task"

const chageStatus = (
    tasks: Task_props[], 
    setChange_status: Dispatch<SetStateAction<boolean>>,
    change_status: boolean,
    id?: number
) => {

    const new_task = tasks.map((task) =>
        task.id === id
            ? { ...task, status: !task.status }
            : task
    )

    localStorage.setItem("tasks", JSON.stringify(new_task))

    setChange_status(!change_status)

}

export { chageStatus }