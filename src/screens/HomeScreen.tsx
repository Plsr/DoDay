import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import TodoItem from '../components/TodoItem'
import styled from 'styled-components/native'
import Todo from '../util/Todo'
import { saveTodo, updateTodo, getTodos } from '../util/TodoStorage';
import TitleText from '../components/ScreenTitle';
import ScreenWrapper from '../components/ScreenWrapper';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';


type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [todoValue, setTodoValue] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    initialGetTodos()
  }, [])


  const initialGetTodos = async () => {
    const todos = await getTodos()
    setTodos(todos?.todos ? todos.todos : [])
  }

  const handlePress = async () => {
    if(!todoValue) return
    const newTodos = await saveTodo(new Todo(todoValue))
    setTodos(newTodos ? newTodos : todos)
    setTodoValue('')
  }

  const handleCheckboxPress = async (todo: Todo) => {
    const currentTodos = [...todos]
    const updateCandidate = currentTodos.find(t => t.id == todo.id)
    if (updateCandidate) updateCandidate.isCompleted = !updateCandidate.isCompleted
    await updateTodo(todo)
    setTodos([...currentTodos])
  }

  const handleSettingsPress = () => {
    navigation.navigate("Settings")
  }

  return (
    <ScreenWrapper>
      <Header>
        <TitleText>Today</TitleText>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Feather name="settings" size={24} color="1e242b" />
        </TouchableOpacity>
      </Header>
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
      <CompletedText>Completed Todos</CompletedText>
      { todos.map((todo) => {
        if (todo.isCompleted === false) return
        return (<TodoItem key={todo.id} todo={todo} checkboxPress={handleCheckboxPress} />)
      })}
      <StatusBar style="auto" />
    </ScreenWrapper>
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

const Header = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
`

const TodoInput = styled.TextInput`
  padding: 20px 10px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  background-color: white;
`

const CompletedText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #1e242b;
  margin-bottom: 20px;
`

