import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {ErrorFieldType} from "../../containers/AuthRegistration/Registration";
import {compareChangeField, comparePass, isEmail, isName} from "../../helpers/validation";
import {IChangeRegUser, IRegistrationUser} from "../../interfaces";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
    },

}));

interface IClientData {
    id: number
    name: string
    login: string
    userRegistrationChange(userChangeData: IChangeRegUser): void
}

const ClientData: React.FC<IClientData> = (props) => {
    const classes = useStyles();

    const [error, setError] = useState<ErrorFieldType>({
        name: false,
        login: false,
        password: false,
        password2: false,
    });

    const [user, setUser] = useState<IRegistrationUser>({
        name: props.name,
        login: props.login,
        password: '',
        password2: '',
        status: "client"
    });

    const verificationField =() => {
        setError({
            name: !isName(user.name, 3),
            login: !isEmail(user.login),
            password: !(!user.password.length || isName(user.password, 8)),
            password2: !(!user.password.length || comparePass(user.password, user.password2)),
        });
    };

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
    };

    return (
        <React.Fragment>
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
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
            >
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
            </Grid>
        </React.Fragment>
    );
};

export default ClientData;