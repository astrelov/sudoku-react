export class FieldHandler {

  /**
   * Check win for field with multiple possible solutions
   * @param {Array<Array<Number>>} field
   * @param {Array<Number>} nbrsAmount
   */
  static isWin(field, nbrsAmount) {
    const allNums = '123456789';

    function fieldIsFilledFull(nbrsAmount) {
      nbrsAmount[0] = 0;
      return nbrsAmount.reduce((acc, numAmount) => acc + numAmount, 0) === 81;
    }

    function checkWinRows(field) {
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

    function checkWinColumns(field) {
      return field.every(column => {
        let columnStr = column
          .slice()
          .sort()
          .join('');

        return columnStr === allNums;
      });
    }

    function checkWin3x3(field) {
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
      fieldIsFilledFull(nbrsAmount) &&
      checkWinRows(field) &&
      checkWinColumns(field) &&
      checkWin3x3(field)
    );
  }

  /**
   * Returns Changes if updated or false if not
   * @param {Number} x 
   * @param {Number} y 
   * @param {Array<Array<Number>>} field 
   * @param {Number} number 
   * @param {Array<Number>} nbrsAmount 
   * @param {Boolean} isPencil 
   * @returns {Changes || null}
   */
  static updateValueAt(x, y, field, number, nbrsAmount, isPencil) {
    function clearPencilRow(
      y,
      changes,
      field,
      number
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
      field,
      number
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
      field,
      number
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

    function inputPencilVal(x, y, field, number) {
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

    function inputNbrVal(x, y, field, number) {
      // new number => fill it
      if (number !== field[x][y]) {
        field[x][y] = number;
        nbrsAmount[field[x][y]]++;
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
      nbrsAmount[field[x][y]]--;
    }

    if (number) {
      if (isPencil) {
        inputPencilVal(x, y, field, number);
      } else {
        inputNbrVal(x, y, field, number);
        clearPencilRow(y, changes, field, number);
        clearPencilCol(x, changes, field, number);
        clearPencil3x3(x, y, changes, field, number);
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
    return changes;
  }

  /**
   * Used for undo/redo actions when updating from ChangesList.
   * Simply replace value and decrease/increase amount if number removed/pasted respectively
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number || Array<Number>} value 
   * @param {Array<Array<Number>>} field 
   * @param {Array<Number>} nbrsAmount
   */
  static replaceValueAt(x, y, value, field, nbrsAmount) {
    if (!Array.isArray(field[x][y])) {
      nbrsAmount[field[x][y]]--;
    }
    if (!Array.isArray(value)) {
      nbrsAmount[value]++;
    }
    field[x][y] = value;
  }

  /**
   * @param {Array<Array<Number>>} field
   * @returns {Array<Number>} amount of each number on field:
   *                          [0(not used), amountOf(1), amountOf(2), ..., amountOf(9)]
   */
  static countNbrs(field) {
    const filledAmount = new Array(10).fill(0);

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        filledAmount[field[x][y]]++;
      }
    }
    return filledAmount;
  }

  /**
   * Full copy
   * @param {Array<Array<Number>>} field
   * @returns {Array<Array<Number>>} fieldClone
   */
  static cloneField(field) {
    const clone = [];

    for (let column of field) {
      clone.push(column.slice());
    }
    return clone;
  }

  /**
   * @returns {Array<Array<0>>}
   */
  static generateEmptyField() {
    const field = [];

    for (let y = 0; y < 9; y++) {
      field.push(new Array(9).fill(0));
    }
    return field;
  }

  /**
   * Recursively pastes numbers.
   */
  static generateSolvedField() {
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

    const field = FieldHandler.generateEmptyField();

    fillNumberRecursively(field);
    return field;
  }

  /**
   * Empties field filled recursively the way that solution is not always one.
   * @param {Number} difficulty [0-4]
   */
  static generateField(difficulty) {
    const field = FieldHandler.generateSolvedField()
    const difficultyNumbersOpen = [80, 58, 48, 40, 32, 24];
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
}

export class Changes {
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

export class ChangesList {
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
