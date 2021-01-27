import React from 'react';
import {TOrderStatus} from "../../interfaces";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

interface ISelectStatus {
    id: number
    status: TOrderStatus
    handleStatus(id: number, status: TOrderStatus): void
}
const SelectStatus: React.FC<ISelectStatus> = (props) => {
    const classes = useStyles();
    const { id, status, handleStatus } = props;

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => handleStatus(id, event.target.value as TOrderStatus);

    return (
        <FormControl className={classes.formControl}>
            <Select
                value={status}
                onChange={handleChange}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem value={'queue'}>в очереди</MenuItem>
                <MenuItem value={'inwork'}>в работе</MenuItem>
                <MenuItem value={'completed'}>готово</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SelectStatus;