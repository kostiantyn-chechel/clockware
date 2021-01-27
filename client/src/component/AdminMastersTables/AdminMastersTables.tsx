import React from 'react';
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import {Table} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import withStyles from "@material-ui/core/styles/withStyles";
import TableCell from "@material-ui/core/TableCell";
import Container from "@material-ui/core/Container";
import { IMasterTablesData } from "../../containers/Admin/AdminDashboard";
import MasterTableItems from "./MasterTableItems";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.black,
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    },
    block: {
        minWidth: '620px',
        marginTop: theme.spacing(3),
    },
}));


export interface IAdminMastersTables {
    data: IMasterTablesData[]
}
const AdminMastersTables: React.FC<IAdminMastersTables> = (props) => {
    const classes = useStyles();
    const { data } = props;

    return (
        <Container className={classes.block} component="main" maxWidth="xl">
            <TableContainer component={Paper}>
                <Table className={classes.table} size='small' aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Мастер</StyledTableCell>
                            <StyledTableCell align={"center"} >S1</StyledTableCell>
                            <StyledTableCell align={"center"}>S2</StyledTableCell>
                            <StyledTableCell align={"center"}>S3</StyledTableCell>
                            <StyledTableCell align={"center"}>Рейтинг</StyledTableCell>
                            <StyledTableCell align={"center"}>Завершенные / Незавершенные</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <MasterTableItems
                        data={data}
                    />
                </Table>
            </TableContainer>
        </Container>

    );
};

export default AdminMastersTables;