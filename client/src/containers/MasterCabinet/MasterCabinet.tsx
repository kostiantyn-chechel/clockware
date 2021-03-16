import React, { useEffect, useState } from 'react';
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { isTokenValid, logoutLocal } from "../../helpers/authProcessing";
import { useHistory } from "react-router-dom";
import { getMasterOrders, putMasterOrderStatus } from "../../store/actions/masterAction";
import MasterOrdersTable from "../../component/MasterCabinet/MasterOrdersTable";
import Backdrop from "@material-ui/core/Backdrop";
import { TOrderStatus } from "../../interfaces";
import IStore from "../../type/store/IStore";
import TodayIcon from '@material-ui/icons/Today';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    orders: {
        width: '100%',
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    text: {
        marginTop: theme.spacing(3),
    },
    img: {
        maxWidth: '80%',
        maxHeight: '80%',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const calendarURL = `https://calendar.google.com/calendar/?sid=${process.env.REACT_APP_CALENDAR_URL}`;

const MasterCabinet: React.FC = (props) => {
    const { push } = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const token = useSelector(({auth}: IStore) => auth.user.token);
    const tokenTime = useSelector(({auth}: IStore) => auth.user.tokenTime);
    const id = useSelector(({auth}: IStore) => auth.user.id);
    const name = useSelector(({auth}: IStore) => auth.user.name);
    const login = useSelector(({auth}: IStore) => auth.user.login);
    const userStatus = useSelector(({auth}: IStore) => auth.user.status);
    const orders = useSelector(({master}: IStore) => master.orders);

    /* eslint-disable */
    useEffect(() => {
        setTimeout(() => { dispatch(getMasterOrders(id)) }, 50); //todo !!!
    },[id]);
    /* eslint-enable */

    const [urlPhoto, setUrlPhoto] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setUrlPhoto('');
        setOpen(false);
    };
    const handleToggle = (url: string): void => {
        setUrlPhoto(url);
        setOpen(!open);
    };

    const handleStatus = (orderId: number, status: TOrderStatus) => dispatch(putMasterOrderStatus(orderId, status, id));

    const renderMasterCabinet = () => {
        if (isTokenValid(token, tokenTime) && userStatus === 'master') {
            return (
                <Container component="main" maxWidth="xl">
                    <div className={classes.orders}>
                        <div className={classes.title}>
                            <h1>{`(${id}): ${name} (${login}) `}</h1>
                            <Button
                                className={classes.button}
                                color='primary'
                                variant='contained'
                                href={calendarURL!}
                                startIcon={<TodayIcon/>}
                                target='_blank'
                            >
                                Календарь
                            </Button>
                        </div>


                        <MasterOrdersTable
                            orders={orders}
                            handleToggle={handleToggle}
                            handleStatus={handleStatus}
                        />
                    </div>
                </Container>
            )
        } else {
            logoutLocal();
            push('/auth');
            return null
        }
    };

    return (
        <React.Fragment>
            {renderMasterCabinet()}
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                {/* eslint-disable */}
                <img src={urlPhoto} className={classes.img}/>
                {/* eslint-enable */}
            </Backdrop>
        </React.Fragment>
    );
};

export default MasterCabinet;