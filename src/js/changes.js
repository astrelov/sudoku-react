/**
 * Stores field changes of one game move.
 * Has prev/next for double-linked list.
 */
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
