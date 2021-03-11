import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import configureMockStore from "redux-mock-store";
import BookingFillingFields from './BookingFillingFields';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const CURRENT_DATE = '20-03-2021';
const CURRENT_TIME = '15:00';

const mock = {
    cityId: 33,
    name: 'Vasia Vasia',
    email: 'vasia@vasia.com',
    date: CURRENT_DATE,
    time: CURRENT_TIME,
    size: 1,
    photoURL: '',
    cities: [
        {id: 11, name: 'Kyiv'},
        {id: 22, name: 'Dnipro'},
        {id: 33, name: 'Uzhgorod'},
    ],
};

describe('Test <BookingFillingFields>', () => {
    const store = mockStore({});
    const findMasterMock= jest.fn();
    const changeNameMock = jest.fn();
    const changeEmailMock = jest.fn();
    const handleSizeChangeMock = jest.fn();
    const handlePhotoURLMock = jest.fn();
    const handleSelectCityMock = jest.fn();
    const handleSelectDateMock = jest.fn();
    const handleSelectTimeMock = jest.fn();

    const Component =
        <Provider store={store}>
            <BookingFillingFields
                cityId={mock.cityId}
                name={mock.name}
                email={mock.email}
                date={mock.date}
                time={mock.time}
                size={mock.size}
                photoURL={mock.photoURL}
                cities={mock.cities}
                findMaster={findMasterMock}
                changeName={changeNameMock}
                changeEmail={changeEmailMock}
                handleSizeChange={handleSizeChangeMock}
                handlePhotoURL={handlePhotoURLMock}
                handleSelectCity={handleSelectCityMock}
                handleSelectDate={handleSelectDateMock}
                handleSelectTime={handleSelectTimeMock}/>
        </Provider>;

    const ShallowComponent = shallow(Component);
    const MountComponent = mount(Component);

    test('BookingFillingFields component should exists', () => {
        expect(ShallowComponent).toBeDefined();
    });

    describe('Test Button', () => {

        test('Button value after click coll findMaster', () => {

            const node = MountComponent.find("button[type='submit']");
            expect(node).toBeDefined();

            MountComponent.find("button[type='submit']").simulate("click");

            expect(findMasterMock).toBeCalledTimes(1);

            expect(findMasterMock).toHaveBeenCalledWith(33, CURRENT_DATE, CURRENT_TIME, 1);
        });

    });

    test('EmailInput changes value the text after click', () => {

        const newEmail = 'new@email.com';
        MountComponent.find('input#email.MuiInputBase-input.MuiOutlinedInput-input').first().simulate("change", {
            target: { value: newEmail },
        });

        expect(changeEmailMock).toHaveBeenCalledTimes(1);

        expect(changeEmailMock).toHaveBeenCalledWith(newEmail);
    });

    test('EmailInput enter no email, should exist helper text', () => {
        const noEmail = 'noemail.com';
        MountComponent.find('input#email.MuiInputBase-input.MuiOutlinedInput-input').first().simulate("change", {
            target: { value: noEmail },
        });

        const  node = MountComponent.find('p#email-helper-text').text();

        expect(node).toBeDefined();

        expect(node).toEqual('Некорректный email');

    });

    test('NameInput changes value the text after click', () => {

        const newName = 'Vasia';
        MountComponent.find('input#firstName.MuiInputBase-input.MuiOutlinedInput-input').first().simulate("change", {
            target: { value: newName },
        });

        expect(changeNameMock).toHaveBeenCalledTimes(1);

        expect(changeNameMock).toHaveBeenCalledWith(newName);
    });

    test('NameInput enter name length 2, should exist helper text', () => {
        const noName = 'na';
        MountComponent.find('input#firstName.MuiInputBase-input.MuiOutlinedInput-input').first().simulate("change", {
            target: { value: noName },
        });

        const  node = MountComponent.find('p#firstName-helper-text').text();

        expect(node).toBeDefined();

        expect(node).toEqual('Имя не менее 3 знаков');

    });


    describe('Test RadioButtonGroup', () => {

        test('RadioButtonGroup value after click', () => {

            MountComponent.find("input[type='radio']").last().simulate("change");

            expect(handleSizeChangeMock).toHaveBeenCalledTimes(1);

            MountComponent.find("input[type='radio']").first().simulate("change");

            expect(handleSizeChangeMock).toBeCalledTimes(2);
        });

    });

    describe('Test Button', () => {

        test('Button value after click coll findMaster', () => {

            const node = MountComponent.find("button[type='submit']");
            expect(node).toBeDefined();

            MountComponent.find("button[type='submit']").simulate("click");

            expect(findMasterMock).toBeCalledTimes(1);

            expect(findMasterMock).toHaveBeenCalledWith(33, CURRENT_DATE, CURRENT_TIME, 1);
        });

    });

});