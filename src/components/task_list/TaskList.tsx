"use client";
import styles from "./TaskList.module.css";
import { Task_props } from "@/utils/post_task";
import Task from "../task/Task";
import { useEffect } from "react";
import { useTask } from "@/app/context/Tasks_Context";
import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";

function TaskList() {
    const { tasks, setTasks } = useTask()
    const { total, concluidas, pendentes } = useContadorDeTarefas()

    useEffect(() => {
        const stored = localStorage.getItem("tasks")
        if (stored) {
            const parsedTasks: Task_props[] = JSON.parse(stored)
            setTasks(parsedTasks)
        }
    }, [setTasks])

    return (
        <section className={styles.TaskList}>
            <div className={styles.TaskList__header}>
                <h2 className={styles.TaskList__title}>Minhas Tarefas</h2>
                <div className={styles.TaskList__counter}>
                    <span className={styles.TaskList__counterItem}>
                        {total} {total === 1 ? "tarefa" : "tarefas"}
                    </span>
                    <span className={styles.TaskList__divider}>|</span>
                    <span className={`${styles.TaskList__counterItem} ${styles.TaskList__counterPending}`}>
                        {pendentes} pendente{pendentes !== 1 ? "s" : ""}
                    </span>
                    <span className={styles.TaskList__divider}>|</span>
                    <span className={`${styles.TaskList__counterItem} ${styles.TaskList__counterCompleted}`}>
                        {concluidas} concluída{concluidas !== 1 ? "s" : ""}
                    </span>
                </div>
            </div>

            <div className={styles.TaskList__items}>
                {tasks.map((task) => (
                    <Task
                        text={task.text}
                        status={task.status}
                        key={task.id}
                        id={task.id}
                    />
                ))}
            </div>

            {tasks.length === 0 && (
                <p className={styles.TaskList__empty}>Nenhuma tarefa adicionada</p>
            )}
        </section>
    )
}

export default TaskList
