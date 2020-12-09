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
    clearInfiniteOrders,
} from '../../store/actions/adminAction';
import Auth from '../../component/Auth/Auth';
import { authUserMessage, setIsToken, userLoginFetch } from '../../store/actions/authAction';
import { validToken } from '../../helpers/authProcessing';
import { IAuthUser, ICity, IClient, IFetchFilterOrders, IMaster } from "../../interfaces";
import {RootStateType} from "../../store/reducers/rootReducer";

const Admin: React.FC<PropsFromRedux> = (props) => {

    const adminRender = () => {
        if (validToken() ) {
            return (
                <Container component="main" maxWidth="xl">
                    <AdminTabs
                        setIsToken={props.setIsToken}

                        fetchMasters={props.fetchMasters}
                        addMaster={props.addMaster}
                        editMaster={props.editMaster}
                        deleteMaster={props.deleteMaster}

                        fetchCities={props.fetchCities}
                        addCity={props.addCity}
                        editCity={props.editCity}
                        deleteCity={props.deleteCity}

                        fetchClients={props.fetchClients}
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
            );
        } else {
            return (
                <Auth
                    userLoginFetch={props.userLoginFetch}
                    authUserMessage={props.authUserMessage}
                    message={props.message}
                />
            )
        }
    };

    return (
        <React.Fragment>
            {adminRender()}
        </React.Fragment>
    );
}

function mapStateToProps(state: RootStateType) {
    return {
        isToken: state.auth.isToken,
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
        addMaster: (master: IMaster) => dispatch(addMaster(master)),
        editMaster: (master: IMaster) => dispatch(editMaster(master)),
        deleteMaster: (masterId: number) => dispatch(deleteMaster(masterId)),

        fetchCities: () => dispatch(fetchCities()),
        addCity: (city: ICity) => dispatch(addCity(city)),
        editCity: (city: ICity) => dispatch(editCity(city)),
        deleteCity: (cityId: number) => dispatch(deleteCity(cityId)),

        fetchClients: () => dispatch(fetchClients()),
        addClient: (client: IClient) => dispatch(addClient(client)),
        editClient: (client: IClient) => dispatch(editClient(client)),
        deleteClient: (clientId: number) => dispatch(deleteClient(clientId)),

        fetchFilterAndPaginOrders: (param: IFetchFilterOrders) => dispatch(fetchFilterAndPaginOrders(param)),
        fetchFilterAndInfiniteOrders: (param: IFetchFilterOrders) => dispatch(fetchFilterAndInfiniteOrders(param)),
        clearInfiniteOrders: () => dispatch(clearInfiniteOrders()),
        deleteOrder: (orderId: number) => dispatch(deleteOrder(orderId)),

        userLoginFetch: (userInfo: IAuthUser) => dispatch(userLoginFetch(userInfo)),
        authUserMessage: (message: string) => dispatch(authUserMessage(message)),
        setIsToken: (status: boolean) => dispatch(setIsToken(status)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Admin);

type PropsFromRedux = ConnectedProps<typeof connector>

