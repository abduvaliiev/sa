import { ICell, TCellId } from '../../types/types';

class Cell implements ICell {
  id = Cell.generateRandomId();
  isAlive = Cell.generateStatus();

  private static generateStatus(): boolean {
    return Boolean(Math.round(Math.random()));
  }

  private static generateRandomId(): TCellId {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(2, 10);
  }
}

export default Cell;
