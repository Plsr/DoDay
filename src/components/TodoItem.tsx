
import Todo from "../util/Todo"
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import Checkbox from './Checkbox'

type TodoProps = {
  todo: Todo,
  checkboxPress?(todo: Todo): void,
  cosmetic?: boolean
}

export default function TodoItem({ todo, checkboxPress = () => {}, cosmetic = false }: TodoProps) {

  const handleCheckboxPress = () => {
    checkboxPress(todo)
  }
  return (
    <Wrapper completed={todo.isCompleted}>
      <Checkbox onPress={handleCheckboxPress} checked={todo.isCompleted} cosmetic={cosmetic} >
        { todo.isCompleted && <Feather name="check" size={12} color="#f5e6e6" /> }
      </Checkbox>
      <TodoTitle completed={todo.isCompleted} >{todo.text}</TodoTitle>
    </Wrapper>
  )
}

const Wrapper = styled.View<{ completed: boolean }>`
  padding: 20px;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 8px;
  opacity: ${props => props.completed ? '0.3' : '1'}
`

const TodoTitle = styled.Text<{ completed: boolean }>`
  color: #1e242b;
  font-weight: 500;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'}
  flex: 1;
`
