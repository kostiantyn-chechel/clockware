import React from 'react';
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
// import GroupTwoToneIcon from "@material-ui/icons/GroupTwoTone";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import GroupTwoToneIcon from "@material-ui/icons/GroupTwoTone";
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import {Link} from "react-router-dom";

const divider = 'divider';

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

    return (
        <List>
            {menuList.map((item, index) => {
                if (item === 'divider') {
                    return <Divider key={item + index} />
                } else {
                    return (
                        <ListItem key={item.name} onClick={props.handleDrawerClose}>
                            <Link to={item.rout}>
                                <ListItemIcon >{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name}/>
                            </Link>

                        </ListItem>
                    )
                }
            })}
        </List>
    );
};

export default ListMenu;