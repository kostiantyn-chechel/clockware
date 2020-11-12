import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { emptyBooking, findMaster, sendOrder } from '../../store/actions/bookingAction';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import NotMasters from '../../component/notMasters';
import BookingGratitude from '../../component/BookingGratitude';
import BookingSelectMaster from '../../component/BookingSelectMaster';
import BookingFillingFields from '../../component/BookingFillingFields';
import {today} from '../../helpers/dateTime';

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
}));

function Booking (props) {
    const classes = useStyles();
    const [isOrderSend, setIsOrderSend] = useState(false);
    const [order, setOrder] = useState({
        size: '1',
        date: today(),
        time: '10:00',
        cityId: null,
        masterId: null,
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
                    cityId: null,
                    masterId: null,
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
                    cityId: null,
                    masterId: null,
                    photoURL: '',
                });
            }
        }
    }, [props.bookingShow, isOrderSend]);
    /* eslint-enable */

    const changeName = name => setOrder({...order, clientName: name});
    const changeEmail = email => setOrder({...order, clientEmail: email});

    const handleSizeChange = event => setOrder({ ...order, size: event.target.value });
    const handleSelectDate = event => setOrder({ ...order, date: event.target.value });
    const handleSelectTime = event => setOrder({ ...order, time: event.target.value });
    const handleSelectCity = id => setOrder({ ...order, cityId: id });
    const handlePhotoURL = url => setOrder({...order, photoURL: url});

    const handleSelectMaster = event => {
        event.preventDefault();
        setOrder({...order, masterId: event.target.value})
    };

    const handleSendOrder = () => {
        props.sendOrder(order);
        setIsOrderSend(true);
    };

    const handleCancelBtn = event => {
        event.preventDefault();
        props.emptyBooking();
    };

    const getMasterName = masterId => {
        for(let master of props.proposal) {
            const id = master.id + '';
            if (id === masterId) {
                return master.name;
            }
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
                        size={order.size}
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
}

function mapStateToProps(state) {
    return {
        cities: state.admin.cities,
        bookingShow: state.booking.bookingShow,
        proposal: state.booking.proposal,
        masterId: state.booking.masterId,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        findMaster: (cityId, date, time, size) => dispatch(findMaster(cityId, date, time, size)),
        sendOrder: order => dispatch(sendOrder(order)),
        emptyBooking: () => dispatch(emptyBooking()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking);