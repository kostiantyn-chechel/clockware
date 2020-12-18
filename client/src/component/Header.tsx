import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import { logout, validToken } from '../helpers/authProcessing';
import { Avatar } from "@material-ui/core";
import {IUser, TUserStatus} from "../interfaces";
import Tooltip from "@material-ui/core/Tooltip";

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

interface IHeader {
    setIsToken(isToken: boolean):void
    emptyBooking():void
    userStatus: TUserStatus
    resetUser():void
    user: IUser
}

const Header: React.FC<IHeader> = (props) => {
    const classes = useStyles();
    const { userStatus, resetUser } = props;

    useEffect(() => {
        console.log('userStatus Effect', userStatus)//TODO
    }, [userStatus]);

    const handlerAdmin = () => {
        props.setIsToken(validToken());
     };

    const handlerLogout = () => {
        logout();
        resetUser();
        props.setIsToken(false);
    };

    const ButtonsShow = () => {
        console.log('userStatus', userStatus); //TODO
        if (userStatus === 'notAuth') {
            return (
                <React.Fragment>
                    <Button color="inherit"
                            onClick={handlerAdmin}
                            className={classes.menuButton}
                            component={Link}
                            to='/auth'
                    >
                        sign in
                    </Button>

                    <Button color="inherit"
                            onClick={handlerAdmin}
                            className={classes.menuButton}
                            component={Link}
                            to='/reg'
                    >
                        sign up
                    </Button>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Button color="inherit"
                            onClick={handlerLogout}
                            className={classes.menuButton}
                            component={Link}
                            to='/'
                    >
                        Logout
                    </Button>
                    <Tooltip title={`${props.user.name} (${props.user.login})`}>
                        <Avatar> {props.user.name.match(/\b(\w)/g)} </Avatar>
                    </Tooltip>

                </React.Fragment>

            )
        }
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

                {ButtonsShow()}

            </Toolbar>
        </AppBar>
    );
};

export default Header;