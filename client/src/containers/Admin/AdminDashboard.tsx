import React, {useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Drawer from "@material-ui/core/Drawer";
import ListMenu from "./ListMenu/ListMenu";
import DatePickers from "../../component/DateTimePickers/DatePickers";
import ChartNumberOrders from "../../component/DashBoard/ChartNumberOrders";
import OrderChartByCity from "../../component/DashBoard/OrderChartByCity";
import OrderChartByMaster from "../../component/DashBoard/OrderChartByMaster";
import { todayPlus } from "../../helpers/dateTime";
import { RootStateType } from "../../store/reducers/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { setOpenMenu } from "../../store/actions/appAction";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Checkbox} from "@material-ui/core";
import {getAuthServerRequest} from "../../helpers/axios/axiosClockwareAPI";


const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    twoBlocks: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    chartBlock: {
        width: '80%',
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    chartOrder: {
        width: '80%',
        minWidth: '500px',
        maxWidth: '1000px',
    },
    chart: {
        width: '50%',
        minWidth: '350px',
    }
}));

const AdminDashboard: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();
    const [dataRange, setDateRange] = useState({
        rangeStart: todayPlus(-1),
        rangeEnd: todayPlus(1),
    });

    useEffect(() => {

    },[]);

    useEffect(() => {
        console.log('start:', dataRange.rangeStart, 'end:', dataRange.rangeEnd)

    }, [dataRange]);

    const handleDrawerClose = () => props.setMenuOpen(false);

    const handleDateRangeStart = (event: React.ChangeEvent<{ value: string; }>) => {
        event.preventDefault();
        setDateRange({...dataRange, rangeStart: event.target.value})
    };

    const handleDateRangeEnd = (event: React.ChangeEvent<{ value: string; }>) => {
        event.preventDefault();
        setDateRange({...dataRange, rangeEnd: event.target.value})
    };

    const handleCheckCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name, event.target.checked, event.target.name);
    };

    return (
        <div className={classes.paper}>
            <div className={classes.twoBlocks}>
                <DatePickers
                    onChange={handleDateRangeStart}
                    defaultDate={dataRange.rangeStart}
                />
                <DatePickers
                    onChange={handleDateRangeEnd}
                    defaultDate={dataRange.rangeEnd}
                />
            </div>

            <div className={classes.twoBlocks}>
                <FormControl>
                    <FormLabel component="legend">Города</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked color="primary" name={'city1'} onChange={handleCheckCity}/>}
                            label={'City 01'}
                        />
                        <FormControlLabel
                            control={<Checkbox defaultChecked color="primary" name={'city2'} onChange={handleCheckCity}/>}
                            label={'City 02'}
                        />
                        <FormControlLabel
                            control={<Checkbox defaultChecked color="primary" name={'city3'} onChange={handleCheckCity}/>}
                            label={'City 03'}
                        />
                    </FormGroup>
                </FormControl>

                <FormControl>
                    <FormLabel component="legend">Мастера</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox />}
                            label={'Master 01'}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label={'Master 02'}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label={'Master 03'}
                        />
                    </FormGroup>
                </FormControl>
            </div>

            <div className={classes.chartOrder}>
                <ChartNumberOrders/>
            </div>

            <div className={classes.chartBlock}>
                <div className={classes.chart}>
                    <OrderChartByCity/>
                </div>
                <div className={classes.chart}>
                    <OrderChartByMaster/>
                </div>
            </div>

            <div className={classes.main}>
                <Drawer
                    anchor={"right"}
                    open={props.openMenu}
                    onClose={handleDrawerClose}
                >
                    <ListMenu handleDrawerClose={handleDrawerClose} />
                </Drawer>
            </div>
        </div>
    );
};

function mapStateToProps(state: RootStateType) {
    return {
        openMenu: state.app.openMenu,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setMenuOpen: (open: boolean) => dispatch(setOpenMenu(open)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AdminDashboard);

type PropsFromRedux = ConnectedProps<typeof connector>