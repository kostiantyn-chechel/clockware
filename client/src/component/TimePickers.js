import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

export default function TimePickers(props) {
    const classes = useStyles();

    return (
        // <form className={classes.container} noValidate>
        <div className={classes.container}>
            <TextField
                onChange={props.onChange}
                id="time"
                label="Время:"
                type="time"
                defaultValue="10:00"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 1800, // 30 min
                }}
            />
        </div>
    );
}