import {Solver} from './solver';

export class FieldHandler {

  // Debug
  static printField(field) {
    console.log('------------------Field---------------------');
    for (let y = 0; y < 9; y++) {
      const row = [];
      for (let x = 0; x < 9; x++) {
        row.push(field[x][y] || ' ');
      }
      console.log(row.join('|'));
    }
    console.log('--------------------------------------------');
  }

  // Debug
  static printFields(f1, f2) {
    console.log('------------------Field---------------------');
    for (let y = 0; y < 9; y++) {
      const row1 = [];
      const row2 = [];
      for (let x = 0; x < 9; x++) {
        row1.push(f1[x][y] || ' ');
        row2.push(f2[x][y] || ' ');
      }
      console.log(row1.join('|'), '   ', row2.join('|'));
    }
    console.log('--------------------------------------------');
  }

  // Debug
  static diffFields(f1, f2) {
    console.log('------------------Field---------------------');
    for (let y = 0; y < 9; y++) {
      const row1 = [];
      const row2 = [];
      for (let x = 0; x < 9; x++) {
        if (f1[x][y] === f2[x][y]) {
          row1.push('*');
          row2.push('*');
        } else {
          row1.push(f1[x][y] || ' ');
          row2.push(f2[x][y] || ' ');
        }
      }
      console.log(row1.join('|'), '   ', row2.join('|'));
    }
    console.log('--------------------------------------------');
  }

  /**
   * Inner FieldHandler's checker.
   * If the box contains pencil numbers.
   *
   * @param value
   * @returns {Boolean}
   */
  static isPencilVals(value) {
    return Array.isArray(value);
  }

