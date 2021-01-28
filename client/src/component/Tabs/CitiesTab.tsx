import React, { useState, useEffect } from 'react';
import AddButton from './AddButton';
import CityDataPanel from '../DataPanel/CityDataPanel';
import CitiesTable from './Tables/CitiesTable';
import DeleteDialog from './DeleteDialog';
import { ICitiesTab, ICity } from "../../interfaces";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    topBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 0,
        marginTop: theme.spacing(2),
    },
    text: {
        padding: theme.spacing(1),
        alignItems: 'center',
    }
}));

export type CityTableType = {id: number, name: string}

const CitiesTab: React.FC<ICitiesTab> = (props) => {
    const classes = useStyles();
    const [cityEdit, setCityEdit] = useState<ICity>({
        name: '',
    });

    const [flag, setFlag] = useState({
        showPanel: false,
        addNew: true,
    });

    const [showDelDialog, setShowDelDialog] = useState(false);
    const [delId, setDelId] = useState<number>(0);

    /* eslint-disable */
    useEffect(() => {
        props.fetchCities();
    }, []);
    /* eslint-enable */

    const changeCityName = (name: string) => setCityEdit({ ...cityEdit, name: name });
    const handleAddButton = () => setFlag({ showPanel: true, addNew: true });

    const handleCitySave = (event: React.MouseEvent) => {
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

    const handleCityCancel = (event: React.MouseEvent): void => {
        event.preventDefault();
        setFlag({ ...flag, showPanel: false });
        setCityEdit({ name: '' });
    };

    const clickEdit = (id: number) => {
        props.cities.forEach((city) => {
            if (city.id === id) {
                setCityEdit(city);
            }
        });
        setFlag({ showPanel: true, addNew: false });
    };

    const cityDelete = () => props.deleteCity(delId);

    const clickDel = (id: number) => {
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

    const cityTablesArr = (): CityTableType[] => {
        if (props.cities[0]) {
            return props.cities.map((city): CityTableType => {

                return ({
                    id: city.id!,
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
                    <Container maxWidth={false} classes={{ root: classes.topBlock }}>
                        <Typography className={classes.text} variant="h4" align="center" gutterBottom>
                            ГОРОДА
                        </Typography>
                        <AddButton
                            nameAdd='город'
                            handleButton={handleAddButton}
                        />
                    </Container>
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
};

export default CitiesTab;
