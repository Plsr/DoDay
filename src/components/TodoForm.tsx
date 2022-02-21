import { View, TextInput, NativeAppEventEmitter } from "react-native"
import Checkbox from "./Checkbox"
import styled from "styled-components/native"
import { useState } from 'react'

type TodoFormProps = {
  onSubmit(text: string): any
}

export default function TodoForm({ onSubmit }: TodoFormProps) {

  const [inputValue, setInputValue] = useState('')

  // TODO: Better handling for empty input
  const handleEndEditing = () => {
    if (!inputValue.trim()) return
    onSubmit(inputValue)
  }
  return (
    <Wrapper>
      <Checkbox cosmetic />
      <Input 
        placeholder="new todo"
        onEndEditing={handleEndEditing}
        value={inputValue}
        onChangeText={setInputValue}
        autoFocus
      />
    </Wrapper>
  )
}

// TODO: Same as todoitem?
const Wrapper = styled.View`
  padding: 20px;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 4px;
`

const Input = styled.TextInput`
  flex: 1;
`