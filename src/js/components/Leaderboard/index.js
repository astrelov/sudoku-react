import React from 'react';
import {Button} from '../Button/index';
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
      <div id={style.component}>
        <ul id="lb-difficulties">
          <button className="lb-difficulty-tab">newbie</button>
          <button className="lb-difficulty-tab">easy</button>
          <button className="lb-difficulty-tab">medium</button>
          <button className="lb-difficulty-tab">hard</button>
          <button className="lb-difficulty-tab">expert</button>
        </ul>
        <ul id="lb-best-times">
          <li className="best-time">
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className="best-time">
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className="best-time">
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className="best-time">
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className="best-time">
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className="best-time">
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className="best-time">
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className="best-time">
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className="best-time">
            <p>date</p><p>player name</p><p>time</p>
          </li>
          <li className="best-time">
            <p>date</p><p>player name</p><p>time</p>
          </li>
        </ul>
        <div id="lb-control-bar">
          <Button>new game</Button>
          <Button>continue</Button>
        </div>
      </div>
    );
  }
}
