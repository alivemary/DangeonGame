import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { DungeonGame } from 'DungeonGame';
import { initState } from "../store";
//need to find out more about react-redux testing


describe(<DungeonGame />, () => {
  it('renders without crashing', () => {
      const store = initState();
      shallow(<DungeonGame {...store}/>);
  });
});
