import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Drawer from "@material-ui/core/Drawer";
import ListMenu from "../../containers/Admin/ListMenu/ListMenu";
import {RootStateType} from "../../store/reducers/rootReducer";
import {setOpenMenu} from "../../store/actions/appAction";
import {connect, ConnectedProps} from "react-redux";
import ClientsTab from "../Tabs/ClientsTab";
import {addClient, deleteClient, editClient, fetchClients, fetchFilterClients} from "../../store/actions/adminAction";
import {IClient} from "../../interfaces";
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

const Clients: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();

    const handleDrawerClose = () => props.setMenuOpen(false);

    return (
        <Container className={classes.block} component="main" maxWidth="xl">
            <ClientsTab
                fetchClients={props.fetchClients}
                fetchFilterClients={props.fetchFilterClients}
                addClient={props.addClient}
                editClient={props.editClient}
                deleteClient={props.deleteClient}
                clients={props.clients}
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
        clients: state.admin.clients,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setMenuOpen: (open: boolean) => dispatch(setOpenMenu(open)),
        fetchClients: () => dispatch(fetchClients()),
        fetchFilterClients: (name: string) => dispatch(fetchFilterClients(name)),
        addClient: (client: IClient) => dispatch(addClient(client)),
        editClient: (client: IClient) => dispatch(editClient(client)),
        deleteClient: (clientId: number) => dispatch(deleteClient(clientId)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Clients);

type PropsFromRedux = ConnectedProps<typeof connector>