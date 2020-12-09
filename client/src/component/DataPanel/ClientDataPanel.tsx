import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {isEmail} from '../../helpers/validation';
import {IClient} from "../../interfaces";


const useStyles = makeStyles((theme) => ({
    paper: {
        minWidth: 120,
        width: '100%',
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '400px', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    rating: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    slider: {

        width: '80%',
        marginTop: theme.spacing(),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-around',
    },
}));

interface IClientDataPanel {
    clientEdit: IClient,
    changeClientName(name: string): void,
    changeClientEmail(email: string): void,
    handleClientSave(event: React.MouseEvent): void,
    handleClientCancel(event: React.MouseEvent): void,
    addNew: boolean,
}

const ClientDataPanel:React.FC<IClientDataPanel> = (props) => {
    const classes = useStyles();
    const [valid, setValid] = useState({
        name: true,
        email: true,
    });

    const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        props.changeClientName(name);
        if (name.length < 3) {
            setValid({...valid, name: false})
        } else {
            setValid({...valid, name: true})
        }
    };

    const changeEmailText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        props.changeClientEmail(email);
        if (isEmail(email)) {
            setValid({...valid, email: true,})
        } else {
            setValid({...valid, email: false,})
        }
    };

    return (
        <div className={classes.paper}>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField
                            error={!valid.name}
                            helperText={!valid.name ? 'Имя не менее 3 знаков' : null}
                            onChange={changeName}
                            name="clientName"
                            variant="outlined"
                            value={props.clientEdit.name}
                            required
                            fullWidth
                            id="clientName"
                            label="Имя Клиента"
                            autoFocus
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            error={!valid.email}
                            helperText={!valid.email ? 'Некорректный email' : null}
                            onChange={changeEmailText}
                            name="clientEmail"
                            variant="outlined"
                            value={props.clientEdit.email}
                            required
                            fullWidth
                            id="clientEmail"
                            label="Email Клиента"
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.buttons} spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            size="large"
                            onClick={props.handleClientSave}
                        >
                            {props.addNew ? 'Добавить' : 'Изменить'}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            size="large"
                            onClick={props.handleClientCancel}
                        >
                            Отменить
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default ClientDataPanel;