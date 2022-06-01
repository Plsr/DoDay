import Todo from '../util/Todo'
import ImportCandidate from './ImportCandidate'
import styled from 'styled-components/native'

type ImportCandidatesStackProps = {
  importCandidates: Todo[],
  onImportPress: (todo: Todo) => void,
  onDeletePress: (todo: Todo) => void
}

export default function ImportCandidatesStack({ importCandidates, onDeletePress, onImportPress }: ImportCandidatesStackProps) {
  if (importCandidates.length == 1) {
    return (
      <ImportCandidate
        todo={importCandidates[0]}
        onDeletePress={() => onDeletePress(importCandidates[0])}
        onImportPress={() => onImportPress(importCandidates[0])}
      />
    )
  } else {
    return (
      <Wrapper>
        <ImportCandidateWithShadow
          todo={importCandidates[0]}
          onDeletePress={() => onDeletePress(importCandidates[0])}
          onImportPress={() => onImportPress(importCandidates[0])}
        />
        <BackgroundStack level={1}/>
        { importCandidates.length > 2 && (
          <BackgroundStack level={2} />
        )}
      </Wrapper>
      
    )
  }
}

const Wrapper = styled.View`
  position: relative;
`
const BackgroundStack = styled.View<{ level: number }>`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
  height: 30px;
  opacity: ${props => 1 - props.level / 4 };
  top: ${props => props.level * -15}px;
  z-index: ${props => props.level * -1};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`

const ImportCandidateWithShadow = styled(ImportCandidate)`
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`
