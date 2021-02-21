import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Booking from './containers/Booking/Booking';
import { connect, ConnectedProps } from 'react-redux';
import classes from './App.module.css';
import { fetchCities } from './store/actions/cityAction';
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
import { setOpenMenu } from "./store/actions/appAction";
import Masters from "./component/DashBoard/Masters";
import Cities from "./component/DashBoard/Cities";
import Clients from "./component/DashBoard/Clients";
import Orders from "./component/DashBoard/Orders";
import MasterCabinet from "./containers/MasterCabinet/MasterCabinet";
import Blog from "./containers/Blog/Blog";
import BlogAdmin from "./containers/Blog/BlogAdmin";
import FacebookLogIn from './component/GoogleFacebookAuth/FacebookLogIn';

class App extends Component<PropsFromRedux & MapStateType & MapDispatchType> {

    componentDidMount() {
        this.props.fetchCities();
        this.userFromLocalStorage();
    }

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
                        <Route path='/admin' component={ AdminDashboard } />
                        <Route path='/blog' component={ Blog } />
                        <Route path='/dashboard' exact={true} component={ AdminDashboard } />
                        <Route path='/dashboard/masters' component={ Masters } />
                        <Route path='/dashboard/cities' component={ Cities } />
                        <Route path='/dashboard/clients' component={ Clients } />
                        <Route path='/dashboard/orders' component={ Orders } />
                        <Route path='/dashboard/blog' component={ BlogAdmin } />
                        <Route path='/client' component={ ClientCabinet } />
                        <Route path='/review/:id' component={ Review } />
                        <Route path='/master/:id' component={ ReviewMaster } />
                        <Route path='/cabinet' component={ MasterCabinet } />
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
}
function mapStateToProps(state: RootStateType): MapStateType {
    return {
        hasError: state.admin.hasError,
        userStatus: state.auth.user.status,
        user: state.auth.user,
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