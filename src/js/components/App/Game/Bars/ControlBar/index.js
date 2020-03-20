import React from 'react';
import {disabled, selected, text} from '../../../../App/index.module.css';
import {bar, btn} from '../../Bars/index.module.css';
import style from './index.module.css';
import {GameClock} from './GameClock';
import {Bars} from '../../../Game';

export const ControlBar = ({isPencil, currentBar, canUndo, canRedo, gameTime, handlers}) => {
  const {handleNGClick, handleRSClick, handlePencilChange, handleUndo, handleRedo} = handlers;

  return (
      <div className={[style.component, bar].join(' ')}>
        <GameClock classNames={[btn]} time={gameTime}/>

        <button
            className={[btn,
              (currentBar === Bars.CONFIRM_NG) ? selected : ''].join(' ')}
            onClick={handleNGClick}
        >
          <div className={text}>New Game</div>
        </button>

        <button
            className={[btn,
              (currentBar === Bars.CONFIRM_RS) ? selected : ''].join(' ')}
            onClick={handleRSClick}
        >
          <svg>
            <use xlinkHref="./index.svg#restart"/>
          </svg>
        </button>

        <button className={[btn, (isPencil ? selected : '')].join(' ')}
                onClick={handlePencilChange}>
          <svg>
            <use xlinkHref="./index.svg#pencil"/>
          </svg>
        </button>

        <button className={[btn, (canUndo ? '' : disabled)].join(' ')}
                onClick={handleUndo}>
          <svg>
            <use xlinkHref="./index.svg#undo"/>
          </svg>
        </button>

        <button className={[btn, (canRedo ? '' : disabled)].join(' ')}
                onClick={handleRedo}>
          <svg>
            <use xlinkHref="./index.svg#redo"/>
          </svg>
        </button>
      </div>
  );
};
