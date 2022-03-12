import AsyncStorage from '@react-native-async-storage/async-storage';
import { isYesterday, isToday } from 'date-fns'
import Todo from './Todo'

const TODO_STORAGE_KEY = "@doday_todos"


export async function saveTodo(value: Todo): Promise<Todo[] | null> {
  try {
    const [existingTodos, _importCandidates] = filterTodos(await getTodos())
    const todos = existingTodos.length > 0 ? [...existingTodos, value] : [value]
    const jsonValue = JSON.stringify({ todos })
    await AsyncStorage.setItem(TODO_STORAGE_KEY, jsonValue)
    return todos
  } catch (e) {
    console.error(e)
    return null
  }
}

// TODO: Refactor to just retunr the object we need anywhere else
export const filterTodos = (todos: Todo[] | null): [currentTodos: Todo[], importCandidates: Todo[]] => {
  if (!todos) return [[], []]
  let importCandidates: Todo[] = []
  let currentTodos: Todo[] = []
  let discardedCount = 0

  todos.forEach(todo => {
    const todoDate = new Date(todo.createdAt)
    if (isToday(todoDate)) {
      currentTodos.push(todo)
      return
    }

    if (isYesterday(todoDate)) {
      importCandidates.push(todo)
      return
    }

    discardedCount++
  })

  return [currentTodos, importCandidates]
}

export async function deleteAllTodos(): Promise<boolean> {
  await AsyncStorage.removeItem(TODO_STORAGE_KEY)
  return true
}

// TODO: Include filter here and return two arrays
export async function getTodos(): Promise<Todo[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(TODO_STORAGE_KEY)
    return jsonValue != null ? JSON.parse(jsonValue).todos as Todo[] : []
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function updateTodo(todo: Todo): Promise<Todo[] | null> {
  try {
    const existingTodos = await getTodos()

    const updatedTodos = existingTodos.map(t => {
      return t.id === todo.id ? todo : t
    })
    const jsonValue = JSON.stringify({ todos: updatedTodos })
    await AsyncStorage.setItem(TODO_STORAGE_KEY, jsonValue)
    return updatedTodos
  } catch (error) {
    console.error(error)
    return null
  }
}

