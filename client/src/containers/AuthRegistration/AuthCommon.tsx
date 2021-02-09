import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { IAuthUser } from "../../interfaces";
import { authUserMessage, userLoginFetch } from "../../store/actions/authAction";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AuthCommon: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const message = useSelector(({auth}: IStore) => auth.message);
    const userStatus = useSelector(({auth}: IStore) => auth.user.status);
    const userToken = useSelector(({auth}: IStore) => auth.user.token);

    const { push } = useHistory();
    const [user, setUser] = useState<IAuthUser>({
        login: '',
        password: '',
    });

    /* eslint-disable */
    useEffect(() => {
        if (userToken) {
            switch (userStatus) {
                case "admin":
                    push('/dashboard');
                    break;
                case "client":
                    push('/client');
                    break;
                case "master":
                    setTimeout(() => {
                        push('/cabinet');
                    }, 50);
                    break;
            }
        }
    }, [userToken, userStatus]);
    /* eslint-enable */

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

    const handleSubmit = (event:React.MouseEvent) => {
        event.preventDefault();
        dispatch(userLoginFetch(user));
        dispatch(authUserMessage(''));
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

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="email"
                        autoFocus
                        onChange={handleLogin}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePassword}
                    />

                    {message ?
                        <Typography color='error' component="h1" variant="h5">
                            {message}
                        </Typography>
                        : null
                    }

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Войти
                    </Button>

                </form>
            </div>
        </Container>
    );
};

export default AuthCommon;
