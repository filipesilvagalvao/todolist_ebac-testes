"use client"
import { Tasks_Context_Provider } from "@/app/context/Tasks_Context"
import NovaTarefa from "../nova_tarefa/NovaTarefa"
import TaskList from "../task_list/TaskList"
import styles from "./Container.module.css"

function Container() {

    return (
        <Tasks_Context_Provider>
            <div>
                <NovaTarefa />
                <TaskList />
            </div>
        </Tasks_Context_Provider>
    )
}

export default Container