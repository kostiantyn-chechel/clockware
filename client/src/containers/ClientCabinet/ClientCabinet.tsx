import React, { useState } from 'react';
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import { userRegistrationChange } from "../../store/actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import ClientOrders from "../../component/ClientOrders/ClientOrders";
import { fetchClientsOrderList } from "../../store/actions/clientAction";
import { Grid } from "@material-ui/core";
import ClientData from "../../component/ClientOrders/ClientData";
import { isTokenValid, logout } from "../../helpers/authProcessing";
import { useHistory } from "react-router-dom";
import IStore from "../../type/store/IStore";
import {IChangeRegUser} from "../../interfaces";

const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },

}));

type ClientCabinetStatusType = 'date' | 'orders'

const ClientCabinet: React.FC = (props) => {
    const { push } = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const token = useSelector(({auth}: IStore) => auth.user.token);
    const tokenTime = useSelector(({auth}: IStore) => auth.user.tokenTime);
    const id = useSelector(({auth}: IStore) => auth.user.id);
    const name = useSelector(({auth}: IStore) => auth.user.name);
    const login = useSelector(({auth}: IStore) => auth.user.login);
    const userStatus = useSelector(({auth}: IStore) => auth.user.status);
    const orders = useSelector(({client}: IStore) => client.orders);

    const [status, setStatus] = useState<ClientCabinetStatusType>('date');

    const handleStatusCabinet = (event: React.MouseEvent) => {
        event.preventDefault();
        if (status === 'date') {
            setStatus('orders');
            dispatch(fetchClientsOrderList(id));
        } else {
            setStatus('date');
        }
    };



    const buttonName = (): string => {
        if (status === 'date') {
            return 'Мои заказы'
        } else {
            return 'Данные'
        }
    };

    const handleRegistrationChange = (userChangeData: IChangeRegUser) => {
        dispatch(userRegistrationChange(userChangeData))
    };

    const showCabinetPath = () => {
        if (status === 'date') {
            return(
                <ClientData
                    id={id}
                    name={name}
                    login={login}
                    // userRegistrationChange={props.userRegistrationChange}
                    handleRegistrationChange={handleRegistrationChange}
                />
            )
        } else {
            return (
                <ClientOrders
                    orders={orders}
                />
            )
        }
    };

    const renderClientCabinet = () => {
        if (isTokenValid(token, tokenTime) && userStatus === 'client') {
            return (
                <Container component="main" maxWidth="xl">

                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Button
                            onClick={handleStatusCabinet}
                            className={classes.button}
                            variant="contained"
                            color="primary"
                        >
                            {buttonName()}
                        </Button>
                    </Grid>

                    {showCabinetPath()}

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
            {renderClientCabinet()}
        </React.Fragment>
    );
};

export default ClientCabinet;