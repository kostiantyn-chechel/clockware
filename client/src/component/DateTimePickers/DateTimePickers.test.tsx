import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import DateTimePickers from './DateTimePickers';

// jest.mock('../../helpers/dateTime', () => ({
//     nowTimePlus: () => '13:00',
//     today: () => '2021-02-02',
// }));

describe('Test <DateTimePickers>', () => {
    const handleSelectDateMock = jest.fn();
    const handleSelectTimeMock = jest.fn();
    const selectDay = jest.fn(() => '2021-02-03');
    const selectTime = jest.fn(() => '15:00');

    const Component = <DateTimePickers
        handleSelectDate={handleSelectDateMock}
        handleSelectTime={handleSelectTimeMock}
    />;

    const ShallowComponent = shallow(Component);

    test('DateTimePickers component should exists', () => {
        expect(ShallowComponent).toBeDefined();
    });

    test("ToMatchSnapshot DateTimePickers with default date", () => {
        expect(renderer.create(Component).toJSON()).toMatchSnapshot();
    });

    test('Changes value after change Data', () => {
        const MountComponent = mount(Component);

        MountComponent.find('#date-label').first().simulate('change', {
            target: { value: '2021-02-02' },
        });

        expect(handleSelectDateMock).toHaveBeenCalledTimes(1);

        // expect(handleSelectDateMock).toHaveBeenCalledWith('2021-02-02');
    });

    describe('Date and time earlier than current', function () {

        test('Error message expected', () => {
            const MountComponent = mount(Component);

            MountComponent.find('#date-label').first().simulate('change', {
                target: { value: '2021-01-02' },
            });

            const node = MountComponent.find('.makeStyles-warningBlock-43');

            expect(node).toBeDefined();

        });
    });




});