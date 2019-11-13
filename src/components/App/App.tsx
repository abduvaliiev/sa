import React, { useEffect, useState } from 'react';

import CellBlock from '../CellBlock';
import PopulationLifecycle from '../../logic/PopulationLifecycle';
import { TPopulation } from '../../types/types';
import './App.css';

export function get2DStructure(populationMap: TPopulation, chunkLength: number) {
  const populationArray = Array.from(populationMap.values());
  const chunks = [];
  let sliceStartPosition = 0;

  while (sliceStartPosition < populationArray.length) {
    chunks.push(populationArray.slice(sliceStartPosition, sliceStartPosition += chunkLength));
  }

  return chunks;
}

const App = () => {
  const size = 50;
  const refreshInterval = 400;
  const total = size ** 2;
  const [cyclesCount, setCyclesCount] = useState(0);
  const [population, setPopulation] = useState<TPopulation>(new Map());
  const transformedPopulation = get2DStructure(population, size);
  const aliveCount = Array.from(population.values())
    .filter(({ isAlive }) => isAlive)
    .length;

  useEffect(() => {
    const initialPopulation = PopulationLifecycle.generateInitialPopulation(size);

    setPopulation(initialPopulation);
  }, []);

  useEffect(() => {
    let lifecycle = setTimeout(() => {
      const nextPopulation = PopulationLifecycle.getNextTickPopulation(population);

      setCyclesCount(cyclesCount + 1);
      setPopulation(nextPopulation);
    }, refreshInterval);

    return function clear() {
      clearTimeout(lifecycle);
    };
  }, [population]);

  return (
    <div className="app">
      <h1>
        GAME OF LIFE
      </h1>
      <div>
        {transformedPopulation.map((row, index) => (
          <div key={index} className="row">
            {row.map(({ isAlive, id }) => (
              <CellBlock
                isAlive={isAlive}
                key={id}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="panel">
        <div className="statistics">
          <CellBlock isAlive={false} />&nbsp;&nbsp;Dead cells: {total - aliveCount}
        </div>
        <div className="statistics">
          <CellBlock isAlive />&nbsp;&nbsp;Alive cells: {aliveCount}
        </div>
        <div className="statistics">
          Cycles: {cyclesCount}
        </div>
      </div>
    </div>
  );
};

export default App;
