"use client"
import NovaTarefa from "@/components/nova_tarefa/NovaTarefa";
import Task from "@/components/task/Task";

export default function Home() {
  const dados = JSON.parse(localStorage.getItem("tasks"))
  return (
    <main>
      <NovaTarefa />
      {
        dados?.map((task) => (
          <Task
            text={task.text}
            status={task.status}
            key={task.id}
          />
        ))
      }
    </main>
  );
}
