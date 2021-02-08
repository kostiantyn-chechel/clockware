import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SelectElement from '../SelectElement';
import { ICity, IMaster, TUserStatus } from "../../interfaces";
import {comparePass, isEmail, isName} from "../../helpers/validation";
import Warning from "../Warning";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

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

type ErrorMasterFieldType = {
    name: boolean
    login: boolean
    city: boolean
    password: boolean
    password2: boolean
}

export interface IRegistrationMaster {
    id: number
    name: string
    login: string
    cityId: number
    password: string
    password2: string
    status: TUserStatus
}

interface IMasterDataPanel {
    masterEdit: IMaster
    handleMasterCancel(event: React.MouseEvent): void
    handleMasterAddEdit(master: IRegistrationMaster): void
    arrCity: ICity[],
    addNew: boolean,
    message: string
}

const MasterDataPanel: React.FC<IMasterDataPanel> = (props) => {
    const classes = useStyles();

    const [master, setMaster] = useState<IRegistrationMaster>({
        id: props.masterEdit.id,
        name: props.masterEdit.name,
        login: props.masterEdit.login ? props.masterEdit.login :'не указано',
        cityId: props.masterEdit.cityId,
        password: '',
        password2: '',
        status: 'master'
    });


    useEffect(() => {
        setError({
            name: master.name === '' ? false : !isName(master.name, 3),
            login: master.login === '' ? false : !isEmail(master.login),
            city: !master.cityId,
            password: master.password === '' ? false :!isName(master.password, 8),
            password2: !comparePass(master.password, master.password2),
        })
    }, [master]);

    const [error, setError] = useState<ErrorMasterFieldType>({
        name: false,
        login: false,
        city: false,
        password: false,
        password2: false,
    });

    const handleChange = (event: React.ChangeEvent<{ name: string, value: unknown}>) => {
        setMaster({
            ...master, [event.target.name]: event.target.value
        })
    };
    const handleSelectCity = (id: number) => setMaster({ ...master, cityId: id });

    const handleMasterSave = (event: React.MouseEvent) => {
        event.preventDefault();
        props.handleMasterAddEdit(master);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <TextField
                    error={error.name}
                    helperText={!error.name ? 'Имя не менее 3 знаков' : null}
                    onChange={handleChange}
                    value={master.name}
                    margin="normal"
                    name="name"
                    id="name"
                    label="Имя мастера"
                    variant="outlined"
                    required
                    fullWidth
                    autoFocus
                />

                <TextField
                    error={error.login}
                    helperText={!error.login ? 'Некорректный email' : null}
                    onChange={handleChange}
                    value={master.login}
                    margin="normal"
                    name="login"
                    id="login"
                    label="Email Мастера"
                    variant="outlined"
                    required
                    fullWidth
                />

                <Warning valid={!props.message} >
                    {props.message}
                </Warning>

                <TextField
                    error={error.password}
                    helperText={error.password ?'пароль должен быть не менее 8 знаков': ''}
                    onChange={handleChange}
                    margin="normal"
                    name="password"
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                    fullWidth
                />
                <TextField
                    error={error.password2}
                    helperText={error.password2 ?'Пароль должен совпадать': ''}
                    onChange={handleChange}
                    margin="normal"
                    name="password2"
                    id="password2"
                    variant="outlined"
                    label="Password again"
                    type="password"
                    required
                    fullWidth
                />

                <SelectElement
                    arrItems={props.arrCity}
                    onChange={handleSelectCity}
                    cityId={props.masterEdit.cityId}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    size="large"
                    onClick={handleMasterSave}
                >
                    {props.addNew ? 'Добавить' : 'Изменить'}
                </Button>
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
            </div>
        </Container>
    );
};

export default MasterDataPanel;