import React from 'react'
// import Exchange from './containers/_Exchange'
import Exchange from './containers/Exchange'
import {
  Title, Subtitle, Container, AppWrapper,
} from './styles'

function App() {
  return (
    <AppWrapper>
      <Container>
        <header className="App-header" style={{ marginBottom: '45px' }}>
          <Title>Crypto Exchange</Title>
          <Subtitle>Exchange fast end easy</Subtitle>
        </header>
        <Exchange />
      </Container>
    </AppWrapper>
  )
}

export default App
