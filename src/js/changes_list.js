import { Changes } from './changes'

/**
 * Stores a list of field changes through the game.
 * Double-linked list.
 */
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
