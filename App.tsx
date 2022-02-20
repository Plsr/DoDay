import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from './src/components/TodoItem'
import styled from 'styled-components/native'
import Todo from './src/util/Todo'
import { saveTodo, updateTodo, getTodos } from './src/util/TodoStorage';

const TODO_STORAGE_KEY = "@doday_todos"

export default function App() {
  const [todoValue, setTodoValue] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

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

  const handlePress = async () => {
    if(!todoValue) return
    const newTodos = await saveTodo(new Todo(todoValue))
    setTodos(newTodos ? newTodos : todos)
  }

  const handleCheckboxPress = async (todo: Todo) => {
    const currentTodos = [...todos]
    const checkedTodo = currentTodos.find(t => t.id == todo.id)
    if (checkedTodo) checkedTodo.isCompleted = true
    await updateTodo(todo)
    setTodos([...currentTodos])
  }

  return (
    <AppWrapper>
      <TitleText>Today</TitleText>
      { todos.map((todo) => {
        if (todo.isCompleted === true) return
        return (<TodoItem todo={todo} checkboxPress={handleCheckboxPress} />)
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
        return (<TodoItem todo={todo} checkboxPress={handleCheckboxPress} />)
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