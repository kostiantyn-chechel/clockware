import React, {useEffect, useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import GeneralTableHead from './GeneralTableHead';
import OrdersTableBody from './OrdersTableBody';
import TableContainer from '@material-ui/core/TableContainer';

const useStyles = makeStyles((theme) => ({
    block: {
        overflow: 'auto',
        maxHeight: '700px',
    }
}));

function InfiniteTable(props) {
    const classes = useStyles();
    const { listArr, nextPortion, clearList, setClearList, clickDel,
                    handleToggle, setSortBy, setSort, setFullInfinite } = props;
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');

    /* eslint-disable */
    useEffect(() => {
        if (clearList) {
            setItems([]);
        }
        setClearList(false)
    },[clearList]);

    useEffect(() => {
        setItems([
            ...items,
            ...listArr
        ]);
    }, [listArr]);

    useEffect(() => setFullInfinite(items), [items]);
    /* eslint-enable */

    const handleScroll = event => {
        const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        if (bottom) nextPortion();
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setSort(isAsc ? 'desc' : 'asc');
        setSortBy(property);
        setItems([]);
    };

    const headCells = [
        {id: 'date', name: 'Дата/время'},
        {id: 'photo', name: 'Фото'},
        {id: 'client', name: 'Клиент'},
        {id: 'master', name: 'Мастер'},
        {id: 'city', name: 'Город'},
    ];

    return (
        <div className={classes.block} onScroll={handleScroll}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size='small' aria-label='customized table'>
                    <GeneralTableHead
                        headCells={headCells}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />

                    <OrdersTableBody
                        listArr={items}
                        clickDel={clickDel}
                        handleToggle={handleToggle}
                    />
                </Table>
            </TableContainer>
        </div>
    );
}

export default InfiniteTable;
