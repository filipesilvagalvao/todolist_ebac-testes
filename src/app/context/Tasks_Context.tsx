"use client"
import { Task_props } from "@/utils/post_task";
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useMemo, useState } from "react";

type ITasks_Context = {
    tasks: Task_props[],
    setTasks: Dispatch<SetStateAction<Task_props[]>>,
    addTask: (task: Task_props) => void,
    deleteTask: (id: number) => void,
    toggleTask: (id: number) => void
}

const Tasks_Context = createContext<ITasks_Context | null>(null);

export const useTask = () => {
    const context = useContext(Tasks_Context);

    if (context === null) throw new Error("useContext deve estar dentro do Provider");

    return context;
}

export const Tasks_Context_Provider = ({ children }: React.PropsWithChildren) => {

    const [tasks, setTasks] = useState<Task_props[]>([])

    const addTask = useCallback((task: Task_props) => {
        setTasks(prev => {
            const updated = [...prev, task]
            localStorage.setItem("tasks", JSON.stringify(updated))
            return updated
        })
    }, [])

    const deleteTask = useCallback((id: number) => {
        setTasks(prev => {
            const updated = prev.filter(task => task.id !== id)
            localStorage.setItem("tasks", JSON.stringify(updated))
            return updated
        })
    }, [])

    const toggleTask = useCallback((id: number) => {
        setTasks(prev => {
            const updated = prev.map(task =>
                task.id === id ? { ...task, status: !task.status } : task
            )
            localStorage.setItem("tasks", JSON.stringify(updated))
            return updated
        })
    }, [])

    const value = useMemo(() => ({
        tasks,
        setTasks,
        addTask,
        deleteTask,
        toggleTask
    }), [tasks, addTask, deleteTask, toggleTask])

    return (<Tasks_Context.Provider value={value}>{children}</Tasks_Context.Provider>)
}