import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import ListMenu from "../../containers/Admin/ListMenu/ListMenu";
import {RootStateType} from "../../store/reducers/rootReducer";
import {setOpenMenu} from "../../store/actions/appAction";
import {connect, ConnectedProps} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CitiesTab from "../Tabs/CitiesTab";
import {addCity, deleteCity, editCity, fetchCities} from "../../store/actions/cityAction";
import {ICity} from "../../interfaces";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
    block: {
        minWidth: '620px',
    },
}));

const Cities: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();

    const handleDrawerClose = () => props.setMenuOpen(false);

    return (
        <Container className={classes.block} component="main" maxWidth="xl">
            <CitiesTab
                fetchCities={props.fetchCities}
                addCity={props.addCity}
                editCity={props.editCity}
                deleteCity={props.deleteCity}
                cities={props.cities}
            />
            <div className={classes.main}>
                <Drawer
                    anchor={"right"}
                    open={props.openMenu}
                    onClose={handleDrawerClose}
                >
                    <ListMenu
                        handleDrawerClose={handleDrawerClose}
                    />
                </Drawer>
            </div>
        </Container>

    );
};

function mapStateToProps(state: RootStateType) {
    return {
        openMenu: state.app.openMenu,
        cities: state.admin.cities,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setMenuOpen: (open: boolean) => dispatch(setOpenMenu(open)),
        fetchCities: () => dispatch(fetchCities()),
        addCity: (city: ICity) => dispatch(addCity(city)),
        editCity: (city: ICity) => dispatch(editCity(city)),
        deleteCity: (cityId: number) => dispatch(deleteCity(cityId)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Cities);

type PropsFromRedux = ConnectedProps<typeof connector>
