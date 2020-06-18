import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { Provider } from 'react-redux';

configure({
    adapter: new Adapter()
});

// describe('<BurgerBuilder />', () => {
//     let wrapper;

//     beforeEach(() => {
//         wrapper = shallow(<BurgerBuilder/>).dive();
//     });

//     it('should render <BuildControls /> when receiving ingredients', () => {
//         wrapper.setProps({ings: {salad: 0}});
//         expect(wrapper.find(BuildControls)).toHaveLength(1);
//     });
// })