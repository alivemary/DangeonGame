import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from 'App';

import { mount } from 'enzyme';

it('renders without crashing', () => {
    shallow(<App/>);
});
