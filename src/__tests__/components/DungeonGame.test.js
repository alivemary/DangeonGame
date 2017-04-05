import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { DungeonGame } from 'DungeonGame';
//need to find out more about react-redux testing

function mockStore(overrides) {
  // … create mock store
  return {
    gameWidth: 400,
    gameHeight: 300,
    dungeon: [],
    rooms: [],
    player: {
      position: {x: 0, y: 0},
      health: 100,
      weapon: "stick",
      attack: 7,
      level: 0,
      nextlevel: 60
    },
    boss: {
      position: {x: 0, y: 0},
      health: 500,
      attack: 20
    },
    staff: []
  }
}

describe(<DungeonGame />, () => {
  it('renders without crashing', () => {
      const store = mockStore();
      shallow(<DungeonGame {...store}/>);
  });
});
