
import Todo from "../util/Todo"
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

type TodoProps = {
  todo: Todo,
  checkboxPress(todo: Todo): void
}

export default function TodoItem({ todo, checkboxPress }: TodoProps) {

  const handleCheckboxPress = () => {
    checkboxPress(todo)
  }
  return (
    <Wrapper completed={todo.isCompleted}>
      <Checkbox onPress={handleCheckboxPress} completed={todo.isCompleted}>
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
  width: 100%;
  background-color: #ffffff;
  shadow-color: #666;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.4;
  shadow-radius: 2px;
  border-radius: 8px;
  margin-bottom: 20px;
  opacity: ${props => props.completed ? '0.3' : '1'}
`

const Checkbox = styled.TouchableOpacity<{ completed: boolean}>`
  width: 15px;
  height: 15px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.completed ? '#ff5252' : '#4e5866'}
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.completed ? '#ff5252' : 'transparent'}
`

const TodoTitle = styled.Text<{ completed: boolean }>`
  color: #1e242b;
  font-weight: 500;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'}
`
