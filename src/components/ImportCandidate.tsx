import styled from 'styled-components/native'
import { Text } from 'react-native'
import Todo from '../util/Todo'
import { Feather } from '@expo/vector-icons';

type ImportCandidateProps = {
  todo: Todo,
  style?: any,
  onImportPress: (todo: Todo) => void,
  onDeletePress: (todo: Todo) => void
}

export default function ImportCandidate({ todo, style, onImportPress, onDeletePress }: ImportCandidateProps ) {

  // TODO: Passing on todo no longer needed?
  const handleImportPress = () => {
    onImportPress(todo)
  }

  const handleDeletePress = () => {
    onDeletePress(todo)
  }

  return (
    <Wrapper style={style}>
      <TodoText>
        <Text>{ todo.text }</Text>
      </TodoText>
      <ButtonWrapper>
        <StyledButton onPress={handleImportPress}>
          <Icon name="inbox" size={16} color="#341dcc" />
          <Text style={{ color: '#341dcc' }}>Import</Text>
        </StyledButton>
        <StyledButton onPress={handleDeletePress}>
          <Icon name="trash-2" size={16} color="#cc0c39" />
          <Text style={{ color: '#cc0c39' }}>Discard</Text>
        </StyledButton>
      </ButtonWrapper>
    </Wrapper>
  )
}

const TodoText = styled.View`
  padding: 20px;
`

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
`

const ButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top-width: 1px;
  border-top-color: #e4ebf0;
`

const StyledButton = styled.TouchableOpacity`
  padding: 15px 0;
  flex: 1;
  justify-content: center;
  flex-direction: row;
`

const Icon = styled(Feather)`
  margin-right: 10px;
`

