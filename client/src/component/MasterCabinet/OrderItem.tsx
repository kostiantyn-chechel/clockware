import React from 'react';
import { IMasterOrdersTable } from "./MasterOrdersTable";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import withStyles from "@material-ui/core/styles/withStyles";
import TableRow from "@material-ui/core/TableRow";
import { sizeByNumber } from "../../helpers/dateTime";
import PhotoButton from "../Tabs/Tables/PhotoButton";
import CheckingDeadline from "./СheckingDeadline";
import SelectStatus from "./SelectStatus";

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const OrderItem: React.FC<IMasterOrdersTable> = (props) => {

    return (
    props.orders[0] ?
            <TableBody>
                {props.orders.map(order => (
                        <StyledTableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{sizeByNumber(order.hours)}</TableCell>
                            <TableCell>
                                <PhotoButton
                                    photoURL={order.photoURL}
                                    handleToggle={props.handleToggle}
                                />
                            </TableCell>
                            <TableCell>{`${order.order_user.name} (${order.order_user.login})`}</TableCell>
                            <TableCell>
                                <CheckingDeadline
                                    date={order.date}
                                    time={order.time}
                                    hours={order.hours}
                                />
                            </TableCell>
                            <TableCell>
                                <SelectStatus
                                    id={order.id}
                                    status={order.orderStatus}
                                    handleStatus={props.handleStatus}
                                />
                            </TableCell>
                        </StyledTableRow>
                    ))}
            </TableBody>
        : null
    );
};

export default OrderItem;