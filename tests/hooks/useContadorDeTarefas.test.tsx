import { renderHook, act } from "@testing-library/react"
import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas"
import { Tasks_Context_Provider, useTask } from "@/app/context/Tasks_Context"
import React from "react"

function Wrapper({ children }: { children: React.ReactNode }) {
    return <Tasks_Context_Provider>{children}</Tasks_Context_Provider>
}

function useTestHooks() {
    const taskHook = useTask()
    const counterHook = useContadorDeTarefas()
    return { ...taskHook, ...counterHook }
}

describe("useContadorDeTarefas", () => {
    it("retorna zero para todas as contagens quando não há tarefas", () => {
        const { result } = renderHook(() => useTestHooks(), { wrapper: Wrapper })

        expect(result.current.total).toBe(0)
        expect(result.current.concluidas).toBe(0)
        expect(result.current.pendentes).toBe(0)
    })

    it("conta corretamente o total de tarefas", () => {
        const { result } = renderHook(() => useTestHooks(), { wrapper: Wrapper })

        act(() => {
            result.current.addTask({ id: 1, text: "Tarefa 1", status: false })
            result.current.addTask({ id: 2, text: "Tarefa 2", status: true })
        })

        expect(result.current.total).toBe(2)
    })

    it("conta corretamente as tarefas concluídas", () => {
        const { result } = renderHook(() => useTestHooks(), { wrapper: Wrapper })

        act(() => {
            result.current.addTask({ id: 1, text: "Tarefa 1", status: true })
            result.current.addTask({ id: 2, text: "Tarefa 2", status: false })
        })

        expect(result.current.concluidas).toBe(1)
    })

    it("conta corretamente as tarefas pendentes", () => {
        const { result } = renderHook(() => useTestHooks(), { wrapper: Wrapper })

        act(() => {
            result.current.addTask({ id: 1, text: "Tarefa 1", status: false })
            result.current.addTask({ id: 2, text: "Tarefa 2", status: false })
            result.current.addTask({ id: 3, text: "Tarefa 3", status: true })
        })

        expect(result.current.pendentes).toBe(2)
    })

    it("atualiza as contagens ao adicionar tarefas", () => {
        const { result } = renderHook(() => useTestHooks(), { wrapper: Wrapper })

        expect(result.current.total).toBe(0)

        act(() => {
            result.current.addTask({ id: 1, text: "Primeira", status: false })
        })

        expect(result.current.total).toBe(1)
        expect(result.current.pendentes).toBe(1)
    })
})
