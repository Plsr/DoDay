import AsyncStorage from '@react-native-async-storage/async-storage';
import { isYesterday, isToday } from 'date-fns'
import Todo from './Todo'
import { Todos } from './types'

const TODO_STORAGE_KEY = "@doday_todos"

export async function saveTodos(todos: Todos): Promise<boolean> {
  console.log('todos: ', todos)
  const todosArray = convertTodosToArray(todos)
  if (todosArray.length < 1) return false

  const json = JSON.stringify(todosArray)
  console.log(json)
  try {
    await AsyncStorage.setItem(TODO_STORAGE_KEY, json)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// TODO: Refactor to just retunr the object we need anywhere else
export const filterTodos = (todos: Todo[] | null): [currentTodos: Todo[], importCandidates: Todo[]] => {
  if (!todos) return [[], []]
  let importCandidates: Todo[] = []
  let currentTodos: Todo[] = []
  let discardedCount = 0
  console.log(todos)

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

export async function deleteTodo(todo: Todo): Promise<Todo[] | undefined> {
  try {
    const existingTodos = await getTodos()
    const cleanedTodos = existingTodos.filter(existingTodo => existingTodo.id != todo.id)
    const jsonTodos = JSON.stringify(cleanedTodos)
    await AsyncStorage.setItem(TODO_STORAGE_KEY, jsonTodos)
    return cleanedTodos
  } catch (error) {
    console.error('Something went wrong')
    return
  }
}

// TODO: Include filter here and return two arrays
export async function getTodos(): Promise<Todo[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(TODO_STORAGE_KEY)
    console.log(jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) as Todo[] : []
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function importTodo(todo: Todo): Promise<Todo[] | null> {
  const updatedTodo: Todo = { ...todo, createdAt: new Date() }
  return await updateTodo(updatedTodo)
}

export async function updateTodo(todo: Todo): Promise<Todo[] | null> {
  try {
    const existingTodos = await getTodos()

    const updatedTodos = existingTodos.map(t => {
      return t.id === todo.id ? todo : t
    })
    const jsonValue = JSON.stringify(updatedTodos)
    await AsyncStorage.setItem(TODO_STORAGE_KEY, jsonValue)
    return updatedTodos
  } catch (error) {
    console.error(error)
    return null
  }
}

function convertTodosToArray(todos: Todos): Todo[] {
  return [...todos.currentTodos, ...todos.importCandidates]
}

