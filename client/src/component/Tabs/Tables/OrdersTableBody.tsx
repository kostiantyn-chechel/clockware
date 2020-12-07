import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import { stableSort } from './TablesHelpers/tableSort';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import withStyles from '@material-ui/core/styles/withStyles';
import TableRow from '@material-ui/core/TableRow';
import PhotoButton from './PhotoButton';
import { ISortDirection } from "../../../interfaces";
import {IRow} from "../OrdersTab";

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

interface IOrdersTableBody {
    listArr: IRow[],
    order: ISortDirection,
    orderBy: string,
    handleToggle(url: string): void,
    clickDel(id: number): void,
}

const OrdersTableBody: React.FC<IOrdersTableBody> = (props) => {
    const { listArr, order, orderBy, handleToggle } = props;

    return (
        <>
            {(listArr && listArr[0])
                ? <TableBody>
                    {stableSort(listArr, order, orderBy)
                        .map(row => (
                            <StyledTableRow key={row.id}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell align='center'>
                                    <PhotoButton
                                        photoURL={row.photoURL}
                                        handleToggle={handleToggle}
                                    />
                                </TableCell>
                                <TableCell align='center'>{row.client}</TableCell>
                                <TableCell align='center'>{row.master}</TableCell>
                                <TableCell align='center'>{row.city}</TableCell>
                                <TableCell align='right'>
                                    <IconButton onClick={() => props.clickDel(row.id)} aria-label="delete"
                                                color='secondary'>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
                : null}
        </>
    )
};

export default OrdersTableBody;