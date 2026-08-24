import { SyntheticEvent } from "react"

type Task = {
    id: number,
    text: string,
    status: boolean
}

const addTask = (e: SyntheticEvent, add_text:string) => {

    e.preventDefault()

    const tasks_in_storage = localStorage.getItem("tasks")

    const tasks: Task[] = typeof tasks_in_storage === "string" && JSON.parse(tasks_in_storage) || [];

    if (tasks === null) {

        const first_task = [
            {
                id: 1,
                text: add_text,
                status: false
            }
        ]

        localStorage.setItem("tasks", JSON.stringify(first_task))

        return;
    }

    const new_task = {
        id: tasks.length + 1,
        text: add_text,
        status: false
    }

    tasks.push(new_task)

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

export {addTask}