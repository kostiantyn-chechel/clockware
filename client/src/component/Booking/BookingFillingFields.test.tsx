import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import configureMockStore from "redux-mock-store";
import BookingFillingFields from './BookingFillingFields';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const mock = {
    cityId: 33,
    name: 'Vasia Vasia',
    email: 'vasia@vasia.com',
    date: '20-01-2020',
    time: '15:00',
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

    test('BookingFillingFields component should exists', () => {
        expect(ShallowComponent).toBeDefined();
    });

    test('NameInput changes value the text after click', () => {
        const MountComponent = mount(Component);
        const newValue = 'New Name';
        MountComponent.find('#email').first().simulate("change", {
            target: { value: newValue },
        });

        expect(changeNameMock).toHaveBeenCalledTimes(1);
    });

});