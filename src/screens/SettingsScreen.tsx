import TitleText from "../components/ScreenTitle";
import ScreenWrapper from "../components/ScreenWrapper";
import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { deleteAllTodos } from '../util/TodoStorage';

// TODO: Add "are you sure" prompt
// TODO: Prop types
export default function SettingsScreen({ navigation }) {
  const handleBackPress = () => {
    navigation.navigate('Home')
  }

  const handleDeleteAllPress = async() => {
    deleteAllTodos()
    navigation.reset({
      index: 0,
      // TODO: Export routes somewhere
      routes: [{ name: 'Home' }]
    })
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