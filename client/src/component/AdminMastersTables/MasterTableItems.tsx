import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {IAdminMastersTables} from "./AdminMastersTables";

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const MasterTableItems: React.FC<IAdminMastersTables> = (props) => {
    return (
        props.data[0] ?
            <TableBody>
                {props.data.map(master => (
                    <StyledTableRow key={master.id + master.name}>
                        <TableCell>{master.id}</TableCell>
                        <TableCell>{master.name}</TableCell>
                        <TableCell align={"center"}>{master.s1 ? master.s1 : '-'}</TableCell>
                        <TableCell align={"center"}>{master.s2 ? master.s2 : '-'}</TableCell>
                        <TableCell align={"center"}>{master.s3 ? master.s3 : '-'}</TableCell>
                        <TableCell align={"center"}>{master.rating.toFixed(2)}</TableCell>
                        <TableCell align={"center"}>{master.status}</TableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
            : null
    );
};

export default MasterTableItems;