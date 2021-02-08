import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Drawer from "@material-ui/core/Drawer";
import ListMenu from "../../containers/Admin/ListMenu/ListMenu";
import {RootStateType} from "../../store/reducers/rootReducer";
import {setOpenMenu} from "../../store/actions/appAction";
import {connect, ConnectedProps} from "react-redux";
import OrdersTab from "../Tabs/OrdersTab";
import {IFetchFilterOrders} from "../../interfaces";
import {
    clearInfiniteOrders, deleteOrder,
    fetchFilterAndInfiniteOrders,
    fetchFilterAndPaginOrders
} from "../../store/actions/orderAction";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    main: {
        width: 250,
    },
    block: {
        minWidth: '620px',
    },
}));

const Orders: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();

    const handleDrawerClose = () => props.setMenuOpen(false);

    return (
        <Container className={classes.block} component="main" maxWidth="xl">
            <OrdersTab
                fetchFilterAndPaginOrders={props.fetchFilterAndPaginOrders}
                fetchFilterAndInfiniteOrders={props.fetchFilterAndInfiniteOrders}
                clearInfiniteOrders={props.clearInfiniteOrders}
                deleteOrder={props.deleteOrder}
                orders={props.orders}
                ordersInfinite={props.ordersInfinite}
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
        orders: state.admin.orders,
        ordersInfinite: state.admin.ordersInfinite,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setMenuOpen: (open: boolean) => dispatch(setOpenMenu(open)),
        fetchFilterAndPaginOrders: (param: IFetchFilterOrders) => dispatch(fetchFilterAndPaginOrders(param)),
        fetchFilterAndInfiniteOrders: (param: IFetchFilterOrders) => dispatch(fetchFilterAndInfiniteOrders(param)),
        clearInfiniteOrders: () => dispatch(clearInfiniteOrders()),
        deleteOrder: (orderId: number) => dispatch(deleteOrder(orderId)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Orders);

type PropsFromRedux = ConnectedProps<typeof connector>