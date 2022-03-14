import styled from 'styled-components/native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import TodoItem from './TodoItem'
import Todo from '../util/Todo'
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ImportCandidateProps = {
  todo: Todo,
  onImportPress: (todo: Todo) => void,
  onDeletePress: (todo: Todo) => void
}

export default function ImportCandidate({ todo, onImportPress, onDeletePress }: ImportCandidateProps ) {

  const handleImportPress = () => {
    onImportPress(todo)
  }

  const handleDeletePress = () => {
    onDeletePress(todo)
  }

  const renderLeftActions = () => {
    return (
      <SwipeActionWrapper>
        <TouchableOpacity onPress={handleImportPress}>
          <Feather name="repeat" size={20} color="#1b62bf" />
        </TouchableOpacity>
      </SwipeActionWrapper>
    )
  }

  const renderRightActions = () => {
    return (
      <SwipeActionWrapper>
        <TouchableOpacity onPress={handleDeletePress}>
          <Feather name="trash-2" size={20} color="#e62542" />
        </TouchableOpacity>
      </SwipeActionWrapper>
    )
  }
  return (
    <Wrapper>
      <Swipeable overshootLeft={false} overshootRight={false} renderLeftActions={renderLeftActions} renderRightActions={renderRightActions}>
        <TodoItem todo={todo} cosmetic />
      </Swipeable>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  transform: translateX(0);
  margin-bottom: 20px;
  border-radius: 9px;
`

const SwipeActionWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`