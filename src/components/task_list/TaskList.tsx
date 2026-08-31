"use client";

import styles from "./TaskList.module.css";
import { Task_props } from "@/utils/post_task";
import Task from "../task/Task";
import { useEffect, useState } from "react";
import { tasks_in_storage } from "@/utils/tasks_in_storage";

function TaskList() {
    const [tasks, setTasks] = useState<Task_props[]>([]);

    useEffect(() => {
        if (tasks_in_storage) {
            const parsedTasks: Task_props[] = JSON.parse(tasks_in_storage);
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