"use client";

import styles from "./TaskList.module.css";
import { Task_props } from "@/utils/post_task";
import Task from "../task/Task";
import { useEffect, useState } from "react";

function TaskList() {
    const [tasks, setTasks] = useState<Task_props[]>([]);

    useEffect(() => {
        const tasksInStorage = localStorage.getItem("tasks");

        if (tasksInStorage) {
            const parsedTasks: Task_props[] = JSON.parse(tasksInStorage);
            setTasks(parsedTasks);
        }
    }, []);

    return (
        <section className={styles.TaskList}>
            {tasks.map((task) => (
                <Task
                    text={task.text}
                    status={task.status}
                    key={task.id}
                    id={task.id}
                />
            ))}
        </section>
    );
}

export default TaskList;