import styled from "styled-components/native"

type props = {
  children: React.ReactNode
}

export default function ScreenWrapper({ children }: props) {
  return (
    <SafeWrapper>
      <AppWrapper>
        { children }
      </AppWrapper>
    </SafeWrapper>
  )

}

const AppWrapper = styled.View`
  background-color: #f0f3f7;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
`

const SafeWrapper = styled.SafeAreaView`
  background-color: #f0f3f7;
`