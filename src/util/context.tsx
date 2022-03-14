import Todo from './Todo'
import { Todos } from './types'
import { createContext } from 'react';

export type TodoContextType = {
  setTodos(todos: { currentTodos: Todo[], importCandidates: Todo[] }): void
  todos: Todos
}

export const TodoContext = createContext<TodoContextType>(
  { setTodos: () => {}, todos: { currentTodos: [], importCandidates: [] }}
);