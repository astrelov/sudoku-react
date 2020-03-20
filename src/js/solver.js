import {FieldHandler} from './field_handler';

export class Solver {
  static solve(_field) {
    return null;
  }

  /**
   * Fill empty field every box with every nbr, then assign each nbr from passed field.
   * @param _field
   * @param peers
   * @returns {Array<Array>}
   */
  static initialParse(_field, peers) {
    const nbrs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const field = FieldHandler.generateEmptyField();

    for (let column of field) {
      for (let y = 0; y < 9; y++) {
        column[y] = nbrs.slice();
      }
    }

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (_field[x][y]) {
          Solver.assignNbr(field, x, y, _field[x][y], peers);
        }
      }
    }

    return field;
  }

  /**
   * Remove nbr from peers.
   * If got only one possible number => call @link{Solver.assignNbr} (recursive)
   *
   * @param field
   * @param x
   * @param y
   * @param peers
   * @returns {boolean|*} false if got empty box, else field
   */
  static eliminatePeers(field, x, y, peers) {
    for (let peer of peers.get('' + x + y)) {
      const pX = peer[0];
      const pY = peer[1];

      if (FieldHandler.isPencilVals(field[pX][pY])
          && field[pX][pY].includes(field[x][y])) {
        // remove number from peer's possible numbers
        field[pX][pY].splice(field[pX][pY].indexOf(field[x][y]), 1);

        // got empty box => fail
        if (!field[pX][pY].length) {
          return null;
        }
        // only one possible number left for peer => assign it
        if (field[pX][pY].length === 1) {
          if (!Solver.assignNbr(field, pX, pY, field[pX][pY][0], peers)) {
            return null;
          }
        }
      }
    }

    return field;
  }

  /**
   * Assign nbr, call @link{Solver.eliminatePeers}
   *
   * @param field
   * @param x
   * @param y
   * @param nbr
   * @param peers
   * @returns {boolean|*} false if got empty box, else field
   */
  static assignNbr(field, x, y, nbr, peers) {
    field[x][y] = nbr;
    return Solver.eliminatePeers(field, x, y, peers);
  }

  static getUnfilled(field) {
    const unfilled = [];

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (field[x][y].length > 1) {
          unfilled.push([x, y]);
        }
      }
    }
    return unfilled;
  }

  static recursive(solvedField, field, peers) {
    if (!field) {
      return true;
    }

    let unfilled = Solver.getUnfilled(field);
    if (!unfilled.length) {
      return FieldHandler.fieldsAreEqual(solvedField, field);
    }
    let lengths = unfilled.map(([x, y]) => field[x][y].length);
    let [minX, minY] = unfilled[lengths.indexOf(Math.min(...lengths))];

    for (let nbr of field[minX][minY]) {
      if (!Solver.recursive(solvedField,
          Solver.assignNbr(FieldHandler.cloneField(field), minX, minY, nbr,
              peers),
          peers)) {
        return false;
      }
    }
  }

  /**
   * 1. Fill every box with possible numbers.
   * 2.1 If only one number available for box => remove it from peers. GoTo 2.1.
   * 2.2 If single numbers not found => select box with least amount of possible
   *     numbers => paste one of possible numbers => GoTo 2.1, try to solve,
   *     backtrack if got empty boxes, try another number.
   *
   * @param solvedField
   * @param field
   * @param peers
   * @returns {boolean}
   */
  static solutionIsOne(solvedField, field, peers) {
    const parsedField = Solver.initialParse(field, peers);

    return Solver.recursive(solvedField, parsedField, peers);
  }
}
