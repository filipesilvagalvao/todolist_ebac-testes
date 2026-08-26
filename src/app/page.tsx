import NovaTarefa from "@/components/nova_tarefa/NovaTarefa";
import TaskList from "@/components/task_list/TaskList";

export default function Home() {
  
  return (
    <main>
      <NovaTarefa />
      <TaskList/>
    </main>
  );
}
