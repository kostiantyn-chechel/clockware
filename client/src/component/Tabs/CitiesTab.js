import React, { useState, useEffect } from 'react';
import AddButton from './AddButton';
import CityDataPanel from '../DataPanel/CityDataPanel';
import CitiesTable from './Tables/CitiesTable';
import DeleteDialog from './DeleteDialog';

function CitiesTab(props) {
    const [cityEdit, setCityEdit] = useState({
        name: '',
    });

    const [flag, setFlag] = useState({
        showPanel: false,
        addNew: true,
    });

    const [showDelDialog, setShowDelDialog] = useState(false);
    const [delId, setDelId] = useState('');

    /* eslint-disable */
    useEffect(() => {
        props.fetchCities();
    }, []);
    /* eslint-enable */

    const changeCityName = name => setCityEdit({ ...cityEdit, name: name });
    const handleAddButton = () => setFlag({ showPanel: true, addNew: true });

    const handleCitySave = event => {
        event.preventDefault();
        if (cityEdit.name.length >=3) {
            if (flag.addNew) {
                props.addCity(cityEdit)
            } else {
                props.editCity(cityEdit)
            }
            setFlag({ ...flag, showPanel: false });
            setCityEdit({ name: '' });
        }
    };

    const handleCityCancel = event => {
        event.preventDefault();
        setFlag({ ...flag, showPanel: false });
        setCityEdit({ name: '' });
    };

    const clickEdit = id => {
        props.cities.forEach((city) => {
            if (city.id === id) {
                setCityEdit(city);
            }
        });
        setFlag({ showPanel: true, addNew: false });
    };

    const cityDelete = () => props.deleteCity(delId);

    const clickDel = id => {
        setDelId(id);
        setShowDelDialog(true);
    };

    const deleteDialog = () => {
        if (showDelDialog) {
            return (
                <DeleteDialog
                    context={contextCity()}
                    setDelete={setShowDelDialog}
                    deleteEntry={cityDelete}
                />
            )
        } else {
            return null
        }
    };

    const contextCity = () => {
        let context = '';
        props.cities.forEach((city) => {
            if (city.id === delId) context = `id:${city.id} ${city.name}`
        });
        return context;
    };


    const cityTablesArr = () => {
        if (props.cities[0]) {
            return props.cities.map((city) => {
                return ({
                    id: city.id,
                    name: city.name,
                })
            })
        }
        return []
    };

    const showPanelOrList = () => {
        if (flag.showPanel) {
            return (
                <CityDataPanel
                    cityEdit={cityEdit}
                    changeCityName={changeCityName}
                    handleCitySave={handleCitySave}
                    handleCityCancel={handleCityCancel}
                    addNew={flag.addNew}
                />
            )
        } else {
            return (
                <React.Fragment>
                    <AddButton
                        nameAdd='город'
                        handleButton={handleAddButton}
                    />
                    <CitiesTable
                        listArr={cityTablesArr()}
                        clickEdit={clickEdit}
                        clickDel={clickDel}
                    />
                </React.Fragment>
            )
        }
    };

    return (
        <React.Fragment>
            {showPanelOrList()}
            {deleteDialog()}
        </React.Fragment>
    );
}

export default CitiesTab;
