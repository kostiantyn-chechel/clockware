import React, { useEffect, useState } from 'react';
// import { getAuthServerRequest } from '../../helpers/axios/axiosClockware';
import TableBody from '@material-ui/core/TableBody';
import withStyles from '@material-ui/core/styles/withStyles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { dayToString } from '../../helpers/dateTime';
import Container from '@material-ui/core/Container';
import { getAuthServerRequest } from "../../helpers/axios/axiosClockwareAPI";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.black,
    },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    blockBody: {
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
    orderBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

interface IReviewMaster {
    match: any,
}

export interface IReviews {
    id: number,
    review: string,
    rating: number,
    review_order: IOrder,
}
 interface IOrder {
     id: number,
     date: string,
     time: string,
 }

const ReviewMaster: React.FC<IReviewMaster> = (props) => {
    const { match } = props;
    const classes = useStyles();

    const [reviews, setReviews] = useState<IReviews[]>([]);

    const URL= `/rev/master?masterId=${match.params.id}`;
    /* eslint-disable */
    useEffect(() => {
        getAuthServerRequest(URL).then(review => setReviews(review as IReviews[]));
    },[]);
    /* eslint-enable */

    const orderData = (order: IOrder) => {
        return (
            <div className={classes.orderBlock}>
                <div># {order.id}</div>
                <div>{dayToString(order.date)}</div>
                <div>{order.time}</div>
            </div>
        )
    };

    const tableData = () => {
        if (reviews.length) {
            return (
                <TableBody >
                    {reviews.map(row => (
                        <StyledTableRow key={row.id}>
                            <TableCell align='center'>{orderData(row.review_order)}</TableCell>
                            <TableCell align='left'>{row.review}</TableCell>
                            <TableCell align='center'>{row.rating}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            )
        } else {
            return (
                <TableBody>
                    <TableRow>
                        <TableCell align='center'>---</TableCell>
                        <TableCell align='center'>нет отзывов</TableCell>
                        <TableCell align='center'>---</TableCell>
                    </TableRow>

                </TableBody>
            )
        }
    };


    return (
        <Container className={classes.blockBody}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size='small' aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>Заказ</StyledTableCell>
                            <StyledTableCell align='left'>Отзыв</StyledTableCell>
                            <StyledTableCell align='center'>Оценка</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {tableData()}
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ReviewMaster;