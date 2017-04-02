import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Line from 'Line';

import { mount } from 'enzyme';

it('renders without crashing', () => {
    shallow(<Line/>);
});
