import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { today } from '../helpers/dateTime';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DatePickers(props) {
    const classes = useStyles();

    return (
        <div className={classes.container} >
            <TextField
                onChange={props.onChange}
                id="date"
                label="Дата:"
                type="date"
                defaultValue={today()}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    );
}