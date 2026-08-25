"use client"
import { useState } from "react"
import { addTask } from "@/utils"
import styles from "./Form.module.css"



function Form() {

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

export default Form