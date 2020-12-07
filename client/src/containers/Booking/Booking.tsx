import React, { useState, useEffect } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { emptyBooking, findMaster, sendOrder } from '../../store/actions/bookingAction';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import NotMasters from '../../component/notMasters';
import BookingGratitude from '../../component/BookingGratitude';
import BookingSelectMaster from '../../component/BookingSelectMaster';
import BookingFillingFields from '../../component/BookingFillingFields';
import { today } from '../../helpers/dateTime';
import { ISendOrder } from "../../interfaces";
import {RootStateType} from "../../store/reducers/rootReducer";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
}));

const Booking: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();
    const [isOrderSend, setIsOrderSend] = useState<boolean>(false);
    const [order, setOrder] = useState<ISendOrder>({
        size: '1',
        date: today(),
        time: '10:00',
        cityId: 0,
        masterId: 0,
        clientName: '',
        clientEmail: '',
        photoURL: '',
    });

    /* eslint-disable */
    useEffect(() => {
        if (props.bookingShow === 'filling' && isOrderSend) {
            if (isOrderSend) {
                setOrder({
                    size: '1',
                    date: today(),
                    time: '10:00',
                    cityId: 0,
                    masterId: 0,
                    clientName: '',
                    clientEmail: '',
                    photoURL: '',
                });
                setIsOrderSend(false);
            }
        } else {
            if (props.bookingShow === 'filling') {
                setOrder({
                    ...order,
                    size: '1',
                    date: today(),
                    time: '10:00',
                    cityId: 0,
                    masterId: 0,
                    photoURL: '',
                });
            }
        }
    }, [props.bookingShow, isOrderSend]);
    /* eslint-enable */

    const changeName = (name: string) => setOrder({...order, clientName: name});
    const changeEmail = (email: string) => setOrder({...order, clientEmail: email});

    const handleSizeChange = (event: React.ChangeEvent<{ value: string; }>) => setOrder({
                                                                ...order, size: event.target.value });
    const handleSelectDate = (event: React.ChangeEvent<{ value: string; }>) => setOrder({
                                                                ...order, date: event.target.value });
    const handleSelectTime = (event: React.ChangeEvent<{ value: string; }>) => setOrder({
                                                                ...order, time: event.target.value });
    const handleSelectCity = (id: number) => setOrder({ ...order, cityId: id });
    const handlePhotoURL = (url: string) => setOrder({...order, photoURL: url});

    const handleSelectMaster = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        event.preventDefault();
        setOrder({...order, masterId: +value})
    };

    const handleSendOrder = () => {
        props.sendOrder(order);
        setIsOrderSend(true);
    };

    const handleCancelBtn = (event: React.MouseEvent) => {
        event.preventDefault();
        props.emptyBooking();
    };

    const getMasterName = (masterId: number) => {
        for(let master of props.proposal) {
            if (master.id === masterId) return master.name;
        }
        return 'null';
    };

    const showStage = () => {
        switch (props.bookingShow) {
            case 'select':
                if (props.proposal.length) {
                    return (
                        <BookingSelectMaster
                            arrMasters={props.proposal}
                            handleSelectMaster={handleSelectMaster}
                            handleCancelBtn={handleCancelBtn}
                            handleSendOrder={handleSendOrder}
                            masterId={order.masterId}
                        />
                    );
                } else {
                    return (
                        <NotMasters
                            handleCancelBtn={handleCancelBtn}
                        />
                    )
                }
            case 'gratitude':
                return (
                    <BookingGratitude
                        masterName={getMasterName(order.masterId)}
                        date={order.date}
                        time={order.time}
                        size={order.size}
                        email={order.clientEmail}
                    />
                );
            default: // 'filling'
                return (
                    <BookingFillingFields
                        changeName={changeName}
                        changeEmail={changeEmail}
                        name={order.clientName}
                        email={order.clientEmail}

                        handleSizeChange={handleSizeChange}
                        handleSelectCity={handleSelectCity}
                        handleSelectDate={handleSelectDate}
                        handleSelectTime={handleSelectTime}
                        handlePhotoURL={handlePhotoURL}
                        size={+order.size}
                        date={order.date}
                        time={order.time}
                        photoURL={order.photoURL}
                        cityId={order.cityId}

                        findMaster={props.findMaster}

                        cities={props.cities}
                    />
                );
        }
    };

    return (
        <Container className={classes.main} component="main" maxWidth="xs">
            {showStage()}
        </Container>
    );
};

const mapStateToProps = (state:RootStateType) => {
    return {
        cities: state.admin.cities,
        bookingShow: state.booking.bookingShow,
        proposal: state.booking.proposal,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        findMaster: (cityId: number, date: string, time: string, size: number) => dispatch(findMaster(cityId, date, time, size)),
        sendOrder: (order: ISendOrder)  => dispatch(sendOrder(order)),
        emptyBooking: () => dispatch(emptyBooking()),
    }
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Booking);

type PropsFromRedux = ConnectedProps<typeof connector>