import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Todo from './src/components/Todo'
import styled from 'styled-components/native'
import uuid from 'react-native-uuid'

export interface TodoInterface {
  createdAt: Date,
  text: string,
  tags?: string[],
  isCompleted: boolean,
  id: string
}

interface Todos {
    todos: TodoInterface[]
}

const TODO_STORAGE_KEY = "@doday_todos"

export default function App() {
  const [todoValue, setTodoValue] = useState("")
  const [todos, setTodos] = useState<TodoInterface[]>([])

  useEffect(() => {
    initialGetTodos()
  }, [])

  const handleDeleteAllPress = async() => {
    AsyncStorage.removeItem(TODO_STORAGE_KEY)
    setTodos([])
  }

  const initialGetTodos = async () => {
    const todos = await getTodos()
    if (todos) console.log(todos.todos)
    setTodos(todos?.todos ? todos.todos : [])
  }

  const handlePress = () => {
    if(!todoValue) return
    // console.log(todoValue)
    storeData(buildTodo(todoValue))
  }

  const buildTodo = (todoText: string): TodoInterface => {
    return {
      text: todoText,
      createdAt: new Date(),
      isCompleted: false,
      id: uuid.v4() as string
    }
  }

  const getTodos = async (): Promise<Todos | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(TODO_STORAGE_KEY)
      return jsonValue != null ? JSON.parse(jsonValue) as Todos : null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const storeData = async (value: TodoInterface) => {
    try {
      const existingTodos = await getTodos()
      if (existingTodos) {
        // console.log(existingTodos)
      }
      const todos = existingTodos?.todos ? [...existingTodos.todos, value] : [value]
      const jsonValue = JSON.stringify({ todos })
      await AsyncStorage.setItem(TODO_STORAGE_KEY, jsonValue)
      setTodos([...todos, value])
    } catch (e) {
      // saving error
      console.error(e)
    }
  }

  // TODO: Finish update todo thingy, update properties
  const updateTodo = async (todo: TodoInterface) => {
    try {
      const existingTodos = await getTodos()
      if (!existingTodos) return
      const updatedTodos = existingTodos.todos.map(t => {
        return t.id === todo.id ? todo : t
      })
      console.log(updatedTodos)
      const jsonValue = JSON.stringify({ todos: updatedTodos })
      console.log(jsonValue)
      await AsyncStorage.setItem(TODO_STORAGE_KEY, jsonValue)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCheckboxPress = async (todo: TodoInterface) => {
    console.log("pressed")
    console.log(todo.id)
    const currentTodos = [...todos]
    const checkedTodo = currentTodos.find(t => t.id == todo.id)
    if (checkedTodo) checkedTodo.isCompleted = true
    console.log(currentTodos)
    await updateTodo(todo)
    setTodos([...currentTodos])
  }

  return (
    <AppWrapper>
      <TitleText>Today</TitleText>
      { todos.map((todo) => {
        if (todo.isCompleted === true) return
        return (<Todo todo={todo} checkboxPress={handleCheckboxPress} />)
      })}
      <Text>Open up App.tsx to start working on your app!</Text>
      <TextInput 
        placeholder="🥑 Buy some avocados..."
        value={todoValue}
        onChangeText={setTodoValue}
      />
      <Button 
        onPress={handlePress}
        disabled={!todoValue}
        title="submit"
      />
      <DeleteAllButton
        onPress={handleDeleteAllPress}
        title="Delete all todos"
      />
      <CompletedText>Completed Todos</CompletedText>
      { todos.map((todo) => {
        if (todo.isCompleted === false) return
        return (<Todo todo={todo} checkboxPress={handleCheckboxPress} />)
      })}
      <StatusBar style="auto" />
    </AppWrapper>
  );
}

const AppWrapper = styled.View`
  background-color: #f0f3f7;
  height: 100%;
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
`

const TitleText = styled.Text`
  font-size: 30px;
  font-weight: 700;
  color: #1e242b;
  margin-bottom: 20px;
`

const CompletedText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #1e242b;
  margin-bottom: 20px;
`

const DeleteAllButton = styled.Button`
  margin-top: 40px;
  color: red;
`