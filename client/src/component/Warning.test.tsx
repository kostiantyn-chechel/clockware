import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Warning from './Warning';

describe('Test Warning component', () => {
    const message = 'Test Warning message';
    const isWarning = false;
    const Component = <Warning valid={isWarning}> {message} </Warning>;
    const ShallowWarning = shallow(Component);

    test('Warning component should exists.', () => {
        expect(ShallowWarning).toBeDefined();
    });

    test('ToMatchSnapshot warning component', () => {
        expect(renderer.create(Component).toJSON()).toMatchSnapshot();
    });


});