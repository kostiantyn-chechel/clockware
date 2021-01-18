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
} from "../../store/actions/adminAction";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
}));

const Orders: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();

    const handleDrawerClose = () => props.setMenuOpen(false);

    return (
        <React.Fragment>
            <div>ORDERS</div>
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
        </React.Fragment>

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