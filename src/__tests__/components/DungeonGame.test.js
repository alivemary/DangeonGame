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
  wrapper = shallow(<DungeonGame {...store} />);
});

describe("<DungeonGame />", () => {
  it('renders without crashing', () => {
    shallow(<DungeonGame {...store} />);
  });

  it('wraps content in a div with .dungeon-game class', () => {
    expect(wrapper.find('.dungeon-game').length).toEqual(1);
  });

  it('should have child div with .game class', () => {
    expect(wrapper.find('.game').length).toEqual(1);
  });

  describe("initEmptyDungeon", () => {
    it('returns array 60x25', () => {
      let dungeon = wrapper.instance().initEmptyDungeon();
      expect(dungeon.length).toEqual(60);
      expect(dungeon[0].length).toEqual(25);
    });
  });

  describe("checkVictory", () => {
    it('should return false if none wins', () => {
      let isVictory = wrapper.instance().checkVictory(10, 20, false);
      expect(isVictory).toEqual(false);
    });
    it('should return true if player wins', () => {
      let isVictory = wrapper.instance().checkVictory(-2, 20, false);
      expect(isVictory).toEqual(true);
    });
    it('should return true if enemy wins', () => {
      let isVictory = wrapper.instance().checkVictory(10, -4, false);
      expect(isVictory).toEqual(true);
    });
  });

  describe("calculateBonus", () => {
    it('should return right number', () => {
      let bonus = wrapper.instance().calculateBonus("blade");
      expect(bonus).toEqual(30);
    });
  });

});
