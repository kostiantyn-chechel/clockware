import React from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import green from '@material-ui/core/colors/green';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

const useStyles = makeStyles((theme) => ({
    added: {
        margin: theme.spacing(0, 0, 2),
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

interface IAddButton {
    nameAdd: string,
    handleButton(): void,
}

const AddButton: React.FC<IAddButton> = (props) => {
    const { nameAdd } = props;
    const classes = useStyles();

    const handleBtn = (event: React.MouseEvent) => {
        event.preventDefault();
        props.handleButton();
    };

    return (
        <ThemeProvider theme={theme}>
            <Button
                fullWidth
                variant="contained"
                color='primary'
                className={classes.added}
                size="large"
                onClick={handleBtn}
            >
                {`Добавить ${nameAdd}`}
            </Button>
        </ThemeProvider>
    );
};

export default AddButton;