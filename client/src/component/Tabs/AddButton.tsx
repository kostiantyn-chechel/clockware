import React from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    added: {
        width: 300,
        minWidth: 230,
        height: 60,
        margin: theme.spacing(0, 0, 2),
    },
}));

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
    );
};

export default AddButton;