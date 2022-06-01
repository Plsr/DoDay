import { StatusBar } from 'expo-status-bar';
import { useState, useContext } from 'react'
import TodoItem from '../components/TodoItem'
import styled from 'styled-components/native'
import Todo from '../util/Todo'
import { saveTodos, updateTodo, deleteTodo, importTodo, filterTodos } from '../util/TodoStorage';
import TitleText from '../components/ScreenTitle';
import ScreenWrapper from '../components/ScreenWrapper';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Modal from "react-native-modal";
import TodoForm from '../components/TodoForm'
import { TodoContext } from '../util/context'
import ImportCandidate from '../components/ImportCandidate';
import ImportCandidatesStack from '../components/ImportCandidatesStack';


type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const EMOJI_LIST = ['🔥', '🤘', '💪', '👑', '✨', '⚡️', '🌈', '🏅', '🏆', '📈']

// TODO: Smaller components for modal etc
export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { todos, setTodos } = useContext(TodoContext)
  const [modalVisible, setModalVisible] = useState(false)

  const daysIntoYear = (): number => {
    return Math.floor((Date.now() - Date.parse(new Date().getFullYear().toString())) / 86400000)
  }

  const handlePress = async (todoValue: string) => {
    if(!todoValue) return
    const newTodo = new Todo(todoValue)
    const updatedTodos = {...todos, currentTodos: [...todos.currentTodos, newTodo]}
    setTodos(updatedTodos)
    await saveTodos(updatedTodos)

    setModalVisible(false)
  }

  const handleCheckboxPress = async (todo: Todo) => {
    const currentTodos = [...todos.currentTodos]
    const updateCandidate = currentTodos.find(t => t.id == todo.id)
    if (updateCandidate) updateCandidate.isCompleted = !updateCandidate.isCompleted
    await updateTodo(todo)
    setTodos({ ...todos, currentTodos: [...currentTodos] })
  }

  const handleSettingsPress = () => {
    navigation.navigate("Settings")
  }

  const removeFromImportCandidates = (todo: Todo): Todo[] => {
    return todos.importCandidates.filter(importCandidate => (
      importCandidate.id !== todo.id
    ))
  }

  const handleDeleteImportCandidatePress = async (todo: Todo) => {
    const updatedImportCandidates = removeFromImportCandidates(todo)
    const newTodos = { ...todos, importCandidates: [...updatedImportCandidates]}
    setTodos(newTodos)
    await saveTodos(newTodos)
  }

  const handleImportTodoPress = async (todo: Todo) => {
    const updatedImportCandidates = removeFromImportCandidates(todo)
    todo.createdAt = new Date()

    const newTodos = {currentTodos: [...todos.currentTodos, todo], importCandidates: [...updatedImportCandidates]}
    setTodos(newTodos)
    await saveTodos(newTodos)
  }

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <TitleText>{EMOJI_LIST[daysIntoYear() % EMOJI_LIST.length]} Today</TitleText>
          <TouchableOpacity onPress={handleSettingsPress}>
            <Feather name="settings" size={24} color="#1e242b" />
          </TouchableOpacity>
        </Header>
        { todos.importCandidates.length > 0 && (
          <>
            <ImportTitle>Import from yesterday</ImportTitle>
            <ImportCandidatesStack
              importCandidates={[...todos.importCandidates]}
              onDeletePress={handleDeleteImportCandidatePress}
              onImportPress={handleImportTodoPress}
            />
          </>

        )}
        { todos.currentTodos.map((todo) => {
          if (todo.isCompleted === true) return
          return (<StyledTodo key={todo.id} todo={todo} checkboxPress={handleCheckboxPress} />)
        })}
        <CompletedText>🎉 Completed Todos</CompletedText>
        { todos.currentTodos.map((todo) => {
          if (todo.isCompleted === false) return
          return (<TodoItem key={todo.id} todo={todo} checkboxPress={handleCheckboxPress} />)
        })}
        <Modal
          style={{ justifyContent: 'flex-end', marginBottom: 60 }}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          avoidKeyboard
        >
          <TodoForm onSubmit={handlePress} />
        </Modal>

        <StatusBar style="auto" />
      </ScrollView>
      <FloatingButton onPress={() => setModalVisible(true)} >
          <Feather name="plus" size={24} color="#ffffff" />
        </FloatingButton>
    </ScreenWrapper>
  );
}

const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff5252;
  border-radius: 100px;
  width: 60px;
  height: 60px;
`

const Header = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
`

const CompletedText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #1e242b;
  margin-bottom: 20px;
  margin-top: 40px;
`

const ImportTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #1e242b;
  margin-bottom: 10px;
`

const StyledTodo = styled(TodoItem)`
  margin-bottom: 10px;
`
