import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import DateTimePickers from './DateTimePickers';

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
        // const instance = MountComponent.instance();
        // instance.setChoiceDataTime('2021-02-23');

        MountComponent.find('#date-label').first().simulate('change', {
            target: { value: '2021-02-02' },
        });

        expect(handleSelectDateMock).toHaveBeenCalledTimes(1);

        // expect(handleSelectDateMock).toHaveBeenCalledWith('2021-02-02');
    });

});