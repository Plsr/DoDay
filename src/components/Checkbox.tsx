import styled from "styled-components/native"

type CheckboxProps = {
  onPress?(): any,
  checked?: boolean,
  cosmetic?: boolean,
  children?: React.ReactNode
}

export default function Checkbox({ onPress = () => {}, checked = false, cosmetic = false, children }: CheckboxProps) {
  return (
    <StyledCheckbox onPress={onPress} checked={checked} disabled={cosmetic}>
      { children }
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled.TouchableOpacity<{ checked: boolean}>`
  width: 15px;
  height: 15px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.checked ? '#ff5252' : '#4e5866'}
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.checked ? '#ff5252' : 'transparent'}
`