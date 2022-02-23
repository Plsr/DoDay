import Todo from './Todo'
import { createContext } from 'react';

export type TodoContextType = {
  setTodos(todos: Todo[]): void
  todos: Todo[]
}

export const TodoContext = createContext<TodoContextType>({ setTodos: () => {}, todos: []});