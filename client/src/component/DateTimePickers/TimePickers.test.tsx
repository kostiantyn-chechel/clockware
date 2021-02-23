import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import TimePickers from './TimePickers';

jest.mock('../../helpers/dateTime', () => ({
    nowTimePlus: () => '13:00',
}));

describe('Test <TimePickers>', () => {
    const onChangeMock = jest.fn();

    const Component = <TimePickers onChange={onChangeMock}/>;
    const ShallowComponent = shallow(Component);

    test('TimePickers component should exists', () => {
        expect(ShallowComponent).toBeDefined();
    });

    test("ToMatchSnapshot TimePickers with default date", () => {
        expect(renderer.create(Component).toJSON()).toMatchSnapshot();
    });

    test("DatePickers changes value after click", () => {
        const MountComponent = mount(Component);
        const newTime = '15:00';
        MountComponent.find("input").simulate("change", {
            target: { value: newTime },
        });

        expect(onChangeMock).toHaveBeenCalledTimes(1);

        // expect(onChangeMock).toHaveBeenCalledWith(newTime); // ???

    });

});