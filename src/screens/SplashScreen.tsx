import { ActivityIndicator } from 'react-native'
import { useEffect, useContext } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import styled from 'styled-components/native'
import { getTodos, filterTodos, deleteAllTodos } from '../util/TodoStorage'
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import { TodoContext } from '../util/context'
import { isYesterday, isToday, parseISO } from 'date-fns'
import Todo from '../util/Todo'

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
    console.log('initial todos: ', todos)
    const [currentTodos, importCandidates] = filterTodos(todos)
    setTodos({currentTodos, importCandidates})
    navigation.navigate('Home', { todos: todos })
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
