import React, {useEffect, useState, useRef, useMemo} from 'react';
import Grid from '@material-ui/core/Grid';
import { hoursByWords, dayToString } from '../../helpers/dateTime'
import { validName, validClient } from '../../helpers/dataProcessing';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import PaginationTable from './Tables/PaginationTable';
import InfiniteTable from './Tables/InfiniteTable';
import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        borderColor: 'green',
    },
    iconButton: {
        padding: 10,
    },
    noPhoto: {
        color: '#bf090a',
    },
    img: {
        maxWidth: '80%',
        maxHeight: '80%',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    buttonPagin: {
        minWidth: '100px'
    },
    paginationBlock: {
        padding: theme.spacing(1),
    },
    tableBlock: {
        marginTop: theme.spacing(2),
    }
}));

const RECORDS_PER_PAGE = 6;
const RECORDS_PER_SCROLL = 6;
const FIRST_SCROLL = 12;
const START_PAGE = 0;

function OrdersTab(props) {
    const classes = useStyles();

    const searchValue = useRef('');

    const [typePagination, setTypePagination] = useState(true);

    const [sortBy, setSortBy] = useState('');
    const [sort, setSort] = useState('asc');

    const [ordersPagination, setOrdersPagination] = useState([]);
    const [paginationPage, setPaginationPage] = useState(1);

    const [showDelDialog, setShowDelDialog] = useState(false);
    const [delId, setDelId] = useState('');

    /* eslint-disable */
    useEffect(() => {
        refreshPagination(START_PAGE);
        return () => props.clearInfiniteOrders();
    },[]);

    useEffect(() => {
        if (typePagination) {
            refreshPagination((paginationPage - 1) * RECORDS_PER_PAGE);
        } else {
            setCurrentScrollOffset(FIRST_SCROLL);
            refreshInfinite(FIRST_SCROLL, START_PAGE);
            props.clearInfiniteOrders();
        }
    },[sort, sortBy]);
    /* eslint-enable */

    const [countOrders, setCountOrders] = useState(0);
    useEffect(() => {
        setCountOrders(props.orders.count);
        if (props.orders.rows) {
            setOrdersPagination(createRows(props.orders.rows));
        }
    },[props.orders]);

    const [ordersInfinite, setOrdersInfinite] = useState([]);
    const [fullInfinite, setFullInfinite] = useState([]);
    const [currentScrollOffset, setCurrentScrollOffset] = useState(FIRST_SCROLL);
    const [clearList, setClearList] = useState(true);

    useEffect(() => {
        setCountOrders(props.ordersInfinite.count);
        if (props.ordersInfinite.rows) {
            setOrdersInfinite(createRows(props.ordersInfinite.rows));
        } else {
            setOrdersInfinite([]);
        }
    },[props.ordersInfinite]);

    const createRows = orders => {
        return orders.map(order => {
            return({
                id: order.id,
                date: dayToString(order.date),
                time: order.time,
                hours: hoursByWords('' + order.hours),
                client: validClient(order.order_client),
                master: validName(order.order_master, 'name'),
                city: validName(order.order_city, 'name'),
                photoURL: order.photoURL,
            })
        })
    };

    const nextPortion = () => {
        if (countOrders - currentScrollOffset > 1) {
            refreshInfinite(RECORDS_PER_SCROLL, currentScrollOffset);
            setCurrentScrollOffset(currentScrollOffset + RECORDS_PER_SCROLL);
        }
    };

    const [urlPhoto, setUrlPhoto] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setUrlPhoto('');
        setOpen(false);
    };
    const handleToggle = url => {
        setUrlPhoto(url);
        setOpen(!open);
    };

    const handleTogglePagination = () => {
        setTypePagination(!typePagination);
        if (typePagination) {
            refreshInfinite(FIRST_SCROLL, START_PAGE);
        } else {
            setCurrentScrollOffset(FIRST_SCROLL);
            refreshPagination(START_PAGE);
            props.clearInfiniteOrders();
        }
    };

    const namePagination = () => typePagination ? 'infinite' : 'pagination';

    const handleChangeSearch = event => searchValue.current = event.target.value;

    const handleSearch = event => {
        event.preventDefault();
        if (typePagination) {
            refreshPagination(START_PAGE);
        } else {
            setClearList(true);
            setCurrentScrollOffset(FIRST_SCROLL);
            refreshInfinite(FIRST_SCROLL, START_PAGE);
        }
    };

    const orderDelete = () => {
        props.deleteOrder(delId);
        if (typePagination) {
            refreshPagination(START_PAGE);
        } else {
            setClearList(true);
            setCurrentScrollOffset(FIRST_SCROLL);
            refreshInfinite(FIRST_SCROLL, START_PAGE);
        }
    };

    const clickDel = id => {
        setDelId(id);
        setShowDelDialog(true);
    };

    const deleteDialog = () => {
        if (showDelDialog) {
            return (
                <DeleteDialog
                    context={contextOrder(typePagination ? ordersPagination: fullInfinite)}
                    setDelete={setShowDelDialog}
                    deleteEntry={orderDelete}
                />
            )
        } else {
            return null
        }
    };

    const contextOrder = orders => {
        const delOrder = orders.find((order) => order.id === delId);
        return `id:${delOrder.id} ${delOrder.date} ${delOrder.client}`;
    };

    const ordersTablesArr = orders => orders[0] ? orders : [];

    /* eslint-disable */
    const scrollPortion = useMemo(() => ordersTablesArr(ordersInfinite), [ordersInfinite]);
    /* eslint-enable */

    const handlePaginator = (event, number) =>{
        setPaginationPage(number);
        refreshPagination((number - 1) * RECORDS_PER_PAGE);
    };

    const numberOfPages = () => Math.trunc(countOrders / RECORDS_PER_PAGE) + !!(countOrders % RECORDS_PER_PAGE);

    const refreshPagination = numberPage => props.fetchFilterAndPaginOrders({ word: searchValue.current,
                                                            limit: RECORDS_PER_PAGE, offset: numberPage, sortBy, sort });

    const refreshInfinite = (scroll, numberPage) => props.fetchFilterAndInfiniteOrders({ word: searchValue.current,
                                                            limit: scroll, offset: numberPage, sortBy, sort });

    const listOrders = () => {
        if (typePagination) {
            return(
                <>
                    <div className={classes.tableBlock}>
                        <PaginationTable
                            listArr={ordersTablesArr(ordersPagination)}
                            clickDel={clickDel}
                            handleToggle={handleToggle}
                            setSort={setSort}
                            setSortBy={setSortBy}
                        />
                    </div>

                    <Grid className={classes.paginationBlock} container justify='space-around' alignItems='center'>
                        <Grid>
                            <Pagination
                                disabled={false}
                                count={numberOfPages()}
                                variant="outlined"
                                shape="rounded"
                                onChange={handlePaginator}
                            />
                        </Grid>
                    </Grid>
                </>
            )
        } else {
            return (
                <div className={classes.tableBlock}>
                    <InfiniteTable
                        listArr={scrollPortion}
                        clickDel={clickDel}
                        clearList={clearList}
                        setClearList={setClearList}
                        nextPortion={nextPortion}
                        handleToggle={handleToggle}
                        setFullInfinite={setFullInfinite}
                        setSort={setSort}
                        setSortBy={setSortBy}
                    />
                </div>
            )
        }
    };

    return (
        <>
            <Grid container justify='space-around' alignItems='center'>
                    <Grid>
                        <Paper component="form" className={classes.root}>
                            <InputBase
                                className={classes.input}
                                placeholder="Поиск"
                                inputProps={{ 'aria-label': 'Поиск' }}
                                color={'secondary'}
                                onChange={handleChangeSearch}
                            />
                            <IconButton
                                type="submit"
                                className={classes.iconButton}
                                aria-label="search"
                                onClick={handleSearch}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Button className={classes.buttonPagin} onClick={handleTogglePagination}>{namePagination()}</Button>
                </Grid>

            {listOrders()}

            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                {/* eslint-disable */}
                <img src={urlPhoto} className={classes.img}/>
                {/* eslint-enable */}
            </Backdrop>

            {deleteDialog()}
        </>
    );
}

export default OrdersTab;