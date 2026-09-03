import { render, RenderOptions } from "@testing-library/react"
import { Tasks_Context_Provider } from "@/app/context/Tasks_Context"
import React from "react"

function AllProviders({ children }: { children: React.ReactNode }) {
    return <Tasks_Context_Provider>{children}</Tasks_Context_Provider>
}

export function renderWithProvider(
    ui: React.ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) {
    return render(ui, { wrapper: AllProviders, ...options })
}
