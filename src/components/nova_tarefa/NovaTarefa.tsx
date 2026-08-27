"use client"
import { useState } from "react"
import { addTask } from "@/utils/post_task"
import styles from "./NovaTarefa.module.css"

function NovaTarefa() {

    const [text, setText] = useState("")
    

    return (
        <form onSubmit={(e) => addTask(e, text, setText)} className={styles.form}>
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