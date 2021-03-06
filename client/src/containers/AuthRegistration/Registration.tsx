import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from "@material-ui/core/TextField";
import { IRegistrationUser, IRegUser } from "../../interfaces";
import Button from "@material-ui/core/Button";
import { comparePass, isEmail, isName } from "../../helpers/validation";
import { userRegistrationFetch } from "../../store/actions/authAction";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Warning from '../../component/Warning';
import IStore from "../../type/store/IStore";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export type ErrorFieldType = {
    name: boolean
    login: boolean
    password: boolean
    password2: boolean
}

const Registration: React.FC = props => {
    const classes = useStyles();
    const { push } = useHistory();

    const dispatch = useDispatch();

    const message = useSelector(({auth}: IStore) => auth.message);
    const userStatus = useSelector(({auth}: IStore) => auth.user.status);

    const [user, setUser] = useState<IRegistrationUser>({
        name: '',
        login: '',
        password: '',
        password2: '',
        status: "client"
    });

    const [error, setError] = useState<ErrorFieldType>({
        name: false,
        login: false,
        password: false,
        password2: false,
    });

    /* eslint-disable */
    useEffect(() => {
        if (user.name && !error.name && !error.login && !error.password && !error.password2){
            dispatch(userRegistrationFetch(user as IRegUser));
        }
    },[error]);

    useEffect(() => {
        if (userStatus === 'client') {
            push('/client');
        }
    }, [userStatus]);
    /* eslint-enable */

    const handleName = (event: React.ChangeEvent<{ name: string, value: unknown}>) => {
        setUser({
            ...user, name: event.target.value as string
        })
    };

    const handleLogin = (event: React.ChangeEvent<{ name: string, value: unknown}>) => {
        setUser({
            ...user, login: event.target.value as string
        })
    };

    const handlePassword = (event: React.ChangeEvent<{ name: string, value: unknown}>) => {
        setUser({
            ...user, password: event.target.value as string
        })
    };

    const handlePassword2 = (event: React.ChangeEvent<{ name: string, value: unknown}>) => {
        setUser({
            ...user, password2: event.target.value as string
        })
    };

    const handleSubmit =() => {
        setError({
            name: !isName(user.name, 3),
            login: !isEmail(user.login),
            password: !isName(user.password, 8),
            password2: !comparePass(user.password, user.password2),
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar
                    className={classes.avatar}
                    src={process.env.PUBLIC_URL + '/logo_blue.png'}
                    variant='circular'
                />

                <Typography component="h1" variant="h5">
                   РЕГСТРАЦИЯ
                </Typography>

                <TextField
                    error={error.name}
                    helperText={error.name ? 'текст должен быть не менее 3 знаков': ''}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Имя"
                    name="name"
                    autoFocus
                    onChange={handleName}
                />

                <TextField
                    error={error.login}
                    helperText={error.login ?'Логином должен быть e-mail': ''}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="login"
                    label="Login(email)"
                    name="login"
                    onChange={handleLogin}
                />

                <Warning valid={!message} >
                    {message}
                </Warning>

                <TextField
                    error={error.password}
                    helperText={error.password ?'пароль должен быть не менее 8 знаков': ''}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handlePassword}
                />
                <TextField
                    error={error.password2}
                    helperText={error.password2 ?'Пароль должен совпадать': ''}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password2"
                    label="Password again"
                    type="password"
                    id="password2"
                    onChange={handlePassword2}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Регистрация
                </Button>
            </div>
        </Container>
    );
};

export default Registration;
