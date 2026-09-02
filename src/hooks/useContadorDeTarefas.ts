import { useMemo } from "react"
import { useTask } from "@/app/context/Tasks_Context"

export function useContadorDeTarefas() {
    const { tasks } = useTask()

    const contador = useMemo(() => {
        const total = tasks.length
        const concluidas = tasks.filter(task => task.status).length
        const pendentes = total - concluidas

        return { total, concluidas, pendentes }
    }, [tasks])

    return contador
}
