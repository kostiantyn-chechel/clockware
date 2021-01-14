import React  from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { RootStateType } from "../../store/reducers/rootReducer";
import {
    addCity, addClient,
    addMaster, clearInfiniteOrders, deleteCity, deleteClient,
    deleteMaster, deleteOrder, editCity, editClient,
    editMaster,
    fetchCities, fetchClients, fetchFilterAndInfiniteOrders, fetchFilterAndPaginOrders, fetchFilterClients,
    fetchFilterMasters,
    fetchMasters
} from "../../store/actions/adminAction";
import { IAuthUser, ICity, IClient, IFetchFilterOrders, IMaster } from "../../interfaces";
import { authUserMessage, userLoginFetch } from "../../store/actions/authAction";
import { connect, ConnectedProps } from "react-redux";
import { setOpenMenu } from "../../store/actions/appAction";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupTwoToneIcon from '@material-ui/icons/GroupTwoTone';

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
}));

const AdminDashboard: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();

    const handleDrawerClose = () => props.setMenuOpen(false);

    return (
        <React.Fragment>
            <div className={classes.main}>
                <Drawer
                    anchor={"right"}
                    open={props.openMenu}
                    onClose={handleDrawerClose}
                >
                    <List>
                        <ListItem> Главная </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon><GroupTwoToneIcon/></ListItemIcon>
                            <ListItemText primary={'Мастера'}/>
                        </ListItem>
                        <ListItem> Города </ListItem>
                        <ListItem> Клиенты </ListItem>
                        <ListItem> Заказы </ListItem>
                        <Divider />
                        <ListItem> Выход </ListItem>
                    </List>

                </Drawer>
            </div>
        </React.Fragment>
    );
};

function mapStateToProps(state: RootStateType) {
    return {
        message: state.auth.message,
        masters: state.admin.masters,
        cities: state.admin.cities,
        clients: state.admin.clients,
        orders: state.admin.orders,
        ordersInfinite: state.admin.ordersInfinite,
        openMenu: state.app.openMenu,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        fetchMasters: () => dispatch(fetchMasters()),
        fetchFilterMasters: (name: string) => dispatch(fetchFilterMasters(name)),
        addMaster: (master: IMaster) => dispatch(addMaster(master)),
        editMaster: (master: IMaster) => dispatch(editMaster(master)),
        deleteMaster: (masterId: number) => dispatch(deleteMaster(masterId)),

        fetchCities: () => dispatch(fetchCities()),
        addCity: (city: ICity) => dispatch(addCity(city)),
        editCity: (city: ICity) => dispatch(editCity(city)),
        deleteCity: (cityId: number) => dispatch(deleteCity(cityId)),

        fetchClients: () => dispatch(fetchClients()),
        fetchFilterClients: (name: string) => dispatch(fetchFilterClients(name)),
        addClient: (client: IClient) => dispatch(addClient(client)),
        editClient: (client: IClient) => dispatch(editClient(client)),
        deleteClient: (clientId: number) => dispatch(deleteClient(clientId)),

        fetchFilterAndPaginOrders: (param: IFetchFilterOrders) => dispatch(fetchFilterAndPaginOrders(param)),
        fetchFilterAndInfiniteOrders: (param: IFetchFilterOrders) => dispatch(fetchFilterAndInfiniteOrders(param)),
        clearInfiniteOrders: () => dispatch(clearInfiniteOrders()),
        deleteOrder: (orderId: number) => dispatch(deleteOrder(orderId)),

        userLoginFetch: (userInfo: IAuthUser) => dispatch(userLoginFetch(userInfo)),
        authUserMessage: (message: string) => dispatch(authUserMessage(message)),

        setMenuOpen: (open: boolean) => dispatch(setOpenMenu(open)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AdminDashboard);

type PropsFromRedux = ConnectedProps<typeof connector>