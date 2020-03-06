import React from 'react';
import {Header} from '../Header';
import {Game} from './Game';
import {Leaderboard} from './Leaderboard';
import {FieldHandler} from '../../field_handler';

const ActiveElem = {
  LB: 1,
  GAME: 2,
}

export class App extends React.Component {
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
            FieldHandler={FieldHandler}
            difficulty={this.difficulty}
            difficultyNames={this.difficultyNames}
            handleWin={this.handlers.handleWin}
          />}
        {/*<Footer/>*/}
      </>
    );
  }
}
