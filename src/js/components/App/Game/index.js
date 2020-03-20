import React from 'react';
import style from './index.module.css';
import {Field} from './Field';
import {ControlBar} from './Bars/ControlBar';
import {CurrentBar} from './Bars/CurrentBar';
import {ChangesList} from '../../../field_handler';

export const Bars = {
  NBR: 1,
  WIN: 2,
  CONFIRM_NG: 3,
  CONFIRM_RS: 4,
};

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.FieldHandler = props.FieldHandler;
    this.difficultyNames = props.difficultyNames || ['1', '2', '3', '4', '5'];
    this.difficulty = props.difficulty || 0;

    this.solvedField = this.FieldHandler.generateSolvedField();
    const field = this.FieldHandler.emptySolvedField(this.solvedField,
        this.difficulty);
    this.initialField = this.FieldHandler.cloneField(field);
    this.changesList = new ChangesList();
    this.setGameClock();

    this.state = {
      field,
      nbrsAmount: this.FieldHandler.countNbrs(field),
      selectedNbr: 0,
      canUndo: false,
      canRedo: false,
      gameTime: 0,
      isWin: false,
      currentBar: Bars.NBR, // rendering one of them
    };

    this.handlers = {
      handlePencilChange: () => {
        this.setState({isPencil: !this.state.isPencil});
      },

      handleNGClick: () => {
        this.setState({
          currentBar: (this.state.currentBar === Bars.CONFIRM_NG)
              ? (this.state.isWin ? Bars.WIN : Bars.NBR) : Bars.CONFIRM_NG,
        });
      },

      handleNG: difficulty => {
        this.clearGameClock();
        this.setGameClock();

        this.difficulty = difficulty;
        this.solvedField = this.FieldHandler.generateSolvedField();
        const field = this.FieldHandler.emptySolvedField(this.solvedField,
            this.difficulty);
        this.initialField = this.FieldHandler.cloneField(field);
        this.changesList = new ChangesList();

        this.setState({
          field,
          nbrsAmount: this.FieldHandler.countNbrs(field),
          isWin: false,
          currentBar: Bars.NBR,
          canRedo: false,
          canUndo: false,
        });
      },

      handleNGReject: () => {
        this.setState({
          currentBar: this.state.isWin ? Bars.WIN : Bars.NBR,
        });
      },

      handleRSClick: () => {
        this.setState({
          currentBar: (this.state.currentBar === Bars.CONFIRM_RS)
              ? (this.state.isWin ? Bars.WIN : Bars.NBR) : Bars.CONFIRM_RS,
        });
      },

      handleRS: () => {
        this.setState({
          field: this.FieldHandler.cloneField(this.initialField),
          nbrsAmount: this.FieldHandler.countNbrs(this.initialField),
          isWin: false,
          currentBar: Bars.NBR,
          canRedo: false,
          canUndo: false,
        });

        this.changesList = new ChangesList();
      },

      handleRSReject: () => {
        this.setState({
          currentBar: this.state.isWin ? Bars.WIN : Bars.NBR,
        });
      },

      handleSelectNbr: nbr => {
        this.setState({selectedNbr: this.state.selectedNbr === nbr ? 0 : nbr});
      },

      handleInput: (x, y) => {
        const changes = this.FieldHandler.updateValueAt(
            x,
            y,
            this.state.field,
            this.state.selectedNbr,
            this.state.nbrsAmount,
            this.state.isPencil
        );

        if (changes) {
          this.changesList.addChanges(changes);

          this.setState({
            field: this.state.field,
            nbrsAmount: this.state.nbrsAmount,
            canUndo: this.changesList.canUndo(),
            canRedo: this.changesList.canRedo(),
          });

          if (this.FieldHandler.isWin(this.state.field, this.solvedField)) {
            this.handlers.handleWin();
          }
        }
      },

      handleUndo: () => {
        if (this.changesList.canUndo()) {
          const prevChanges = this.changesList.prevChanges();

          prevChanges.valMap.forEach(
              ([oldValue], [x, y]) => this.FieldHandler.replaceValueAt(
                  x,
                  y,
                  oldValue,
                  this.state.field,
                  this.state.nbrsAmount
              ));
          this.setState({
            field: this.state.field, nbrsAmount: this.state.nbrsAmount,
            canUndo: this.changesList.canUndo(),
            canRedo: this.changesList.canRedo(),
          });
        }
      },

      handleRedo: () => {
        if (this.changesList.canRedo()) {
          const nextChanges = this.changesList.nextChanges();

          nextChanges.valMap.forEach(
              ([, newValue], [x, y]) => this.FieldHandler.replaceValueAt(
                  x,
                  y,
                  newValue,
                  this.state.field,
                  this.state.nbrsAmount
              ));
          this.setState({
            field: this.state.field, nbrsAmount: this.state.nbrsAmount,
            canUndo: this.changesList.canUndo(),
            canRedo: this.changesList.canRedo(),
          });
        }
      },

      handleWin: () => {
        this.clearGameClock();
        this.setState({
          isWin: true,
          selectedNbr: 0,
          currentBar: Bars.WIN,
        });
      },
    };
  }

  clearGameClock() {
    clearInterval(this.gameClockID);
  }

  setGameClock() {
    this.startTime = new Date().valueOf();
    this.gameClockID = setInterval(
        () => this.setState({
          gameTime: Math.round((new Date().valueOf() - this.startTime) / 1000)
        }),
        1000
    );
  }

  componentWillUnmount() {
    this.clearGameClock();
  }

  render() {
    return (
        <div className={style.component}>
          <Field
              fieldModel={this.state.field}
              initialFieldModel={this.initialField}
              selectedNbr={this.state.selectedNbr}
              isWin={this.state.isWin}
              handlers={this.handlers}
          />
          <CurrentBar
              nbrsAmount={this.state.nbrsAmount}
              selectedNbr={this.state.selectedNbr}
              gameTime={this.state.gameTime}
              currentBar={this.state.currentBar}
              difficultyNames={this.difficultyNames}
              difficulty={this.difficulty}
              handlers={this.handlers}
          />
          <ControlBar
              currentBar={this.state.currentBar}
              isPencil={this.state.isPencil}
              canUndo={this.state.canUndo}
              canRedo={this.state.canRedo}
              gameTime={this.state.gameTime}
              handlers={this.handlers}
          />
        </div>
    );
  }
}
