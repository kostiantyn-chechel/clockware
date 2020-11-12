import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import { logout, validToken } from '../helpers/authProcessing';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none',
        cursor: 'pointer',
    },
}));

function Header(props) {
    const classes = useStyles();

    const handlerAdmin = () => {
        props.setIsToken(validToken());
     };

    const handlerLogout = () => {
        logout();
        props.setIsToken(false);
    };

    return (
        <AppBar position='static'>
            <Toolbar>
                <Button
                    onClick={props.emptyBooking}
                    color="inherit"
                    component={Link} to='/'
                >
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt=""/>
                </Button>

                <Typography
                    onClick={props.emptyBooking}
                    variant='h6'
                    color="inherit"
                    className={classes.title}
                    component={Link} to='/'
                >
                    Clockware
                </Typography>

                <Button color="inherit"
                        onClick={handlerAdmin}
                        className={classes.menuButton}
                        component={Link}
                        to='/admin'
                >
                   Admin
                </Button>

                <Button color="inherit"
                        onClick={handlerLogout}
                        className={classes.menuButton}
                        component={Link}
                        to='/admin'
                >
                   Logout
                </Button>

            </Toolbar>
        </AppBar>
    );
}

export default Header;