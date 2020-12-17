import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Booking from './containers/Booking/Booking';
import Admin from './containers/Admin/Admin';
import { connect, ConnectedProps } from 'react-redux';
import classes from './App.module.css';
import { fetchCities } from './store/actions/adminAction';
import Header from './component/Header';
import Footer from './component/Footer';
import { setBookingShow } from './store/actions/bookingAction';
import {resetUser, setIsToken} from './store/actions/authAction';
import SomeError from './component/SomeError';
import Review from './containers/Review/Review';
import ReviewMaster from './containers/Review/ReviewMaster';
import { RootStateType } from "./store/reducers/rootReducer";
import ClientCabinet from "./containers/ClientCabinet/ClientCabinet";
// import AuthGeneral from "./component/Auth/AuthGeneral";
import AuthCommon from "./containers/AuthRegistration/AuthCommon";
import Registration from "./containers/AuthRegistration/Registration";
import { TUserStatus } from "./interfaces";

interface PropsType extends PropsFromRedux {}

class App extends Component<PropsType> {

    componentDidMount() {
        this.props.fetchCities();
    }

    render() {
        return (
            <div className={classes.root}>
                <Header
                    emptyBooking={this.props.emptyBooking}
                    setIsToken={this.props.setIsToken}
                    userStatus={this.props.userStatus}
                    resetUser={this.props.resetUser}
                />
                {this.props.hasError
                    ?
                    <SomeError/>
                    :
                    <Switch>
                        <Route path='/auth' component={ AuthCommon } />
                        <Route path='/reg' component={ Registration } />
                        <Route path='/admin' component={ Admin } />
                        <Route path='/client' component={ ClientCabinet } />
                        <Route path='/review/:id' component={ Review } />
                        <Route path='/master/:id' component={ ReviewMaster } />
                        <Route path='/' exact={true} component={ Booking } />
                        {/*<Route path='/*' component={ AuthCommon } />*/}
                    </Switch>
                }
                <Footer/>
            </div>
        )
    }
}

type MapStateType = {
    hasError: boolean
    userStatus: TUserStatus
}
function mapStateToProps(state: RootStateType): MapStateType {
    return {
        hasError: state.admin.hasError,
        userStatus: state.auth.user.status,
    }
}

type MapDispatchType = {
    fetchCities: () => void,
    emptyBooking: () => void,
    setIsToken: (status: boolean) => void,
    resetUser: ()=> void,
}
function mapDispatchToProps(dispatch: any): MapDispatchType {
    return {
        fetchCities: () => dispatch(fetchCities()),
        emptyBooking: () => dispatch(setBookingShow("filling")),
        setIsToken: (status: boolean) => dispatch(setIsToken(status)),
        resetUser: () => dispatch(resetUser()),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);

type PropsFromRedux = ConnectedProps<typeof connector>