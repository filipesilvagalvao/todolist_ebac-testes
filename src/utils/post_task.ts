import { Dispatch, SetStateAction, SyntheticEvent } from "react"

export type Task_props = {
    id?: number,
    text: string,
    status: boolean
}

const addTask = (
    e: SyntheticEvent,
    add_text: string,
    setText: Dispatch<SetStateAction<string>>,
    tasks: Task_props[],
    setTasks: Dispatch<SetStateAction<Task_props[]>>
) => {

    e.preventDefault()

    if (tasks === null || tasks.length === 0) {

        const first_task = [
            {
                id: 1,
                text: add_text,
                status: false
            }
        ]

        localStorage.setItem("tasks", JSON.stringify(first_task))
        setTasks(first_task)
        setText("")

        return;
    }

    const new_task = {
        id: Math.max(...tasks.map(t => t.id || 0)) + 1,
        text: add_text,
        status: false
    }

    const updatedTasks = [...tasks, new_task]

    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
    setText("")

}

export { addTask }
