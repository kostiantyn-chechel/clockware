import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import GeneralTableHead from './GeneralTableHead';
import TableContainer from '@material-ui/core/TableContainer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import OrdersTableBody from './OrdersTableBody';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function PaginationTable(props) {
    const classes = useStyles();
    const { listArr, clickDel, handleToggle, setSortBy, setSort } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setSort(isAsc ? 'desc' : 'asc');
        setSortBy(property);
    };

    const headCells = [
        {id: 'date', name: 'Дата/время'},
        {id: 'photo', name: 'Фото'},
        {id: 'client', name: 'Клиент'},
        {id: 'master', name: 'Мастер'},
        {id: 'city', name: 'Город'},
    ];

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size='small' aria-label='customized table'>
                <GeneralTableHead
                    headCells={headCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />

                <OrdersTableBody
                    listArr={listArr}
                    clickDel={clickDel}
                    handleToggle={handleToggle}
                />
            </Table>
        </TableContainer>
    );
}

export default PaginationTable;