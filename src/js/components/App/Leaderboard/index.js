import React from 'react';
import style from './index.module.css';

export class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openedTab: 2, // for difficulties 0-4
    };
  }

  render() {
    return (
      <div className={style.component}>
        <ul className={style.difficulties}>
          <button className="lb-difficulty-tab">newbie</button>
          <button className="lb-difficulty-tab">easy</button>
          <button className="lb-difficulty-tab">medium</button>
          <button className="lb-difficulty-tab">hard</button>
          <button className="lb-difficulty-tab">expert</button>
        </ul>
        <ul className={style.bestTimes}>
          <li className={style.bestTime}>
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className={style.bestTime}>
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className={style.bestTime}>
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className={style.bestTime}>
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className={style.bestTime}>
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className={style.bestTime}>
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className={style.bestTime}>
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className={style.bestTime}>
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className={style.bestTime}>
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className={style.bestTime}>
            <p>date</p><p>player name</p><p>time</p>
          </li>
        </ul>
        <div className={style.controlBar}>
          <button>new game</button>
          <button>continue</button>
        </div>
      </div>
    );
  }
}
