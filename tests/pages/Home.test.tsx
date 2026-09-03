import { render, screen, fireEvent, act } from "@testing-library/react"
import { Tasks_Context_Provider } from "@/app/context/Tasks_Context"
import { useTask } from "@/app/context/Tasks_Context"
import TaskList from "@/components/task_list/TaskList"
import NovaTarefa from "@/components/nova_tarefa/NovaTarefa"
import React from "react"

function AppWithTasks() {
    return (
        <Tasks_Context_Provider>
            <NovaTarefa />
            <TaskList />
        </Tasks_Context_Provider>
    )
}

function AppEmpty() {
    return (
        <Tasks_Context_Provider>
            <TaskList />
        </Tasks_Context_Provider>
    )
}

describe("Renderização da página com tarefas", () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it("renderiza a mensagem de estado vazio quando não há tarefas", () => {
        render(<AppEmpty />)

        expect(screen.getByText("Nenhuma tarefa adicionada")).toBeInTheDocument()
    })

    it("renderiza o título 'Tarefas'", () => {
        render(<AppEmpty />)

        expect(screen.getByRole("heading", { name: /tarefas/i })).toBeInTheDocument()
    })

    it("renderiza o formulário de nova tarefa", () => {
        render(<AppWithTasks />)

        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument()
    })

    it("exibe contadores zerados inicialmente", () => {
        render(<AppEmpty />)

        expect(screen.getByText(/0 tarefa/)).toBeInTheDocument()
        expect(screen.getByText(/0 pendente/)).toBeInTheDocument()
        expect(screen.getByText(/0 concluída/)).toBeInTheDocument()
    })

    it("adiciona e renderiza uma tarefa na lista", async () => {
        render(<AppWithTasks />)

        const input = screen.getByRole("textbox")
        fireEvent.change(input, { target: { value: "Estudar React" } })
        fireEvent.submit(input.closest("form")!)

        expect(screen.getByText("Estudar React")).toBeInTheDocument()
    })

    it("atualiza os contadores ao adicionar tarefas", () => {
        render(<AppWithTasks />)

        const input = screen.getByRole("textbox")
        fireEvent.change(input, { target: { value: "Tarefa 1" } })
        fireEvent.submit(input.closest("form")!)

        expect(screen.getByText(/1 tarefa/)).toBeInTheDocument()
        expect(screen.getByText(/1 pendente/)).toBeInTheDocument()
    })

    it("permite marcar uma tarefa como concluída", () => {
        render(<AppWithTasks />)

        const input = screen.getByRole("textbox")
        fireEvent.change(input, { target: { value: "Tarefa para concluir" } })
        fireEvent.submit(input.closest("form")!)

        const checkbox = screen.getByRole("checkbox")
        fireEvent.click(checkbox)

        expect(screen.getByText(/1 concluída/)).toBeInTheDocument()
    })

    it("remove uma tarefa ao clicar no botão de deletar", () => {
        render(<AppWithTasks />)

        const input = screen.getByRole("textbox")
        fireEvent.change(input, { target: { value: "Tarefa deletada" } })
        fireEvent.submit(input.closest("form")!)

        expect(screen.getByText("Tarefa deletada")).toBeInTheDocument()

        const deleteButton = screen.getAllByRole("button").find(
            btn => btn.closest("article")
        )!
        fireEvent.click(deleteButton)

        expect(screen.queryByText("Tarefa deletada")).not.toBeInTheDocument()
    })
})
