import Todo from './Todo'
import { createContext } from 'react';

export type TodoContextType = {
  setTodos(todos: { currentTodos: Todo[], importCandidates: Todo[] }): void
  todos: {
    currentTodos: Todo[],
    importCandidates: Todo[]
  }
}

export const TodoContext = createContext<TodoContextType>(
  { setTodos: () => {}, todos: { currentTodos: [], importCandidates: [] }}
);