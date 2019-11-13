import React from 'react';

import { ICellBlockProps } from '../../types/types';
import './CellBlock.css';

const CellBlock: React.FC<ICellBlockProps> = ({ isAlive }) => {
  const style = {
    background: isAlive ? 'black' : 'white',
    border: `1px solid ${isAlive ? 'transparent' : 'black'}`
  };

  return (
    <div className="outer-cell">
      <div className="inner-cell" style={style} />
    </div>
  );
};

export default CellBlock;
