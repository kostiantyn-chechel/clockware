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
import { RootStateType } from "../../store/reducers/rootReducer";
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from "react-redux";

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

const AuthCommon: React.FC<PropsFromRedux> = props => {
    const classes = useStyles();
    const { userStatus, userToken } = props;
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
                    push('/admin');
                    break;
                case "client":
                    push('/client');
                    break;
            }
        }
    }, [userToken]);
    /* eslint-enable */

    const handleChange = (event: React.ChangeEvent<{ name: string, value: unknown}>) => {
        setUser({
            ...user, [event.target.name]: event.target.value
        })
    };

    const handleSubmit = (event:React.MouseEvent) => {
        event.preventDefault();
        props.userLoginFetch(user);
        props.authUserMessage('');
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                    />

                    {props.message ?
                        <Typography color='error' component="h1" variant="h5">
                            {props.message}
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

function mapStateToProps(state: RootStateType) {
    return {
        message: state.auth.message,
        userStatus: state.auth.user.status,
        userToken: state.auth.user.token,
    }
}

function mapDispatchToProps(dispatch: any) {
    return{
        userLoginFetch: (userInfo: IAuthUser) => dispatch(userLoginFetch(userInfo)),
        authUserMessage: (message: string) => dispatch(authUserMessage(message)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AuthCommon);

type PropsFromRedux = ConnectedProps<typeof connector>
