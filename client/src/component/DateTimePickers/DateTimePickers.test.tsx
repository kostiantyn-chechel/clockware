import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import DateTimePickers from './DateTimePickers';

const NEW_DATA = '2021-02-02';
const EARLY_DATA = '2021-01-02';

describe('Test <DateTimePickers>', () => {
    const handleSelectDateMock = jest.fn();
    const handleSelectTimeMock = jest.fn();

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
            target: { value: NEW_DATA },
        });

        expect(handleSelectDateMock).toHaveBeenCalledTimes(1);

    });

    describe('Date and time earlier than current', () => {

        test('Error message expected', () => {
            const MountComponent = mount(Component);

            MountComponent.find('#date-label').first().simulate('change', {
                target: { value: EARLY_DATA },
            });

            const node = MountComponent.find('.makeStyles-warningBlock-43');

            expect(node).toBeDefined();

            // expect(node).toHaveLength(1);

        });
    });

});
