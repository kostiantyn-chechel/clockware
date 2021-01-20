import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { today } from '../../helpers/dateTime';

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

interface IDatePickers {
    onChange(event: React.ChangeEvent<{ value: string }>): void;
    defaultDate?: string;
}

const DatePickers:React.FC<IDatePickers> = (props) => {
    const classes = useStyles();

    const defDate = () => {
        if (props.defaultDate) return props.defaultDate;
        return today();
    };

    return (
        <div className={classes.container} >
            <TextField
                onChange={props.onChange}
                id="date"
                label="Дата:"
                type="date"
                // defaultValue={today()}
                defaultValue={defDate()}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    );
};

export default DatePickers;