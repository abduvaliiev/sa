import Cell from '../../entities/Cell';
import { TPopulation, ICell } from '../../types/types';

class PopulationLifecycle {
  static generateInitialPopulation(size: number): TPopulation {
    const population = new Map();

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        population.set(`${x}.${y}`, new Cell());
      }
    }

    return population;
  }

  static getNextTickPopulation(population: TPopulation): TPopulation {
    const newPopulation = new Map();

    population.forEach((cell: ICell, coordinates: string) => {
      newPopulation.set(coordinates, {
        ...cell,
        isAlive: PopulationLifecycle.getDeadOrAlive(coordinates, population)
      });
    });

    return newPopulation;
  }

  private static getAliveCellsCount(coordinates: string, population: TPopulation) {
    let aliveCellsCount = 0;
    const [x, y] = coordinates.split('.')
      .map(Number);
    const neighboursCoordinates = [
      // upper row
      `${x - 1}.${y - 1}`,
      `${x}.${y - 1}`,
      `${x + 1}.${y - 1}`,

      // same row
      `${x - 1}.${y}`,
      `${x + 1}.${y}`,

      // lower row
      `${x - 1}.${y + 1}`,
      `${x}.${y + 1}`,
      `${x + 1}.${y + 1}`
    ];

    neighboursCoordinates.forEach((coordinates: string) => {
      if (population.has(coordinates) && population.get(coordinates).isAlive) aliveCellsCount++;
    });

    return aliveCellsCount;
  }

  static getDeadOrAlive(coordinates: string, population: TPopulation): boolean {
    const aliveCellsCount = PopulationLifecycle.getAliveCellsCount(coordinates, population);
    const isCurrentCellAlive = population.get(coordinates).isAlive;

    if (isCurrentCellAlive && aliveCellsCount === 1) {
      return false;
    }
    if (isCurrentCellAlive && (aliveCellsCount === 2 || aliveCellsCount === 3)) {
      return true;
    }
    if (isCurrentCellAlive && aliveCellsCount > 3) {
      return false;
    }
    if (!isCurrentCellAlive && aliveCellsCount === 3) {
      return true;
    }
  }
}

export default PopulationLifecycle;
