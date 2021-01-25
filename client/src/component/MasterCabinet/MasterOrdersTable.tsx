import React from 'react';
import {IMasterOrder} from "../../interfaces";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import withStyles from "@material-ui/core/styles/withStyles";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import OrderItem from "./OrderItem";
import {Table} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.black,
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
        width: '100%',
    },
});

export interface IMasterOrdersTable {
    orders: IMasterOrder[]
    handleToggle(url: string): void
}

const MasterOrdersTable: React.FC<IMasterOrdersTable> = (props) => {
    const classes = useStyles();

    return (
        props.orders[0] ?
        <TableContainer component={Paper}>
            <Table className={classes.table} size='small' aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Размер</StyledTableCell>
                        <StyledTableCell>Фото</StyledTableCell>
                        <StyledTableCell>Заказчик</StyledTableCell>
                        <StyledTableCell>Дедлайн</StyledTableCell>
                        <StyledTableCell>Статус</StyledTableCell>
                    </TableRow>
                </TableHead>

                <OrderItem
                    orders={props.orders}
                    handleToggle={props.handleToggle}
                />
            </Table>


        </TableContainer>
            : null
    );
};

export default MasterOrdersTable;