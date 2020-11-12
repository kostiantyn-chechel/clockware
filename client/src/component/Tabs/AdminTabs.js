import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ClientsTab from './ClientsTab';
import OrdersTab from './OrdersTab';
import CitiesTab from './CitiesTab';
import MastersTab from './MastersTab';
import { validToken } from '../../helpers/authProcessing';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function AdminTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = async (event, newValue) => {
        props.setIsToken(validToken());
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value}
                      onChange={handleChange}

                      variant='fullWidth'
                      aria-label="simple tabs example"
                >
                    <Tab label="Мастера" {...a11yProps(0)} />
                    <Tab label="Города" {...a11yProps(1)} />
                    <Tab label="Клиенты" {...a11yProps(2)} />
                    <Tab label="Заказы" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <MastersTab
                    fetchMasters={props.fetchMasters}
                    addMaster={props.addMaster}
                    editMaster={props.editMaster}
                    deleteMaster={props.deleteMaster}
                    masters={props.masters}
                    cities={props.cities}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CitiesTab
                    fetchCities={props.fetchCities}
                    addCity={props.addCity}
                    editCity={props.editCity}
                    deleteCity={props.deleteCity}
                    cities={props.cities}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ClientsTab
                    fetchClients={props.fetchClients}
                    addClient={props.addClient}
                    editClient={props.editClient}
                    deleteClient={props.deleteClient}
                    clients={props.clients}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <OrdersTab
                    fetchFilterAndPaginOrders={props.fetchFilterAndPaginOrders}
                    fetchFilterAndInfiniteOrders={props.fetchFilterAndInfiniteOrders}
                    clearInfiniteOrders={props.clearInfiniteOrders}
                    deleteOrder={props.deleteOrder}
                    orders={props.orders}
                    ordersInfinite={props.ordersInfinite}
                />
            </TabPanel>
        </div>
    );
}