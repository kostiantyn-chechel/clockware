import React from 'react';
import Container from '@material-ui/core/Container';
import AdminTabs from '../../component/Tabs/AdminTabs';
import { connect } from 'react-redux';
import {
    addCity, addClient,
    addMaster, clearInfiniteOrders, deleteCity, deleteClient, deleteMaster, deleteOrder, editCity, editClient,
    editMaster,
    fetchCities,
    fetchClients, fetchFilterAndInfiniteOrders, fetchFilterAndPaginOrders,
    fetchMasters,
} from '../../store/actions/adminAction';
import Auth from '../../component/Auth/Auth';
import {authUserMessage, setIsToken, userLoginFetch} from '../../store/actions/authAction';
import {validToken} from '../../helpers/authProcessing';

function Admin(props) {

    const adminRender = () => {
        if (validToken() ) {
            return (
                <Container component="main" maxWidth="xl">
                    <AdminTabs
                        getListOrders={props.fetchOrders}
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
                    setIsToken={props.setIsToken}
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

function mapStateToProps(state) {
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

function mapDispatchToProps(dispatch) {
    return {
        fetchMasters: () => dispatch(fetchMasters()),
        addMaster: master => dispatch(addMaster(master)),
        editMaster: master => dispatch(editMaster(master)),
        deleteMaster: masterId => dispatch(deleteMaster(masterId)),

        fetchCities: () => dispatch(fetchCities()),
        addCity: city => dispatch(addCity(city)),
        editCity: city => dispatch(editCity(city)),
        deleteCity: cityId => dispatch(deleteCity(cityId)),

        fetchClients: () => dispatch(fetchClients()),
        addClient: client => dispatch(addClient(client)),
        editClient: client => dispatch(editClient(client)),
        deleteClient: clientId => dispatch(deleteClient(clientId)),

        fetchFilterAndPaginOrders: (param) => dispatch(fetchFilterAndPaginOrders(param)),
        fetchFilterAndInfiniteOrders: (word, limit, offset) => dispatch(fetchFilterAndInfiniteOrders(word, limit, offset)),
        clearInfiniteOrders: () => dispatch(clearInfiniteOrders()),
        deleteOrder: orderId => dispatch(deleteOrder(orderId)),

        userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo)),
        authUserMessage: message => dispatch(authUserMessage(message)),
        setIsToken: status => dispatch(setIsToken(status)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);
