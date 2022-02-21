import TitleText from "../components/ScreenTitle";
import ScreenWrapper from "../components/ScreenWrapper";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import { deleteAllTodos } from '../util/TodoStorage';
import { NavigationProp, ParamListBase } from "@react-navigation/native";

// TODO: Add "are you sure" prompt
type SettingsScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const handleBackPress = () => {
    navigation.navigate('Home')
  }

  const handleDeleteConfirmed = () => {
    deleteAllTodos()
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }]
    })
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