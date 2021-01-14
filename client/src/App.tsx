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
import { resetUser, setAuthUser, setUserStatus } from './store/actions/authAction';
import SomeError from './component/SomeError';
import Review from './containers/Review/Review';
import ReviewMaster from './containers/Review/ReviewMaster';
import { RootStateType } from "./store/reducers/rootReducer";
import ClientCabinet from "./containers/ClientCabinet/ClientCabinet";
import AuthCommon from "./containers/AuthRegistration/AuthCommon";
import Registration from "./containers/AuthRegistration/Registration";
import { IUser, TUserStatus } from "./interfaces";
import { logout, validToken } from "./helpers/authProcessing";
import AdminDashboard from "./containers/Admin/AdminDashboard";
import {setOpenMenu} from "./store/actions/appAction";

class App extends Component<PropsFromRedux & MapStateType & MapDispatchType> {

    componentDidMount() {
        this.props.fetchCities();
        this.userFromLocalStorage();
    }

    statusFromLocalStorage = () => {
        if (validToken()) {
            const status: string | null = localStorage.getItem('userStatus');
            if (status) {
                this.props.setUserStatus(status as TUserStatus)
            } else {
                this.props.setUserStatus('notAuth')
            }

        }
    };
     userFromLocalStorage = () => {
         const userFromStorage = localStorage.getItem('user');
         if (userFromStorage) {
             if (validToken()) {
                 const user: IUser = JSON.parse(userFromStorage);
                 this.props.setAuthUser(user);
                 this.props.setUserStatus(user.status);
             } else {
                 logout();
                 this.props.setUserStatus('notAuth')
             }
         } else {
             this.props.setUserStatus('notAuth')
         }

     };

    render() {
        return (
            <div className={classes.root}>
                <Header
                    emptyBooking={this.props.emptyBooking}
                    userStatus={this.props.userStatus}
                    resetUser={this.props.resetUser}
                    user={this.props.user}
                    setMenuOpen={this.props.setOpenMenu}
                />
                {this.props.hasError
                    ?
                    <SomeError/>
                    :
                    <Switch>
                        <Route path='/auth' component={ AuthCommon } />
                        <Route path='/reg' component={ Registration } />
                        <Route path='/admin' component={ Admin } />
                        <Route path='/dashboard' component={ AdminDashboard } />
                        <Route path='/client' component={ ClientCabinet } />
                        <Route path='/review/:id' component={ Review } />
                        <Route path='/master/:id' component={ ReviewMaster } />
                        <Route path='/' exact={true} component={ Booking } />
                        <Route path='/*' component={ Booking } />
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
    user: IUser
    openMenu: boolean
}
function mapStateToProps(state: RootStateType): MapStateType {
    return {
        hasError: state.admin.hasError,
        userStatus: state.auth.user.status,
        user: state.auth.user,
        openMenu: state.app.openMenu,
    }
}

type MapDispatchType = {
    fetchCities: () => void,
    emptyBooking: () => void,
    resetUser: () => void,
    setUserStatus: (status: TUserStatus) => void,
    setAuthUser: (user: IUser) => void,
    setOpenMenu: (open: boolean) => void,
}
function mapDispatchToProps(dispatch: any): MapDispatchType {
    return {
        fetchCities: () => dispatch(fetchCities()),
        emptyBooking: () => dispatch(setBookingShow("filling")),
        resetUser: () => dispatch(resetUser()),
        setUserStatus: (status: TUserStatus) => dispatch(setUserStatus(status)),
        setAuthUser: (user: IUser) => dispatch(setAuthUser(user)),
        setOpenMenu: (open: boolean) => dispatch(setOpenMenu(open)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);

type PropsFromRedux = ConnectedProps<typeof connector>