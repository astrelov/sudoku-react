import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './js/components/Header/index';
import {Footer} from './js/components/Footer/index';
import {Game} from './js/components/Game/index';
import {Leaderboard} from './js/components/Leaderboard/index';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: 'leaderboard', // leaderboard, game
    };
  }

  render() {
    return (
      <>
        <Header/>
        {this.state.appState !== 'leaderboard' ? <Leaderboard/> : <Game/>}
        <Footer/>
      </>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#container'));
