import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import withStyles from '@material-ui/core/styles/withStyles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
// import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import {ISortDirection} from "../../../interfaces";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.black,
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    head: {
        color: theme.palette.common.white,
    }
}));

interface IGeneralTableHead {
    headCells: any[],
    order: ISortDirection,
    orderBy: string,
    onRequestSort(event: React.MouseEvent, property: string): void,
}

const GeneralTableHead: React.FC<IGeneralTableHead> = (props) => {
    const classes = useStyles();
    const { headCells, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property: string) => (event: React.MouseEvent) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
            {headCells.map(cell => (
                <StyledTableCell
                    key={cell.id}
                    // align={cell.numeric ? 'right' : 'left'}
                    align={cell.align ? cell.align : 'center'}
                    sortDirection={orderBy === cell.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === cell.id}
                        direction={orderBy === cell.id ? order : 'asc'}
                        onClick={createSortHandler(cell.id)}
                    >
                        {cell.name}
                        {orderBy === cell.id ? (
                            <span className={classes.visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                    </TableSortLabel>
                </StyledTableCell>
            ))}
            <StyledTableCell align='right'>Действия</StyledTableCell>
                </TableRow>
        </TableHead>
    );
};

// GeneralTableHead.propTypes = {
//     headCells: PropTypes.array.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
// };

export default GeneralTableHead;