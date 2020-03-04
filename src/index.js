import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './js/components/Header/index';
import {Footer} from './js/components/Footer/index';
import {Game} from './js/components/Game/index';
import {Leaderboard} from './js/components/Leaderboard/index';
import './index.css';

const ActiveElem = {
  LB: 1,
  GAME: 2,
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.difficultyNames = ['newbie', 'easy', 'medium', 'hard', 'expert'];
    this.difficulty = 0;

    this.state = {
      appState: ActiveElem.GAME,
    };

    this.handlers = {
      handleWin: (result) => {
        // write result to leaderboard
      }
    }
  }

  render() {
    return (
      <>
        <Header/>
        {this.state.appState === ActiveElem.LB ? <Leaderboard /> :
          <Game
            difficulty={this.difficulty}
            difficultyNames={this.difficultyNames}
            handleWin={this.handlers.handleWin}
          />}
        {/*<Footer/>*/}
      </>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#container'));
