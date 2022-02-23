import { ActivityIndicator } from 'react-native'
import { useEffect, useContext } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import styled from 'styled-components/native'
import { getTodos } from '../util/TodoStorage'
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import { TodoContext } from '../util/context'

type SplashScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

export default function SplashScreen({ navigation }: SplashScreenProps) {
  const { setTodos } = useContext(TodoContext)
  useEffect(() => {
    initialGetTodos()
  }, [])

  const initialGetTodos = async () => {
    const todos = await getTodos()
    const todoArray = todos ? todos.todos : []
    setTodos(todoArray)
    navigation.navigate('Home', { todos: todoArray })
  }

  return (
    <ScreenWrapper>
      <Wrapper>
        <Title>DoDay</Title>
        <ActivityIndicator />
      </Wrapper>
    </ScreenWrapper>
  )
}

const Wrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Title = styled.Text`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
`
