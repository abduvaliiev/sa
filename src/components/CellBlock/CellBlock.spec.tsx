import React from 'react';
import { shallow } from 'enzyme';

import CellBlock from './CellBlock';

describe('<CellBlock />', () => {
  it('should have proper styles for alive cell', () => {
    const wrapper = shallow(<CellBlock isAlive />);
    const style = wrapper.find('.inner-cell').prop('style');

    expect(style.background).toEqual('black');
    expect(style.border).toEqual('1px solid transparent');
  });

  it('should have proper styles for dead cell', () => {
    const wrapper = shallow(<CellBlock isAlive={false} />);
    const style = wrapper.find('.inner-cell').prop('style');

    expect(style.background).toEqual('white');
    expect(style.border).toEqual('1px solid black');
  });
});

