import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from "@material-ui/core/TextField";
import {IRegUser} from "../../interfaces";
import Button from "@material-ui/core/Button";
import {comparePass, isEmail, isName} from "../../helpers/validation";

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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type ErrorFieldType = {
    name: boolean
    login: boolean
    password: boolean
    password2: boolean
}

interface IRegistrationUser extends IRegUser{
    password2: string
}

const Registration: React.FC = props => {
    const classes = useStyles();

    const [user, setUser] = useState<IRegistrationUser>({
        name: '',
        login: '',
        password: '',
        password2: '',
    });

    const [error, setError] = useState<ErrorFieldType>({
        name: false,
        login: false,
        password: false,
        password2: false,
    });

    useEffect(() => {
        if (!error.name && !error.login && !error.password && !error.password2){
            console.log('send user :', user); //TODO send new User
        }
    },[error]);

    const handleChange = (event: React.ChangeEvent<{ name: string, value: unknown}>) => {
        setUser({
            ...user, [event.target.name]: event.target.value
        })
    };

    const handleSubmit =() => {
        setError({
            name: !isName(user.name, 3),
            login: !isEmail(user.login),
            password: !isName(user.password, 8),
            password2: !comparePass(user.password, user.password2),
        });
        console.log('user:', user);
        console.log('error', error);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar
                    className={classes.avatar}
                    src={process.env.PUBLIC_URL + '/logo_blue.png'}
                    variant='circle'
                />

                <Typography component="h1" variant="h5">
                   РЕГСТРАЦИЯ
                </Typography>

                <TextField
                    error={error.name}
                    helperText={'текст должен быть не менее 3 знаков'}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Имя"
                    name="name"
                    autoFocus
                    onChange={handleChange}
                />

                <TextField
                    error={error.login}
                    helperText={'Логином должен быть e-mail'}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="login"
                    label="Login(email)"
                    name="login"
                    onChange={handleChange}
                />

                <TextField
                    error={error.password}
                    helperText={'пароль должен быть не менее 8 знаков'}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                />
                <TextField
                    error={error.password2}
                    helperText={'Пароль должен совпадать'}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password2"
                    label="Password again"
                    type="password"
                    id="password2"
                    onChange={handleChange}
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
