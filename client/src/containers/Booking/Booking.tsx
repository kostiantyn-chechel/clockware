import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { findMaster, sendOrder, setBookingShow } from '../../store/actions/bookingAction';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import NotMasters from '../../component/notMasters';
import BookingGratitude from '../../component/Booking/BookingGratitude';
import BookingSelectMaster from '../../component/Booking/BookingSelectMaster';
import BookingFillingFields from '../../component/Booking/BookingFillingFields';
import { nowTimeString, today } from '../../helpers/dateTime';
import { ISendOrder } from "../../interfaces";
import { RootStateType } from "../../store/reducers/rootReducer";

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

    const EMPTY_ORDER ={
        size: '1',
        date: today(),
        time: nowTimeString(),
        cityId: 0,
        masterId: 0,
        clientName: props.userName,
        clientEmail: props.userEmail,
        photoURL: '',
        cost: 10,
        costStatus: 0,
    };

    const [isOrderSend, setIsOrderSend] = useState<boolean>(false);
    const [order, setOrder] = useState<ISendOrder>(EMPTY_ORDER);

    /* eslint-disable */
    useEffect(() => {
        if (props.bookingShow === 'filling' && isOrderSend) {
            if (isOrderSend) {
                setOrder(EMPTY_ORDER);
                setIsOrderSend(false);
            }
        } else {
            if (props.bookingShow === 'filling') {
                setOrder({
                    ...order,
                    size: '1',
                    date: today(),
                    time: nowTimeString(),
                    cityId: 0,
                    masterId: 0,
                    photoURL: '',
                    cost: 10,
                });
            }
        }
    }, [props.bookingShow, isOrderSend]);
    /* eslint-enable */

    const changeName = (name: string) => setOrder({...order, clientName: name});
    const changeEmail = (email: string) => setOrder({...order, clientEmail: email});

    const handleSizeChange = (event: React.ChangeEvent<{ value: string; }>) => {

        const cost: number = 10 * (+ event.target.value as number);
        setOrder({
            ...order,
            size: event.target.value,
            cost: cost,
        })};
    const handleSelectDate = (date: string) => setOrder(prevState => ({ ...prevState, date: date }));
    const handleSelectTime = (time: string) => setOrder(prevState => ({...prevState, time}));
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
        userName: state.auth.user.name,
        userEmail: state.auth.user.login,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        findMaster: (cityId: number, date: string, time: string, size: number) => dispatch(findMaster(cityId, date, time, size)),
        sendOrder: (order: ISendOrder)  => dispatch(sendOrder(order)),
        emptyBooking: () => dispatch(setBookingShow("filling")),
    }
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Booking);

type PropsFromRedux = ConnectedProps<typeof connector>