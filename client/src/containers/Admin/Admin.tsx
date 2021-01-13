import React from 'react';
import Container from '@material-ui/core/Container';
import AdminTabs from '../../component/Tabs/AdminTabs';
import {connect, ConnectedProps} from 'react-redux';
import {
    addCity, editCity, deleteCity, fetchCities,
    addMaster, editMaster, deleteMaster, fetchMasters,
    addClient, editClient, deleteClient, fetchClients,
    deleteOrder,
    fetchFilterAndInfiniteOrders, fetchFilterAndPaginOrders,
    clearInfiniteOrders, fetchFilterMasters, fetchFilterClients,
} from '../../store/actions/adminAction';
import { authUserMessage, userLoginFetch } from '../../store/actions/authAction';
import { IAuthUser, ICity, IClient, IFetchFilterOrders, IMaster } from "../../interfaces";
import { RootStateType } from "../../store/reducers/rootReducer";
import { getUserStatus, logout, validToken } from "../../helpers/authProcessing";
import { useHistory } from 'react-router-dom';


const Admin: React.FC<PropsFromRedux> = (props) => {
    const { push } = useHistory();

    const renderAdmin = () => {
        if (validToken() && getUserStatus() === 'admin') {
            return (
                <Container component="main" maxWidth="xl">
                    <AdminTabs
                        fetchMasters={props.fetchMasters}
                        fetchFilterMasters={props.fetchFilterMasters}
                        addMaster={props.addMaster}
                        editMaster={props.editMaster}
                        deleteMaster={props.deleteMaster}

                        fetchCities={props.fetchCities}
                        addCity={props.addCity}
                        editCity={props.editCity}
                        deleteCity={props.deleteCity}

                        fetchClients={props.fetchClients}
                        fetchFilterClients={props.fetchFilterClients}
                        addClient={props.addClient}
                        editClient={props.editClient}
                        deleteClient={props.deleteClient}

                        fetchFilterAndPaginOrders={props.fetchFilterAndPaginOrders}
                        fetchFilterAndInfiniteOrders={props.fetchFilterAndInfiniteOrders}
                        clearInfiniteOrders={props.clearInfiniteOrders}
                        deleteOrder={props.deleteOrder}

                        masters={props.masters}
                        cities={props.cities}
                        clients={props.clients}
                        orders={props.orders}
                        ordersInfinite={props.ordersInfinite}

                    />
                </Container>
            )
        } else {
            logout();
            push('/auth');
            return null
        }
    };

    return (
        <React.Fragment>
            {renderAdmin()}
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
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Admin);

type PropsFromRedux = ConnectedProps<typeof connector>