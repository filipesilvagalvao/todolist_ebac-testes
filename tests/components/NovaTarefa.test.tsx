import { render, screen, fireEvent } from "@testing-library/react"
import { renderWithProvider } from "../helpers/renderWithProvider"
import NovaTarefa from "@/components/nova_tarefa/NovaTarefa"

describe("NovaTarefa", () => {
    it("renderiza o input e o botão de adicionar", () => {
        renderWithProvider(<NovaTarefa />)

        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument()
    })

    it("atualiza o valor do input ao digitar", () => {
        renderWithProvider(<NovaTarefa />)

        const input = screen.getByRole("textbox")
        fireEvent.change(input, { target: { value: "Nova tarefa" } })

        expect(input).toHaveValue("Nova tarefa")
    })

    it("não adiciona tarefa ao submeter com input vazio", () => {
        renderWithProvider(<NovaTarefa />)

        const form = screen.getByRole("textbox").closest("form")!
        fireEvent.submit(form)

        expect(screen.getByRole("textbox")).toHaveValue("")
    })

    it("adiciona uma tarefa ao submeter com texto válido", () => {
        renderWithProvider(<NovaTarefa />)

        const input = screen.getByRole("textbox")
        fireEvent.change(input, { target: { value: "Comprar leite" } })
        fireEvent.submit(input.closest("form")!)

        expect(input).toHaveValue("")
    })

    it("limpa o input após submissão bem-sucedida", () => {
        renderWithProvider(<NovaTarefa />)

        const input = screen.getByRole("textbox")
        fireEvent.change(input, { target: { value: "Tarefa limpa" } })
        fireEvent.submit(input.closest("form")!)

        expect(input).toHaveValue("")
    })
})
