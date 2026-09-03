# Todo List

Aplicação de lista de tarefas desenvolvida com **Next.js 16**, **React 19** e **TypeScript**. Permite adicionar, marcar como concluída e excluir tarefas, com persistência automática no `localStorage`.

---

## Funcionalidades

- **Adicionar tarefas** - Formulário com validação de input vazio
- **Marcar como concluída** - Checkbox para alternar status (pendente/concluída)
- **Excluir tarefas** - Botão com ícone de lixeira
- **Contadores em tempo real** - Total, pendentes e concluídas
- **Persistência local** - Dados salvos automaticamente no `localStorage`
- **Estado vazio** - Mensagem amigável quando não há tarefas

---

## Tecnologias

| Categoria | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js | 16.3.2 |
| UI Library | React | 19.2.8 |
| Linguagem | TypeScript | ^5 |
| Estilos | CSS Modules | - |
| Ícones | FontAwesome | ^7.3.1 |
| Testes | Jest + Testing Library | ^30.5.1 |
| Linting | ESLint | ^9 |

---

## Estrutura do Projeto

```
todo-list/
├── src/
│   ├── app/
│   │   ├── context/
│   │   │   └── Tasks_Context.tsx      # Context API para gerenciamento de estado
│   │   ├── globals.css                # Estilos globais e variáveis CSS
│   │   ├── layout.tsx                 # Layout raiz (fonte Inter, metadata)
│   │   └── page.tsx                   # Página principal
│   ├── components/
│   │   ├── container/
│   │   │   └── Container.tsx          # Wrapper com Provider + renderização
│   │   ├── nova_tarefa/
│   │   │   ├── NovaTarefa.tsx         # Formulário de entrada de tarefa
│   │   │   └── NovaTarefa.module.css
│   │   ├── task/
│   │   │   ├── Task.tsx               # Card individual de tarefa (memo)
│   │   │   └── Task.module.css
│   │   └── task_list/
│   │       ├── TaskList.tsx           # Lista de tarefas + contadores
│   │       └── TaskList.module.css
│   ├── hooks/
│   │   └── useContadorDeTarefas.ts    # Hook para contagem de tarefas
│   └── utils/
│       ├── post_task.ts               # Tipo Task_props + função legada
│       ├── delete_task.ts             # Função legada de exclusão
│       ├── change_status.ts           # Função legada de toggle
│       └── tasks_in_storage.ts        # Função legada de leitura
├── tests/
│   ├── helpers/
│   │   └── renderWithProvider.tsx     # Helper para renderizar com Context
│   ├── components/
│   │   └── NovaTarefa.test.tsx        # Testes do formulário
│   ├── hooks/
│   │   └── useContadorDeTarefas.test.tsx  # Testes isolados do hook
│   └── pages/
│       └── Home.test.tsx              # Testes de integração da página
├── jest.config.ts                     # Configuração do Jest
├── jest.setup.ts                      # Setup global dos testes
├── next.config.ts                     # Configuração do Next.js
├── tsconfig.json                      # Configuração do TypeScript
└── package.json
```

---

## Pré-requisitos

- **Node.js** >= 18
- **npm** >= 9

---

## Instalação e Execução

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd todo-list

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

---

## Comandos Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm start` | Inicia o servidor de produção |
| `npm run lint` | Executa o ESLint |
| `npm test` | Roda os testes unitários |
| `npx jest --coverage` | Roda testes com relatório de cobertura |

---

## Arquitetura

### Fluxo de Dados

```
page.tsx
  └── Container
        └── Tasks_Context_Provider    ← Estado global (React Context)
              ├── NovaTarefa           ← Adiciona tarefas ao contexto
              └── TaskList             ← Lê tarefas do contexto
                    └── Task           ← Altera/exclui tarefas via contexto
```

### Context API (`Tasks_Context.tsx`)

O estado centralizado é gerenciado pelo `Tasks_Context_Provider`, que expõe:

| Propriedade | Tipo | Descrição |
|---|---|---|
| `tasks` | `Task_props[]` | Lista de tarefas |
| `setTasks` | `Dispatch<SetStateAction<Task_props[]>>` | Atualiza a lista diretamente |
| `addTask` | `(task: Task_props) => void` | Adiciona uma nova tarefa |
| `deleteTask` | `(id: number) => void` | Remove tarefa pelo ID |
| `toggleTask` | `(id: number) => void` | Alterna status da tarefa |

Todas as mutações persistem automaticamente no `localStorage`.

### Tipo `Task_props`

```typescript
type Task_props = {
    id?: number     // ID auto-incrementado (opcional na criação)
    text: string    // Texto da tarefa
    status: boolean // false = pendente, true = concluída
}
```

### Hook `useContadorDeTarefas`

Deriva contagens memoizadas a partir do contexto:

```typescript
const { total, concluidas, pendentes } = useContadorDeTarefas()
```

| Retorno | Tipo | Descrição |
|---|---|---|
| `total` | `number` | Total de tarefas |
| `concluidas` | `number` | Tarefas com `status: true` |
| `pendentes` | `number` | Tarefas com `status: false` |

---

## Testes

### Estrutura

```
tests/
├── helpers/
│   └── renderWithProvider.tsx     # Wrapper do Context para testes
├── components/
│   └── NovaTarefa.test.tsx        # 5 testes: renderização, input, submissão
├── hooks/
│   └── useContadorDeTarefas.test.tsx  # 5 testes: contagens isoladas via renderHook
└── pages/
    └── Home.test.tsx              # 8 testes: integração completa da página
```

### Rodando os Testes

```bash
# Todos os testes
npm test

# Com cobertura
npx jest --coverage
```

### Cobertura Atual

| Métrica | Cobertura |
|---|---|
| Statements | 98.68% |
| Branches | 90% |
| Functions | 100% |
| Lines | 98.68% |

### O que é Testado

- **Componente `<NovaTarefa />`**: renderização do formulário, atualização do input, validação de submissão vazia, submissão com texto, limpeza do input
- **Hook `useContadorDeTarefas`**: contagens zeradas, total, concluídas, pendentes, atualização dinâmica (usando `renderHook`)
- **Página com tarefas**: estado vazio, renderização do título, formulário, contadores, adição de tarefa, marcar como concluída, exclusão

---

## Estilização

- **CSS Modules** para escopamento de estilos por componente
- **Variáveis CSS** definidas em `globals.css` para cores e sombras
- **Fonte Inter** via `next/font/google`
- **Design responsivo** com `min(1100px, 100%)` para containers

### Variáveis CSS

| Variável | Valor | Uso |
|---|---|---|
| `--main-color` | `#05cf05` | Cor principal (verde) |
| `--bg-color-1` | `#f5f5f5` | Fundo da página |
| `--bg-color-2` | `#ffffff` | Fundo de cards |
| `--text-color-1` | `#1f2937` | Cor do texto |
| `--text-color-2` | `#ffffff` | Texto em botões |

---

## Persistência

Todas as tarefas são salvas no `localStorage` do navegador com a chave `"tasks"`. Os dados são carregados automaticamente ao iniciar a aplicação (hidratação no `useEffect` do `TaskList`).

---

## Licença

Este é um projeto aberto.
