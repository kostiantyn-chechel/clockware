import React from 'react';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
    },
}));

interface IClientCabinet {
}

const ClientCabinet: React.FC<IClientCabinet> = (props) => {
    const classes = useStyles();

    const clientLoginFetch = () => { //TODO

    };

    const clientAuthUserMessage = () => { //TODO

    };

    return (
            <Container component="main" maxWidth="xl">

                <Typography component="h1" variant="h4" align="center" color="textPrimary">
                    CLIENT
                </Typography>

                <TextField
                    className={classes.text}
                    // error={false}
                    // helperText={true ? 'Имя не менее 3 знаков' : null}
                    // onChange={changeNameText}
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Ваше имя"
                    autoFocus
                    value={'Vasia'}
                    // value={props.name}
                />

                <TextField
                    className={classes.text}
                    // error={true}
                    // helperText={true ? 'Некорректный email' : null}
                    // onChange={changeEmailText}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Ваш email"
                    name="email"
                    autoComplete="email"
                    value={'props@email.my'}
                />

                <TextField
                    className={classes.text}
                    // error={true}
                    // onChange={changeEmailText}
                    variant="outlined"
                    required
                    fullWidth
                    id="password1"
                    label="Password"
                    name="password1"
                    autoComplete="email"
                    value={'***'}
                />

                <TextField
                    className={classes.text}
                    // error={true}
                    // onChange={changeEmailText}
                    variant="outlined"
                    required
                    fullWidth
                    id="password2"
                    label="Password"
                    name="password2"
                    autoComplete="email"
                    value={'***'}
                />

                <Button
                    // color="inherit"
                    // onClick={handlerLogout}
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

export default ClientCabinet;