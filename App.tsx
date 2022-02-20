import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from './src/components/TodoItem'
import styled from 'styled-components/native'
import Todo from './src/util/Todo'
import { saveTodo, updateTodo, getTodos, deleteAllTodos } from './src/util/TodoStorage';

export default function App() {
  const [todoValue, setTodoValue] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    initialGetTodos()
  }, [])

  const handleDeleteAllPress = async() => {
    deleteAllTodos()
    setTodos([])
  }

  const initialGetTodos = async () => {
    const todos = await getTodos()
    setTodos(todos?.todos ? todos.todos : [])
  }

  const handlePress = async () => {
    if(!todoValue) return
    const newTodos = await saveTodo(new Todo(todoValue))
    setTodos(newTodos ? newTodos : todos)
  }

  const handleCheckboxPress = async (todo: Todo) => {
    const currentTodos = [...todos]
    const updateCandidate = currentTodos.find(t => t.id == todo.id)
    if (updateCandidate) updateCandidate.isCompleted = !updateCandidate.isCompleted
    await updateTodo(todo)
    setTodos([...currentTodos])
  }

  return (
    <SafeWrapper>
      <AppWrapper>
        <TitleText>Today</TitleText>
        { todos.map((todo) => {
          if (todo.isCompleted === true) return
          return (<TodoItem key={todo.id} todo={todo} checkboxPress={handleCheckboxPress} />)
        })}
        <TodoInput
          placeholder="🥑 Buy some avocados..."
          value={todoValue}
          onChangeText={setTodoValue}
        />
        <SubmitButton
          onPress={handlePress}
          disabled={!todoValue}
        >
          <SubmitText>Add todo</SubmitText>
        </SubmitButton>
        <DeleteAllButton
          onPress={handleDeleteAllPress}
          title="Delete all todos"
        />
        <CompletedText>Completed Todos</CompletedText>
        { todos.map((todo) => {
          if (todo.isCompleted === false) return
          return (<TodoItem key={todo.id} todo={todo} checkboxPress={handleCheckboxPress} />)
        })}
        <StatusBar style="auto" />
      </AppWrapper>
    </SafeWrapper>
  );
}

const SubmitButton = styled.Pressable`
  background-color: #ff5252;
  padding: 10px;
  border-radius: 4px;
  margin: 20px 0;
`

const SubmitText = styled.Text`
  color: #f5e6e6;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
`

const TodoInput = styled.TextInput`
  padding: 20px 10px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  background-color: white;
`

const AppWrapper = styled.View`
  background-color: #f0f3f7;
  height: 100%;
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

const SafeWrapper = styled.SafeAreaView`
  background-color: #f0f3f7;
`
