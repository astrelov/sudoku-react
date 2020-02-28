import React from 'react'
import ReactDOM from 'react-dom'
import { Header } from './js/components/Header'
import { Footer } from './js/components/Footer'
import { Game } from './js/components/Game/Game'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Header />
        <Game />
        <Footer />
      </>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#container'))
