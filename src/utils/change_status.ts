import { Dispatch, SetStateAction } from "react"
import { Task_props } from "./post_task"

const chageStatus = (
    tasks: Task_props[],
    setChange_status: Dispatch<SetStateAction<boolean>>,
    change_status: boolean,
    id: number | undefined,
    setTasks: Dispatch<SetStateAction<Task_props[]>>
) => {

    const new_task = tasks.map((task) =>
        task.id === id
            ? { ...task, status: !task.status }
            : task
    )

    localStorage.setItem("tasks", JSON.stringify(new_task))
    setTasks(new_task)
    setChange_status(!change_status)

}

export { chageStatus }
