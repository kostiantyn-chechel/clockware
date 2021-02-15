import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import DatePickers from './DatePickers';

describe('Test <DatePickers>', () => {
    const onChangeMock = jest.fn();
    const defDateMock = jest.fn(() => '2021-01-20');

    const Component = <DatePickers onChange={onChangeMock}/>;
    const ShallowComponent = shallow(Component);

    test('DatePickers component should exists', () => {
        expect(ShallowComponent).toBeDefined();
    });

    // test("ToMatchSnapshot DatePickers with default date", () => {
    //     expect(renderer.create(Component).toJSON()).toMatchSnapshot();
    // });

    test('ToMatchSnapshot DatePickers with date in props', () => {
        const Component = <DatePickers onChange={onChangeMock} defaultDate='2021-01-01'/>;
        expect(renderer.create(Component).toJSON()).toMatchSnapshot();
    });

    test("DatePickers changes value after click", () => {
        const MountComponent = mount(Component);
        const newDate = '2021-02-01';

        expect(onChangeMock).toHaveBeenCalledTimes(0);

        MountComponent.find("input").simulate("change", {
            target: { value: newDate },
        });

        expect(onChangeMock).toHaveBeenCalledTimes(1);

        // expect(onChangeMock).toHaveBeenCalledWith(newDate); //???
    });

});