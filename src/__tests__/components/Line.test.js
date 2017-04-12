import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Line from 'Line';

import { mount } from 'enzyme';

describe("<Line />", () => {
  it('renders without crashing', () => {
      shallow(<Line/>);
  });

  describe("capitalizeFirstLetter", () => {
    it('returns string with the first letter capitalized', () => {
      let wrapper = shallow(<Line/>);
      let dungeon = wrapper.instance().capitalizeFirstLetter("eat me!");
      expect(wrapper.instance().capitalizeFirstLetter("eat me!")).toEqual("Eat me!");
    });
  });

});
