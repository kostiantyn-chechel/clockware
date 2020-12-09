import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface INotMastrs {
    handleCancelBtn(event: React.MouseEvent):void
}

const NotMasters: React.FC<INotMastrs> = ({handleCancelBtn}) => {
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5" align="center" color="textPrimary">
                Извините на выбранное время нет свободных мастеров.
            </Typography>
            <form className={classes.form} noValidate>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        size="large"
                        onClick={handleCancelBtn}
                    >
                        Вернуться к заказу
                    </Button>
            </form>
        </div>
    );
}

export default NotMasters;