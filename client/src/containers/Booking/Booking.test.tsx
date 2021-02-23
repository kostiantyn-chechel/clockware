import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import BookingFillingFields from '../../component/Booking/BookingFillingFields';
import BookingGratitude from '../../component/Booking/BookingGratitude';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Booking from './Booking';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([thunk]);

describe('Test <Booking>', () => {
    const store = mockStore({
        admin: {
            cities: [
                {id: 11, name: 'Kyiv'},
                {id: 22, name: 'Dnipro'},
                {id: 33, name: 'Uzhgorod'},
            ]
        },
        booking: {
            bookingShow: 'filling'
        },
        user: {
            name: 'Vasia Vasia'
        },
        auth: {
            user: {
                login: 'vasia@email.com'
            }
        }
    });

    const Component =
        <Provider store={store}>
            <Booking/>
        </Provider> ;

    const ShallowBooking = shallow(Component);
    const MountBooking = mount(Component);

    test('SelectElement component should exists', () => {
        expect(ShallowBooking).toBeDefined();
    });

    // test('ToMatchSnapshot warning component', () => {
    //     expect(renderer.create(Component).toJSON()).toMatchSnapshot();
    // });

    // test('Show Booking Filling Fields', () => {
    //     const node = MountBooking.find(BookingFillingFields);
    //     expect(node).toBeDefined();
    //     expect(node).toHaveLength(1);
    // });

    // test('Show Booking Gratitude', () => {
    //     const node = ShallowBooking.find('ttt');
    //     expect(node).toBeUndefined();
    // });

});