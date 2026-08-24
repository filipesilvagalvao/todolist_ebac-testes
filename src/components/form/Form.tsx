"use client"
import { useState } from "react"
import { addTask } from "@/utils"



function Form() {

    const [text, setText] = useState("")

    return (
        <form onSubmit={(e)=>addTask(e,text)}>
            <input type="text" name="" id="" required value={text} onChange={(e)=>setText(e.target.value)}/>
            <button type="submit">Add</button>
        </form>
    )
}

export default Form