  static fieldsAreEqual(f1, f2) {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (f1[x][y] !== f2[x][y]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   *
   */
  static isWin(field, solvedField) {
    return FieldHandler.fieldsAreEqual(field, solvedField);
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
  // TODO search pencil numbers by traversing peers array
  static updateValueAt(x, y, field, number, nbrsAmount, isPencil) {
    function savePencilChange(field, x, y, number, changes) {
      let oldValue, newValue;

      oldValue = field[x][y].slice();
      field[x][y].splice(field[x][y].indexOf(number), 1);
      newValue = field[x][y].slice();
      changes.add(x, y, oldValue, newValue);
    }

    function clearPencilRow(
        y,
        changes,
        field,
        number
    ) {
      for (let x = 0; x < 9; x++) {
        if (FieldHandler.isPencilVals(field[x][y]) && field[x][y].includes(
            number)) {
          savePencilChange(field, x, y, number, changes);
        }
      }
    }

    function clearPencilCol(
        x,
        changes,
        field,
        number
    ) {

      for (let y = 0; y < 9; y++) {
        if (FieldHandler.isPencilVals(field[x][y]) && field[x][y].includes(
            number)) {
          savePencilChange(field, x, y, number, changes);
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
      function getStartCoordOf3x3(nbrX, nbrY) {
        let start3x3X;
        let start3x3Y;

        for (let i = 0; i < 3; i++) {
          if ((nbrX - i) % 3 === 0) {
            start3x3X = nbrX - i;
          }
          if ((nbrY - i) % 3 === 0) {
            start3x3Y = nbrY - i;
          }
        }
        return [start3x3X, start3x3Y];
      }

      const [start3x3X, start3x3Y] = getStartCoordOf3x3(_x, _y, field);

      for (let x = start3x3X; x < start3x3X + 3; x++) {
        for (let y = start3x3Y; y < start3x3Y + 3; y++) {
          if (FieldHandler.isPencilVals(field[x][y]) && field[x][y].includes(
              number)) {
            savePencilChange(field, x, y, number, changes);
          }
        }
      }
    }

    function inputPencilVal(x, y, field, number) {
      // if there is no array of pencil numbers => create it
      if (!FieldHandler.isPencilVals(field[x][y])) {
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
    const oldValue = FieldHandler.isPencilVals(field[x][y])
        ? field[x][y].slice() : field[x][y];

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
        return null;
      }
      field[x][y] = 0;
    }

    const newValue = FieldHandler.isPencilVals(field[x][y])
        ? field[x][y].slice() : field[x][y];
    changes.add(x, y, oldValue, newValue);
    return changes;
  }

  /**
   * Used for undo/redo actions when updating from ChangesList.
   * Simply replace value and decrease/increase amount if number removed/pasted respectively
   * @param {Number} x
   * @param {Number} y
   * @param {Number || Array} value
   * @param {Array<Array>} field
   * @param {Array<Number>} nbrsAmount
   */
  static replaceValueAt(x, y, value, field, nbrsAmount) {
    if (!FieldHandler.isPencilVals(field[x][y])) {
      nbrsAmount[field[x][y]]--;
    }
    if (!FieldHandler.isPencilVals(value)) {
      nbrsAmount[value]++;
    }
    field[x][y] = value;
  }

  /**
   * @param {Array<Array>} field
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
   * @returns {Array<Array>} fieldClone
   */
  static cloneField(field) {
    const clone = [];

    for (let column of field) {
      clone.push(column.slice());
    }
    return clone;
  }

  /**
   * @returns {Array<Array>}
   */
  static generateEmptyField() {
    const field = [];

    for (let y = 0; y < 9; y++) {
      field.push(new Array(9).fill(''));
    }
    return field;
  }

  /**
   * Recursively pastes numbers.
   */
  static generateSolvedField() {
    function fillNumberRecursively(field, x = 0, y = 0) {
      const nextNbrX = (y + 1) % 9 ? x : x + 1;
      const nextNbrY = (y + 1) % 9;
      const triedNbrs = field[x].slice(0, y);
      let nbr;

      // try to paste abcent amount of nums in column
      for (let i = 0; i < 9 - y; i++) {
        // choose a random number that was not tried before
        do {
          nbr = Math.floor(Math.random() * 9) + 1;
        } while (triedNbrs.includes(nbr));

        if (!FieldHandler.isDuplicate(nbr, x, y, field, peers)) {
          field[x][y] = nbr;
          if (nextNbrX === 9 || fillNumberRecursively(field, nextNbrX,
              nextNbrY)) {
            return true;
          }
        }
        triedNbrs.push(nbr);
        field[x][y] = 0;
      }

      return false;
    }

    const field = FieldHandler.generateEmptyField();

    const boxes = FieldHandler.getBoxes();
    const rowsColsSquares = FieldHandler.getRowsColsSquares();
    const units = FieldHandler.getUnits(boxes, rowsColsSquares);
    const peers = FieldHandler.getPeers(boxes, units);

    fillNumberRecursively(field);
    return field;
  }

  /**
   *
   * @returns {[]} array of string coords 'xy' for each box
   */
  static getBoxes() {
    const indexes = '012345678';
    const boxes = [];

    for (let x of indexes) {
      for (let y of indexes) {
        boxes.push(x + y);
      }
    }

    return boxes;
  }

  /**
   *
   * @returns {[]} array of entities arrays of boxes's 'xy' coords they contain
   */
  static getRowsColsSquares() {
    const indexes = '012345678';
    const sqIndexes = ['012', '345', '678'];
    const rowsColsSquares = [];

    for (let x of indexes) {
      const column = [];

      for (let y of indexes) {
        column.push(x + y);
      }
      rowsColsSquares.push(column);
    }

    for (let y of indexes) {
      const row = [];

      for (let x of indexes) {
        row.push(x + y);
      }
      rowsColsSquares.push(row);
    }

    for (let xSq of sqIndexes) {
      for (let ySq of sqIndexes) {
        const square = [];

        for (let x of xSq) {
          for (let y of ySq) {
            square.push(x + y);
          }
        }
        rowsColsSquares.push(square);
      }
    }

    return rowsColsSquares;
  }

  /**
   *
   * @returns {Map<String, Array>} K = box's 'xy', V = array of col, row, square box is in
   */
  static getUnits() {
    const boxes = FieldHandler.getBoxes();
    const rowsColsSquares = FieldHandler.getRowsColsSquares();
    const units = new Map();

    for (let box of boxes) {
      const isIn = [];

      for (let entity of rowsColsSquares) {
        if (entity.includes(box)) {
          isIn.push(entity);
        }
      }

      units.set(box, isIn);
    }

    return units;
  }

  /**
   *
   * @returns {Map<String, Array>} K = box's 'xy', V = array of box's peers (boxes's 'xy')
   */
  static getPeers() {
    const boxes = FieldHandler.getBoxes();
    const units = FieldHandler.getUnits();
    const peers = new Map();

    for (let box of boxes) {
      const boxPeers = new Set();
      const boxIsIn = units.get(box);

      for (let entity of boxIsIn) {
        for (let peerBox of entity) {
          boxPeers.add(peerBox);
        }
      }
      boxPeers.delete(box);
      peers.set(box, boxPeers);
    }

    return peers;
  }

  /**
   * If attempted to paste at [_x, _y] number is one of peers
   * @param nbr
   * @param _x
   * @param _y
   * @param field
   * @param peers
   * @returns {boolean}
   */
  static isDuplicate(nbr, _x, _y, field, peers) {
    for (let peer of peers.get('' + _x + _y)) {
      const peerX = peer[0];
      const peerY = peer[1];

      if (field[peerX][peerY] === nbr) {
        return true;
      }
    }
  }

  /**
   * @param solvedField
   * @param {Number} difficulty [0-4]
   */
  static emptySolvedField(solvedField, difficulty) {
    const peers = FieldHandler.getPeers();
    const field = FieldHandler.cloneField(solvedField);
    const openBoxes = [58, 48, 40, 32, 24];
    const invalidBoxes = new Array(9).fill(0).map(() => []);
    let x;
    let y;
    let filledBoxes = 81;

    while (filledBoxes > openBoxes[difficulty]) {
      x = Math.floor(Math.random() * 9);
      y = Math.floor(Math.random() * 9);

      if (field[x][y] && !invalidBoxes[x].includes(y)) {
        invalidBoxes[x].push(y);
        field[x][y] = 0;
        filledBoxes--;
        if (!Solver.solutionIsOne(solvedField, field, peers)) {
          field[x][y] = solvedField[x][y];
          filledBoxes++;
        }
      }

      // if tried all the boxes, but got no luck => give it another try
      if (invalidBoxes.reduce((amnt, x) => amnt + x.length, 0) === 81) {
        return FieldHandler.emptySolvedField(solvedField, difficulty);
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
   * @param {Number} x integer of range [0,8]
   * @param {Number} y integer of range [0,8]
   * @param {Number || Array} oldValue could be number [1,9] or array of numbers [1,9]
   * @param {Number || Array} newValue could be number [1,9] or array of numbers [1,9]
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
