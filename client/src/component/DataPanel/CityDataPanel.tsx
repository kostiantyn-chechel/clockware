import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {ICity} from "../../interfaces";

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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-around',
    },
}));

interface ICityDataPanel {
    cityEdit: ICity,
    handleCitySave(event: React.MouseEvent): void,
    handleCityCancel(event: React.MouseEvent): void,
    changeCityName(name: string): void,
    addNew: boolean
}

const CityDataPanel: React.FC<ICityDataPanel> = (props) => {
    const classes = useStyles();
    const [valid, setValid] = useState({
        name: true,
    });

    const changeName = (event: React.ChangeEvent) => {
        const name = (event.target as HTMLInputElement).value;
        props.changeCityName(name);
        if (name.length < 3) {
            setValid({name: false})
        } else {
            setValid({name: true})
        }
    };

    return (
        <div className={classes.paper}>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField
                            error={!valid.name}
                            helperText={!valid.name ? 'Название города не менее 3 знаков' : null}
                            onChange={changeName}
                            autoComplete="fname"
                            name="cityName"
                            variant="outlined"
                            value={props.cityEdit.name}
                            required
                            fullWidth
                            id="cityName"
                            label="Название города"
                            autoFocus
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
                            onClick={props.handleCitySave}
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
                            onClick={props.handleCityCancel}
                        >
                            Отменить
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default CityDataPanel;