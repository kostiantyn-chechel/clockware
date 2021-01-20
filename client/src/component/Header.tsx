import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import { logout } from '../helpers/authProcessing';
import { Avatar } from "@material-ui/core";
import { IUser, TUserStatus } from "../interfaces";
import Tooltip from "@material-ui/core/Tooltip";
import {nameToInitials} from "../helpers/dataProcessing";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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
    avatar: {
        color: '#3f51b5',
        backgroundColor: '#fff',
    },
}));

interface IHeader {
    user: IUser
    userStatus: TUserStatus
    emptyBooking():void
    resetUser():void
    setMenuOpen(open:boolean):void
}

const Header: React.FC<IHeader> = (props) => {
    const classes = useStyles();
    const { userStatus, resetUser, setMenuOpen } = props;

    const handlerLogout = () => {
        logout();
        resetUser();
    };

    const handleMenuOpen = () => {
        setMenuOpen(true);
    };


    const ButtonsShow = () => {
        if (userStatus === 'notAuth') {
            return (
                <React.Fragment>
                    <Button color="inherit"
                            className={classes.menuButton}
                            component={Link}
                            to='/auth'
                    >
                        sign in
                    </Button>

                    <Button color="inherit"
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
                        <Button color="inherit"
                                className={classes.menuButton}
                                component={Link}
                                to={`/${userStatus}`}
                        >
                            {/*<Avatar className={classes.avatar}> {props.user.name.match(/\b(\w)/g)} </Avatar>*/}
                            <Avatar className={classes.avatar}> {nameToInitials(props.user.name)} </Avatar>
                        </Button>
                    </Tooltip>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleMenuOpen}
                        // className={clsx(open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>

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