import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { RootStateType} from "../../store/reducers/rootReducer";
import { IChangeRegUser, IRegistrationUser } from "../../interfaces";
import { userRegistrationChange } from "../../store/actions/authAction";
import { connect, ConnectedProps} from "react-redux";
import { ErrorFieldType } from "../AuthRegistration/Registration";
import { compareChangeField, comparePass, isEmail, isName } from "../../helpers/validation";

const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
    },
}));

const ClientCabinet: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();

    const [error, setError] = useState<ErrorFieldType>({
        name: false,
        login: false,
        password: false,
        password2: false,
    });

    // const verificationField =(event: React.FocusEvent<HTMLInputElement>) => {
    const verificationField =() => {
        setError({
            name: !isName(user.name, 3),
            login: !isEmail(user.login),
            password: !(!user.password.length || isName(user.password, 8)),
            password2: !(!user.password.length || comparePass(user.password, user.password2)),
        });
    };

    const [user, setUser] = useState<IRegistrationUser>({
        name: props.name,
        login: props.login,
        password: '',
        password2: '',
        status: "client"
    });

    const handleChange = (event: React.ChangeEvent<{ name: string, value: unknown}>) => {
        setUser({
            ...user, [event.target.name]: event.target.value
        })
    };

    const clientChangeReg = (event: React.MouseEvent) => {
        event.preventDefault();
        const userChangeData: IChangeRegUser ={
            id: props.id,
            name: compareChangeField(props.name, user.name),
            login: compareChangeField(props.login, user.login),
            password: user.password,
        };
        if (userChangeData.name || userChangeData.login || userChangeData.password){
            props.userRegistrationChange(userChangeData);
        }
        console.log('userChangeData', userChangeData);
    };

    return (
            <Container component="main" maxWidth="xl">

                <Typography className={classes.text} component="h1" variant="h4" align="center" color="textPrimary">
                    CLIENT
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
                    onChange={handleChange}
                    onBlur={verificationField}
                    defaultValue={user.name}
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
                    onChange={handleChange}
                    onBlur={verificationField}
                    value={user.login}
                />

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
                    onChange={handleChange}
                    onBlur={verificationField}
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
                    onChange={handleChange}
                    onBlur={verificationField}
                />

                <Button
                    onClick={clientChangeReg}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    component={Link}
                    to='/client'
                >
                    сохранить
                </Button>

            </Container>
    );
};

function mapStateToProps(state: RootStateType) {
    return {
        id: state.auth.user.id,
        name: state.auth.user.name,
        login: state.auth.user.login,
        userStatus: state.auth.user.status,
    }
}

function mapDispatchToProps(dispatch: any) {
    return{
        userRegistrationChange: (userChangeRegInfo: IChangeRegUser) => dispatch(userRegistrationChange(userChangeRegInfo))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ClientCabinet);

type PropsFromRedux = ConnectedProps<typeof connector>

// export default ClientCabinet;