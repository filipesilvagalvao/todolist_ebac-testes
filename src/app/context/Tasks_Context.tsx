"use client"
import { Task_props } from "@/utils/post_task";
import { createContext, useState } from "react";

export const Tasks_Context = createContext({});

export const Tasks_Context_Provider = ({ children }: React.PropsWithChildren) => {

    const [tasks, setTasks] = useState<Task_props[] | []>([])

    return (<Tasks_Context.Provider value={{ tasks, setTasks }}>{children}</Tasks_Context.Provider>)
}