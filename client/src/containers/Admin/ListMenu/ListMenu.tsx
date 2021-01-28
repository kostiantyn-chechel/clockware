import React from 'react';
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import GroupTwoToneIcon from "@material-ui/icons/GroupTwoTone";
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { ListItemText } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const divider = 'divider';

const useStyles = makeStyles((theme) => ({
    icon: {
        display: 'block',
        width: 40,
    },
    text: {
        display: 'block',
        width: 150,
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        color: '#000',
        textDecoration: 'none',
    }

}));

type ListMenuType = {
    icon: any
    name: string
    rout: string
} | typeof divider

const menuList: ListMenuType[] = [
    { icon: <AccountBalanceOutlinedIcon/>, name: 'Главная', rout: '/dashboard' },
    'divider',
    { icon: <GroupTwoToneIcon/>, name: 'Мастера', rout: '/dashboard/masters' },
    { icon: <HomeWorkOutlinedIcon/>, name: 'Города', rout: '/dashboard/cities' },
    { icon: <SentimentSatisfiedOutlinedIcon/>, name: 'Клиенты', rout: '/dashboard/clients' },
    { icon: <AccountBalanceWalletOutlinedIcon/>, name: 'Заказы', rout: '/dashboard/orders' },
    'divider',
    { icon: <ExitToAppOutlinedIcon/>, name: 'Выйти', rout: '/' },
];

interface IListMenu {
    handleDrawerClose(): void;
}

const ListMenu: React.FC<IListMenu> = (props) => {
    const classes = useStyles();

    return (
        <List>
            {menuList.map((item, index) => {
                if (item === 'divider') {
                    return <Divider key={item + index} />
                } else {
                    return (
                        <ListItem
                            key={item.name}
                            onClick={props.handleDrawerClose}
                        >
                            <Link to={item.rout} className={classes.link}>
                                <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
                                <ListItemText className={classes.text} primary={item.name} />
                            </Link>
                        </ListItem>
                    )
                }
            })}
        </List>
    );
};

export default ListMenu;