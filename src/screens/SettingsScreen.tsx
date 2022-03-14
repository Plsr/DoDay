import TitleText from "../components/ScreenTitle";
import ScreenWrapper from "../components/ScreenWrapper";
import styled from "styled-components/native";
import { Alert, Text, Button } from "react-native";
import { Feather } from '@expo/vector-icons';
import { deleteAllTodos, filterTodos, saveTodos } from '../util/TodoStorage';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { TodoContext } from "../util/context";
import { useContext } from 'react'
import Todo from '../util/Todo'
import { sub } from 'date-fns'


type SettingsScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { todos, setTodos } = useContext(TodoContext)

  const handleBackPress = () => {
    navigation.navigate('Home')
  }

  const handleDeleteConfirmed = () => {
    deleteAllTodos()
    setTodos({currentTodos: [], importCandidates: []})
    navigation.navigate('Home')
  }

  const handleDeleteAllPress = async() => {
    Alert.alert(
      "Delete all Todos",
      "This will delete all todos, open and done. Are you sure?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Yes, delete", onPress: handleDeleteConfirmed }
      ]
    );
  }

  const createImportCandidateTodos = async() => {
    const createdAt = sub(new Date(), { days: 1 })
    const importCandidate = new Todo('Import candidate', [], false, createdAt)
    const newTodos = {...todos, importCandidates: [...todos.importCandidates, importCandidate]}
    setTodos(newTodos)
    await saveTodos(newTodos)
  }


  return (
    <ScreenWrapper>
      <Header>
        <BackButton onPress={handleBackPress}>
          <Feather name="arrow-left" size={24} color="#1e242b" />
        </BackButton>
        <TitleText>Settings</TitleText>
      </Header>
      <DeleteAllButton
        onPress={handleDeleteAllPress}
        title="Delete all todos"
      />
      <Text>Developer Tools</Text>
      <Button
        onPress={createImportCandidateTodos}
        title="Create import candidates"
      />

    </ScreenWrapper>
  )
}

const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`

const BackButton = styled.TouchableOpacity`
  margin-right: 20px;
`

const DeleteAllButton = styled.Button`
  margin-top: 40px;
  color: red;
`
