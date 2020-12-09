import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const SomeError:React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                Извините, произошла ошибка!
            </Typography>
            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                Попробуйте немного позже.
            </Typography>
        </div>
    );
}

export default SomeError;