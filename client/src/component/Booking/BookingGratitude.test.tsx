import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import BookingGratitude, { IBookingGratitude } from './BookingGratitude';

describe('Test <BookingGratitude>', () => {
    const props: IBookingGratitude = {
        masterName: 'Vasia Vasia',
        date: '2021-02-02',
        time: '15:00',
        size: '2',
        email: 'vasia@vasia.com'
    };

    const Component = <BookingGratitude {...props}/>;
    const ShallowComponent = shallow(Component);

    test('BookingGratitude component should exists', () => {
        expect(ShallowComponent).toBeDefined();
    });

    test("ToMatchSnapshot BookingGratitude with default date", () => {
        expect(renderer.create(Component).toJSON()).toMatchSnapshot();
    });

});