import * as React from 'react';
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

interface ItimePickers {
    onChange(event: React.ChangeEvent<{ value: string; }>): void;
}

const TimePickers: React.FC<ItimePickers> = (props) => {
    const classes = useStyles();

    const nowTime = () => {
        const time = new Date();
        return time.getHours() + 1 + ':00';
    };

    return (
        <div className={classes.container}>
            <TextField
                onChange={props.onChange}
                id="time"
                label="Время:"
                type="time"
                defaultValue={nowTime()}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 0, // 60 min
                }}
            />
        </div>
    );
};

export default TimePickers;