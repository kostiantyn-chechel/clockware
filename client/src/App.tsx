import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Booking from './containers/Booking/Booking';
import Admin from './containers/Admin/Admin';
import { connect, ConnectedProps } from 'react-redux';
import classes from './App.module.css';
import { fetchCities } from './store/actions/adminAction';
import Header from './component/Header';
import Footer from './component/Footer';
import { emptyBooking } from './store/actions/bookingAction';
import { setIsToken } from './store/actions/authAction';
import SomeError from './component/SomeError';
import Review from './containers/Review/Review';
import ReviewMaster from './containers/Review/ReviewMaster';
import { RootStateType } from "./store/reducers/rootReducer";

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
                />
                {this.props.hasError
                    ?
                    <SomeError/>
                    :
                    <Switch>
                        <Route path='/admin' component={Admin} />
                        <Route path='/review/:id' component={Review} />
                        <Route path='/master/:id' component={ReviewMaster} />
                        <Route path='/' exact={true} component={Booking} />
                    </Switch>
                }
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state: RootStateType) {
    return {
        hasError: state.admin.hasError,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        fetchCities: () => dispatch(fetchCities()),
        emptyBooking: () => dispatch(emptyBooking()),
        setIsToken: (status: boolean) => dispatch(setIsToken(status)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);

type PropsFromRedux = ConnectedProps<typeof connector>