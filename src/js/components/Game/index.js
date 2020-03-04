import React from 'react';
import {Field} from './Field';
import {ControlBar} from './GameBars/ControlBar';
import {CurrentBar} from './GameBars/CurrentBar';
import style from './index.module.css';

export const Bars = {
  NBR: 1,
  WIN: 2,
  CONFIRM_NG: 3,
  CONFIRM_RS: 4,
};

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.difficultyNames = props.difficultyNames || ['1', '2', '3', '4', '5'];
    this.difficulty = props.difficulty || 0;

    const field = this.generateField();
    this.initialField = Game.cloneField(field);
    this.changesList = new ChangesList();
    this.setGameClock();

    this.state = {
      field,
      nbrsAmount: Game.countNbrs(field),
      selectedNbr: 0,
      canUndo: false,
      canRedo: false,
      gameTime: 0,
      isWin: false,
      currentBar: Bars.NBR, // rendering one of them
    };

    this.handlers = {
      // TODO refactor to get only boolean, not {target}
      handlePencilChange: ({target}) => {
        const isSelected = target.classList.contains('selected');

        this.setState({isPencil: !isSelected});
      },

      // TODO refactor to get only boolean, not {target}
      handleNGConfirm: ({target}) => {
        const confirming = target.classList.contains('selected');

        this.setState({
          currentBar: confirming ? (this.state.isWin ? Bars.WIN : Bars.NBR) : Bars.CONFIRM_NG,
        });
      },

      handleNGReject: () => {
        this.setState({
          currentBar: this.state.isWin ? Bars.WIN : Bars.NBR,
        });
      },

      // TODO refactor to get only boolean, not {target}
      handleRSConfirm: ({target}) => {
        const confirming = target.classList.contains('selected');

        this.setState({
          currentBar: confirming ? (this.state.isWin ? Bars.WIN : Bars.NBR) : Bars.CONFIRM_RS,
        });
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
        // returns boolean for update status
        function updateValueAt(x, y, field = this.state.field, number = this.state.selectedNbr) {
          function clearPencilRow(
            y,
            changes,
            field = this.state.field,
            number = this.state.selectedNbr
          ) {
            let oldValue;
            let newValue;

            for (let x = 0; x < 9; x++) {
              if (Array.isArray(field[x][y]) && field[x][y].includes(number)) {
                oldValue = field[x][y].slice();
                field[x][y].splice(field[x][y].indexOf(number), 1);
                newValue = field[x][y].slice();
                changes.add(x, y, oldValue, newValue);
              }
            }
          }

          function clearPencilCol(
            x,
            changes,
            field = this.state.field,
            number = this.state.selectedNbr
          ) {
            let oldValue;
            let newValue;

            for (let y = 0; y < 9; y++) {
              if (Array.isArray(field[x][y]) && field[x][y].includes(number)) {
                oldValue = field[x][y].slice();
                field[x][y].splice(field[x][y].indexOf(number), 1);
                newValue = field[x][y].slice();
                changes.add(x, y, oldValue, newValue);
              }
            }
          }

          function clearPencil3x3(
            _x,
            _y,
            changes,
            field = this.state.field,
            number = this.state.selectedNbr
          ) {
            function getStartCoordOf3x3(numX, numY) {
              let start3x3X;
              let start3x3Y;

              for (let i = 0; i < 3; i++) {
                if ((numX - i) % 3 === 0) {
                  start3x3X = numX - i;
                }
                if ((numY - i) % 3 === 0) {
                  start3x3Y = numY - i;
                }
              }
              return [start3x3X, start3x3Y];
            }

            const [start3x3X, start3x3Y] = getStartCoordOf3x3(_x, _y, field);
            let oldValue;
            let newValue;

            for (let x = start3x3X; x < start3x3X + 3; x++) {
              for (let y = start3x3Y; y < start3x3Y + 3; y++) {
                if (Array.isArray(field[x][y]) && field[x][y].includes(number)) {
                  oldValue = field[x][y].slice();
                  field[x][y].splice(field[x][y].indexOf(number), 1);
                  newValue = field[x][y].slice();
                  changes.add(x, y, oldValue, newValue);
                }
              }
            }
          }

          function inputPencilVal(x, y, field = this.state.field, number = this.state.selectedNbr) {
            // if there is no array of pencil numbers => create it
            if (!Array.isArray(field[x][y])) {
              field[x][y] = [];
            }
            // if no such number among pencil numbers => add it and sort them
            if (!field[x][y].includes(number)) {
              field[x][y].push(number);
              field[x][y].sort();
            }
            // if number already among pencil numbers => remove it
            else {
              field[x][y].splice(field[x][y].indexOf(number), 1);
            }
          }

          function inputNbrVal(x, y, field = this.state.field, number = this.state.selectedNbr) {
            // new number => fill it
            if (number !== field[x][y]) {
              field[x][y] = number;
              this.state.nbrsAmount[field[x][y]]++;
            }
            // same number => remove it
            else {
              field[x][y] = 0;
            }
          }

          const changes = new Changes();
          const oldValue = Array.isArray(field[x][y]) ? field[x][y].slice() : field[x][y];

          // if there is a number => decrease amount
          if (field[x][y] && typeof field[x][y] === 'number') {
            this.state.nbrsAmount[field[x][y]]--;
          }

          if (number) {
            if (this.state.isPencil) {
              inputPencilVal.call(this, x, y, field, number);
            } else {
              inputNbrVal.call(this, x, y, field, number);
              clearPencilRow.call(this, y, changes, field, number);
              clearPencilCol.call(this, x, changes, field, number);
              clearPencil3x3.call(this, x, y, changes, field, number);
            }
          } else {
            if (!field[x][y]) {
              // there is no value and it is not updated
              return false;
            }
            field[x][y] = 0;
          }

          const newValue = Array.isArray(field[x][y]) ? field[x][y].slice() : field[x][y];
          changes.add(x, y, oldValue, newValue);
          this.changesList.addChanges(changes);
          return true;
        }

        function isWin() {
          const allNums = '123456789';

          function fieldIsFilledFull(nbrsAmount = this.state.nbrsAmount) {
            nbrsAmount[0] = 0;
            return nbrsAmount.reduce((acc, numAmount) => acc + numAmount, 0) === 81;
          }

          function checkWinRows(field = this.state.field) {
            let row;

            for (let y = 0; y < 9; y++) {
              row = [];

              for (let x = 0; x < 9; x++) {
                row.push(field[x][y]);
              }

              row = row.sort().join('');

              if (row !== allNums) {
                return false;
              }
            }

            return true;
          }

          function checkWinColumns(field = this.state.field) {
            return field.every(column => {
              let columnStr = column
                .slice()
                .sort()
                .join('');

              return columnStr === allNums;
            });
          }

          function checkWin3x3(field = this.state.field) {
            let nums3x3;

            for (let x3 = 0; x3 < 9; x3 += 3) {
              for (let y3 = 0; y3 < 9; y3 += 3) {
                nums3x3 = [];
                for (let x = x3; x < x3 + 3; x++) {
                  for (let y = y3; y < y3 + 3; y++) {
                    nums3x3.push(field[x][y]);
                  }
                }
                if (nums3x3.sort().join('') !== allNums) {
                  return false;
                }
              }
            }
            return true;
          }

          return (
            fieldIsFilledFull.call(this) &&
            checkWinRows.call(this) &&
            checkWinColumns.call(this) &&
            checkWin3x3.call(this)
          );
        }

        if (updateValueAt.call(this, x, y)) {
          this.setState({
            field: this.state.field,
            nbrsAmount: this.state.nbrsAmount,
            canUndo: this.changesList.canUndo(),
            canRedo: this.changesList.canRedo(),
          });

          if (isWin.call(this)) {
            this.handlers.handleWin();
          }
        }
      },

      handleNG: difficulty => {
        this.clearGameClock();
        this.setGameClock();

        this.difficulty = difficulty;
        const field = this.generateField();
        this.initialField = Game.cloneField(field);
        this.changesList = new ChangesList();

        this.setState({
          field,
          nbrsAmount: Game.countNbrs(field),
          isWin: false,
          currentBar: Bars.NBR,
          canRedo: false,
          canUndo: false,
        });
      },

      handleRS: () => {
        this.setState({
          field: Game.cloneField(this.initialField),
          nbrsAmount: Game.countNbrs(this.initialField),
          isWin: false,
          currentBar: Bars.NBR,
          canRedo: false,
          canUndo: false,
        });

        this.changesList = new ChangesList();
      },

      handleUndo: () => {
        if (this.changesList.canUndo()) {
          const prevChanges = this.changesList.prevChanges();

          prevChanges.valMap.forEach(([oldValue], [x, y]) => this.updateValueAt(x, y, oldValue));
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

          nextChanges.valMap.forEach(([, newValue], [x, y]) => this.updateValueAt(x, y, newValue));
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

  static cloneField(field) {
    const clone = [];

    for (let column of field) {
      clone.push(column.slice());
    }
    return clone;
  }

  // amount of each number on field. Returns [0, amountOf(1), amountOf(2), ..., amountOf(9)]
  static countNbrs(field) {
    const filledAmount = new Array(10).fill(0);

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        filledAmount[field[x][y]]++;
      }
    }
    return filledAmount;
  }

  generateField(difficulty = this.difficulty) {
    function generateEmptyField() {
      const field = [];

      for (let y = 0; y < 9; y++) {
        field.push(new Array(9).fill(0));
      }
      return field;
    }

    function generateSolvedField() {
      function fillNumberRecursively(field, x = 0, y = 0) {
        const nextNumX = (y + 1) % 9 ? x : x + 1;
        const nextNumY = (y + 1) % 9;
        const triedNums = field[x].slice(0, y);
        let num;

        // try to paste abcent amount of nums in column
        for (let i = 0; i < 9 - y; i++) {
          // choose a random number that was not tried before
          do {
            num = Math.floor(Math.random() * 9) + 1;
          } while (triedNums.includes(num));

          if (
            !isDuplicateInRow(num, x, y, field) &&
            !isDuplicateInColumn(num, x, y, field) &&
            !isDuplicateIn3x3(num, x, y, field)
          ) {
            field[x][y] = num;
            if (nextNumX === 9 || fillNumberRecursively(field, nextNumX, nextNumY)) {
              return true;
            }
          }
          triedNums.push(num);
          field[x][y] = 0;
        }

        return false;
      }

      // x, y are coordinates of num being attempted to paste
      function isDuplicateInRow(num, _x, _y, field) {
        for (let x = 0; x < _x; x++) {
          if (field[x][_y] === num) {
            return true;
          }
        }
        return false;
      }

      // x, y are coordinates of num being attempted to paste
      function isDuplicateInColumn(num, _x, _y, field) {
        for (let y = 0; y < _y; y++) {
          if (field[_x][y] === num) {
            return true;
          }
        }
        return false;
      }

      // x, y are coordinates of num being attempted to paste
      function isDuplicateIn3x3(num, _x, _y, field) {
        const [start3x3X, start3x3Y] = getStartCoordOf3x3(_x, _y);

        for (let x = start3x3X; x < start3x3X + 3; x++) {
          for (let y = start3x3Y; y < start3x3Y + 3; y++) {
            if (field[x][y] === num) {
              return true;
            }
          }
        }
        return false;

        function getStartCoordOf3x3(numX, numY) {
          let start3x3X;
          let start3x3Y;

          for (let i = 0; i < 3; i++) {
            if ((numX - i) % 3 === 0) {
              start3x3X = numX - i;
            }
            if ((numY - i) % 3 === 0) {
              start3x3Y = numY - i;
            }
          }
          return [start3x3X, start3x3Y];
        }
      }

      const field = generateEmptyField();

      fillNumberRecursively(field);
      return field;
    }

    const field = generateSolvedField();
    const difficultyNumbersOpen = [58, 48, 40, 32, 24];
    let x;
    let y;
    let filledBoxes = 81;

    while (filledBoxes > difficultyNumbersOpen[difficulty]) {
      x = Math.floor(Math.random() * 9);
      y = Math.floor(Math.random() * 9);

      if (field[x][y]) {
        field[x][y] = 0;
        filledBoxes--;
      }
    }

    return field;
  }

  // updates without setState() call
  updateValueAt(x, y, value, field = this.state.field, nbrsAmount = this.state.nbrsAmount) {
    if (!Array.isArray(this.state.field[x][y])) {
      nbrsAmount[this.state.field[x][y]]--;
    }
    field[x][y] = value;
    if (!Array.isArray(this.state.field[x][y])) {
      nbrsAmount[this.state.field[x][y]]++;
    }
  }

  clearGameClock() {
    clearInterval(this.gameClockID);
  }

  setGameClock() {
    this.startTime = new Date().valueOf();
    this.gameClockID = setInterval(
      () => this.setState({gameTime: Math.round((new Date().valueOf() - this.startTime) / 1000)}),
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

class Changes {
  constructor() {
    this.valMap = new Map();
    this.prev = null;
    this.next = null;
  }

  /**
   * Add value change to current move.
   *
   * @param {Number} x : integer of range [0,8]
   * @param {Number} y : integer of range [0,8]
   * @param {Number || Array} oldValue : could be number [1,9] or array of numbers [1,9]
   * @param {Number || Array} newValue : could be number [1,9] or array of numbers [1,9]
   */
  add(x, y, oldValue, newValue) {
    this.valMap.set([x, y], [oldValue, newValue]);
  }
}

class ChangesList {
  constructor() {
    this.current = new Changes();
    this.head = this.current;
  }

  /**
   * 
   * @param {Changes} changes 
   */
  addChanges(changes) {
    this.current.next = changes;
    changes.prev = this.current;
    this.current = changes;
  }

  canUndo() {
    return this.current !== this.head;
  }

  prevChanges() {
    const lastChanges = this.current;

    this.current = this.current.prev;
    return lastChanges;
  }

  lastChanges() {
    return this.current;
  }

  canRedo() {
    return this.current.next !== null;
  }

  nextChanges() {
    this.current = this.current.next;
    return this.current;
  }
}
