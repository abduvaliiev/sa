import PopulationLifecycle from './PopulationLifecycle';
import { ICell, TPopulation } from '../../types/types';
import Cell from '../../entities/Cell';

class CellMock implements ICell {
  id: string;
  isAlive: boolean;

  constructor(isAlive: boolean) {
    this.isAlive = isAlive;
    this.id = '';
  }
}

describe('generateInitialPopulation', () => {
  it('should generate proper amount of cells', () => {
    const population = PopulationLifecycle.generateInitialPopulation(5);

    expect(Array.from(population.entries()).length).toEqual(25);
  });

  it('should generate correct entities', () => {
    const population = PopulationLifecycle.generateInitialPopulation(5);

    expect(
      Array.from(population.entries())
        .every(cell => cell[1] instanceof Cell)
    ).toBeTruthy();
  });
});

describe('getNextTickPopulation', () => {
  it('should return correct population', () => {
    const population: TPopulation = new Map([
      ['0.0', new CellMock(false)],
      ['0.1', new CellMock(false)],
      ['0.2', new CellMock(false)],
      ['0.3', new CellMock(false)],
      ['0.4', new CellMock(false)],
      ['1.0', new CellMock(false)],
      ['1.1', new CellMock(false)],
      ['1.2', new CellMock(false)],
      ['1.3', new CellMock(false)],
      ['1.4', new CellMock(false)],
      ['2.0', new CellMock(false)],
      ['2.1', new CellMock(true)],
      ['2.2', new CellMock(true)],
      ['2.3', new CellMock(true)],
      ['2.4', new CellMock(false)],
      ['3.0', new CellMock(false)],
      ['3.1', new CellMock(false)],
      ['3.2', new CellMock(false)],
      ['3.3', new CellMock(false)],
      ['3.4', new CellMock(false)],
      ['4.0', new CellMock(false)],
      ['4.1', new CellMock(false)],
      ['4.2', new CellMock(false)],
      ['4.3', new CellMock(false)],
      ['4.4', new CellMock(false)],
    ]);

    const nextTickPopulation = PopulationLifecycle.getNextTickPopulation(population);

    expect(nextTickPopulation.get('0.0').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('0.1').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('0.2').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('0.3').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('0.4').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('1.0').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('1.1').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('1.2').isAlive).toBeTruthy();
    expect(nextTickPopulation.get('1.3').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('1.4').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('2.0').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('2.1').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('2.2').isAlive).toBeTruthy();
    expect(nextTickPopulation.get('2.3').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('2.4').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('3.0').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('3.1').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('3.2').isAlive).toBeTruthy();
    expect(nextTickPopulation.get('3.3').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('3.4').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('4.0').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('4.1').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('4.2').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('4.3').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('4.4').isAlive).toBeFalsy();
  });

  it('should return correct population', () => {
    const population: TPopulation = new Map([
      ['0.0', new CellMock(false)],
      ['0.1', new CellMock(false)],
      ['0.2', new CellMock(false)],
      ['0.3', new CellMock(false)],
      ['1.0', new CellMock(false)],
      ['1.1', new CellMock(true)],
      ['1.2', new CellMock(true)],
      ['1.3', new CellMock(false)],
      ['2.0', new CellMock(false)],
      ['2.1', new CellMock(true)],
      ['2.2', new CellMock(true)],
      ['2.3', new CellMock(false)],
      ['3.0', new CellMock(false)],
      ['3.1', new CellMock(false)],
      ['3.2', new CellMock(false)],
      ['3.3', new CellMock(false)]
    ]);

    const nextTickPopulation = PopulationLifecycle.getNextTickPopulation(population);

    expect(nextTickPopulation.get('0.0').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('0.1').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('0.2').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('0.3').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('1.0').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('1.1').isAlive).toBeTruthy();
    expect(nextTickPopulation.get('1.2').isAlive).toBeTruthy();
    expect(nextTickPopulation.get('1.3').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('2.0').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('2.1').isAlive).toBeTruthy();
    expect(nextTickPopulation.get('2.2').isAlive).toBeTruthy();
    expect(nextTickPopulation.get('2.3').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('3.0').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('3.1').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('3.2').isAlive).toBeFalsy();
    expect(nextTickPopulation.get('3.3').isAlive).toBeFalsy();
  });
});

describe('getDeadOrAlive', () => {
  it('should return false for alive cell with 1 alive neighbour cell', () => {
    const population: TPopulation = new Map([
      ['0.0', new CellMock(true)],
      ['0.1', new CellMock(true)],
      ['1.0', new CellMock(false)],
      ['1.1', new CellMock(false)]
    ]);
    const result = PopulationLifecycle.getDeadOrAlive('0.0', population);

    expect(result).toBeFalsy();
  });

  it('should return true for alive cell with 2 alive neighbour cells', () => {
    const population: TPopulation = new Map([
      ['0.0', new CellMock(true)],
      ['0.1', new CellMock(true)],
      ['1.0', new CellMock(true)],
      ['1.1', new CellMock(false)]
    ]);
    const result = PopulationLifecycle.getDeadOrAlive('0.0', population);

    expect(result).toBeTruthy();
  });

  it('should return true for alive cell with 3 alive neighbour cells', () => {
    const population: TPopulation = new Map([
      ['0.0', new CellMock(true)],
      ['0.1', new CellMock(true)],
      ['1.0', new CellMock(true)],
      ['1.1', new CellMock(true)]
    ]);
    const result = PopulationLifecycle.getDeadOrAlive('0.0', population);

    expect(result).toBeTruthy();
  });

  it('should return false for alive cell with 4 alive neighbour cells', () => {
    const population: TPopulation = new Map([
      ['0.0', new CellMock(false)],
      ['0.1', new CellMock(true)],
      ['1.0', new CellMock(true)],
      ['1.1', new CellMock(true)],
    ]);
    const result = PopulationLifecycle.getDeadOrAlive('1.0', population);

    expect(result).toBeTruthy();
  });

  it('should return true for dead cell with 3 alive neighbour cells ', () => {
    const population: TPopulation = new Map([
      ['0.0', new CellMock(false)],
      ['0.1', new CellMock(true)],
      ['1.0', new CellMock(true)],
      ['1.1', new CellMock(true)]
    ]);
    const result = PopulationLifecycle.getDeadOrAlive('0.0', population);

    expect(result).toBeTruthy();
  });
});
