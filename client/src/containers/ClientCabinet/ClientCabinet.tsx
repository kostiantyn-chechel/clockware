import React, { useState } from 'react';
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import { RootStateType} from "../../store/reducers/rootReducer";
import { IChangeRegUser } from "../../interfaces";
import { userRegistrationChange } from "../../store/actions/authAction";
import { connect, ConnectedProps} from "react-redux";
import ClientOrders from "../../component/ClientOrders/ClientOrders";
import {fetchClientsOrderList} from "../../store/actions/clientAction";
import {Grid} from "@material-ui/core";
import ClientData from "../../component/ClientOrders/ClientData";

const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
    },

}));

type ClientCabinetStatusType = 'date' | 'orders'

const ClientCabinet: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();

    const [status, setStatus] = useState<ClientCabinetStatusType>('date');

    const handleClientOrders = (event: React.MouseEvent) => {
        event.preventDefault();
        props.fetchClientsOrderList(props.id);
    };

    return (
            <Container component="main" maxWidth="xl">

                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >
                    <Button
                        onClick={handleClientOrders}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                    >
                        My Orders
                    </Button>
                </Grid>

                <ClientData
                    id={props.id}
                    name={props.name}
                    login={props.login}
                    userRegistrationChange={props.userRegistrationChange}
                />

                <ClientOrders
                    orders={props.orders}
                />

            </Container>
    );
};

function mapStateToProps(state: RootStateType) {
    return {
        id: state.auth.user.id,
        name: state.auth.user.name,
        login: state.auth.user.login,
        userStatus: state.auth.user.status,
        orders: state.client.orders,
    }
}

function mapDispatchToProps(dispatch: any) {
    return{
        userRegistrationChange: (userChangeRegInfo: IChangeRegUser) => dispatch(userRegistrationChange(userChangeRegInfo)),
        fetchClientsOrderList: (id: number) => dispatch(fetchClientsOrderList(id))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ClientCabinet);

type PropsFromRedux = ConnectedProps<typeof connector>