import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Square from 'Square';

import { mount } from 'enzyme';

describe("<Square />", () => {
  it('renders without crashing', () => {
    shallow(<Square />);
  });

  describe("capitalizeFirstLetter", () => {
    it('returns string with the first letter capitalized', () => {
      let wrapper = shallow(<Square />);
      let dungeon = wrapper.instance().capitalizeFirstLetter("eat me!");
      expect(wrapper.instance().capitalizeFirstLetter("eat me!")).toEqual("Eat me!");
    });
  });

});
