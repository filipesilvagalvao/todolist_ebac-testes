"use client"
import { useState } from "react"
import { useTask } from "@/app/context/Tasks_Context"
import styles from "./NovaTarefa.module.css"

function NovaTarefa() {

    const [text, setText] = useState("")
    const { tasks, addTask } = useTask()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!text.trim()) return

        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id || 0)) + 1 : 1,
            text: text.trim(),
            status: false
        }

        addTask(newTask)
        setText("")
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={styles.form_input}
            />
            <button type="submit" className={styles.form_btn}>Add</button>
        </form>
    )
}

export default NovaTarefa
