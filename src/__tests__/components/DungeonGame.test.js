import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { Provider, connect } from 'react-redux';
import { DungeonGame } from 'DungeonGame';
import { initState } from "../store";
//need to find out more about react-redux testing

let store;
let wrapper

beforeEach(() => {
  store = initState();
});

beforeEach(() => {
  wrapper = shallow(<DungeonGame {...store}/>);
});

describe("<DungeonGame />", () => {
  it('renders without crashing', () => {
      shallow(<DungeonGame {...store}/>);
  });

  it('wraps content in a div with .dungeon-game class', () => {
    expect(wrapper.find('.dungeon-game').length).toEqual(1);
  });

  it('should have child div with .game class', () => {
    expect(wrapper.find('.game').length).toEqual(1);
  });

  describe("initEmptyDungeon", () => {
    it('returns array 40x25', () => {
      let dungeon = wrapper.instance().initEmptyDungeon();
      expect(dungeon.length).toEqual(40);
      expect(dungeon[0].length).toEqual(25);
    });
  });

});
