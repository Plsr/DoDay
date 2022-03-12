import { Text } from 'react-native'
import styled from 'styled-components/native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

type ImportCandidateProps = {
  text: string
}

export default function ImportCandidate({ text }: ImportCandidateProps ) {
  const isPressed = useSharedValue(false)
  const offset = useSharedValue({ x: 0, y: 0 })
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1) }
      ],
      backgroundColor: isPressed.value ? 'yellow' : 'blue'
    }
  })

  const start = useSharedValue({ x: 0, y: 0 })
  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true
    })
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: 0
      }
    })
    .onEnd(() => {
      offset.value = {
        x: start.value.x,
        y: start.value.y
      }
    })
    .onFinalize(() => {
      isPressed.value = false;
    })


  return (
    <GestureDetector gesture={gesture}>
      <Wrapper style={animatedStyles}>
        <Text>{ text }</Text>
      </Wrapper>
    </GestureDetector>

  )
}

const Wrapper = styled(Animated.View)`
  background-color: #c6d8f5;
  padding: 10px;
  margin-bottom: 10px
`