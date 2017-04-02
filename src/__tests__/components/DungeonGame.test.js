import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import DungeonGame from 'DungeonGame';
//need to find out more about react-redux testing
function setup() {
  const props = {
    addTodo: jest.fn()
  }

  const enzymeWrapper = shallow(<DungeonGame {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

it('renders without crashing', () => {
    shallow(<Provider store={store}><DungeonGame/></Provider>);
});
