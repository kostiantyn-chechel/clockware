import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import SelectElement from './SelectElement';


describe('Test <SelectElement>:', () => {
    const handleChangeMock = jest.fn();

    const arrItemsMock = [
        {id: 11, name: 'Kyiv'},
        {id: 22, name: 'Dnipro'},
        {id: 33, name: 'Uzhgorod'},
    ];

    const Component = <SelectElement arrItems={arrItemsMock} onChange={handleChangeMock} />;

    const ShallowSelectElement = shallow(Component);

    test('SelectElement component should exists', () => {
        expect(ShallowSelectElement).toBeDefined();
    });

    test("ToMatchSnapshot BlogListItem component", () => {
        expect(renderer.create(Component).toJSON()).toMatchSnapshot();
    });

    test('SelectElement changes value after click', () => {
        const MountSelectElement = mount(Component);
        expect(MountSelectElement.props().value).toBe(undefined);

        MountSelectElement.find("input").simulate("change", {
            target:{ value: 33 }
        });

        expect(handleChangeMock).toHaveBeenCalledTimes(1);
        expect(handleChangeMock).toHaveBeenCalledWith(33);
    });

});