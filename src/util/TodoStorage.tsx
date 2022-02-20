import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todos } from './types'
import Todo from './Todo'

const TODO_STORAGE_KEY = "@doday_todos"


export async function saveTodo(value: Todo): Promise<Todo[] | null> {
  try {
    const existingTodos = await getTodos()
    const todos = existingTodos?.todos ? [...existingTodos.todos, value] : [value]
    const jsonValue = JSON.stringify({ todos })
    await AsyncStorage.setItem(TODO_STORAGE_KEY, jsonValue)
    return todos
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getTodos(): Promise<Todos | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(TODO_STORAGE_KEY)
    return jsonValue != null ? JSON.parse(jsonValue) as Todos : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function updateTodo(todo: Todo): Promise<Todo[] | null> {
  try {
    const existingTodos = await getTodos()
    if (!existingTodos) return null

    const updatedTodos = existingTodos.todos.map(t => {
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

