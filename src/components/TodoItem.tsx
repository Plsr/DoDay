
import { Todo } from "../util/Todo"
import styled from 'styled-components/native';

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
      <Checkbox onPress={handleCheckboxPress} />
      <TodoTitle completed={todo.isCompleted} >{todo.text}</TodoTitle>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  padding: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #ffffff;
  shadow-color: #666;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  border-radius: 8px;
  margin-bottom: 20px;
  opacity: ${props => props.completed ? '0.3' : '1'}
`

const Checkbox = styled.TouchableOpacity`
  width: 15px;
  height: 15px;
  border-radius: 4px;
  border: 1px solid #4e5866;
  margin-right: 20px;
`

const TodoTitle = styled.Text`
  color: #1e242b;
  font-weight: 500;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'}
`