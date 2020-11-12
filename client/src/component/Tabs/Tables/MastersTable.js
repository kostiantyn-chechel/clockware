import React, { useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import {Edit} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import withStyles from '@material-ui/core/styles/withStyles';
import GeneralTableHead from './GeneralTableHead';
import {stableSort} from './TablesHelpers/tableSort';
import CommentIcon from '@material-ui/icons/Comment';

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function MastersTable(props) {
    const classes = useStyles();
    const {listArr} = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const rows = () => {
        if (listArr[0]) {
            return (
                <TableBody>
                    {stableSort(listArr, order, orderBy)
                        .map(row => (
                            <StyledTableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.city}</TableCell>
                                <TableCell align='center'>{row.rating.toFixed(2)}</TableCell>
                                <TableCell align='center'>
                                    <IconButton variant="contained" color="primary" href={`/master/${row.id}`}>
                                        <CommentIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align='right'>
                                    <IconButton onClick={props.clickEdit.bind(this, row.id)} aria-label="edit"
                                                color="primary">
                                        <Edit/>
                                    </IconButton>
                                    <IconButton onClick={() => props.clickDel(row.id)} aria-label="delete"
                                                color='secondary'>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            )
        }
        return null
    };

    const headCells = [
        {id: 'name', name: 'Имя'},
        {id: 'city', align: 'left', name: 'Город'},
        {id: 'rating', name: 'Рейтинг'},
        {id: 'review', name: 'Отзывы'},
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
                {rows()}
            </Table>

        </TableContainer>
    );
}

export default MastersTable;