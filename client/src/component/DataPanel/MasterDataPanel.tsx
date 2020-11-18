import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SelectElement from '../SelectElement';
import {ICity, IMaster} from "../../interfaces";

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

interface IMasterDataPanel {
    masterEdit: IMaster,
    handleMasterSave(event: React.MouseEvent): void,
    handleMasterCancel(event: React.MouseEvent): void,
    handleSelectCity(id: number): void,
    changeMasterName(name: string): void,
    arrCity: ICity[],
    addNew: boolean
}

const MasterDataPanel: React.FC<IMasterDataPanel> = (props) => {
    const classes = useStyles();
    const [valid, setValid] = useState({
        name: true,
    });

    const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
            props.changeMasterName(name);
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
                            helperText={!valid.name ? 'Имя не менее 3 знаков' : null}
                            onChange={changeName}
                            autoComplete="fname"
                            name="masterName"
                            variant="outlined"
                            value={props.masterEdit.name}
                            required
                            fullWidth
                            id="masterName"
                            label="Имя мастера"
                            autoFocus
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SelectElement
                            arrItems={props.arrCity}
                            onChange={props.handleSelectCity}
                            cityId={props.masterEdit.cityId}
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
                            onClick={props.handleMasterSave}
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
                            onClick={props.handleMasterCancel}
                        >
                            Отменить
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default MasterDataPanel;