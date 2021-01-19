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
import {getAuthServerRequest} from "../../helpers/axios/axiosClockwareAPI";
import {ICity} from "../../interfaces";
import CityMasterCheckbox from "../../component/DashBoard/CityMasterCheckbox";

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
        width: '80%',
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

interface IMaster{
    id: number
    name: string
    cityId: number
}
export interface CityMasterType extends ICity { masters: IMaster[] }
export interface CityForListType extends ICity { active: boolean }
export interface MasterForListType extends IMaster { active: boolean }

const AdminDashboard: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();
    const [dataRange, setDateRange] = useState({
        rangeStart: todayPlus(-1),
        rangeEnd: todayPlus(1),
    });

    const [cityList, setCityList] = useState<CityForListType[]>([]);
    const [masterList, setMasterList] = useState<MasterForListType[]>([]);

    useEffect(() => {
        const cities: CityForListType[] = [];
        const masters: MasterForListType[] = [];
        getAuthServerRequest('/adm')
            .then(response => {
                if (response[0]) {
                    (response as CityMasterType[]).forEach((city) => {
                         cities.push({
                                     id: city.id,
                                     name: city.name,
                                     active: true,
                                });
                        if (city.masters[0]) {
                            city.masters.forEach((master) => {
                                masters.push({
                                    id: master.id,
                                    name: master.name,
                                    cityId: master.cityId,
                                    active: true,
                                })
                            })
                        }
                    });
                    setCityList(cities);
                    setMasterList(masters);
                }
            })
    },[]);

    useEffect(() => {
        console.log('city base:', cityList);
        // console.log('master',masterList);
    }, [cityList, masterList]);

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

    const checkCity = (id: number) => {
        const indexChange = cityList.findIndex((city) => city.id === id);
        const cityChange = cityList[indexChange];
        cityChange.active = !cityChange.active;
        setCityList(cityList.map((city) => city.id === id ? cityChange : city));
    };

    const checkMaster = (id: number) => {
        const indexChange = masterList.findIndex((master) => master.id === id);
        const masterChange = masterList[indexChange];
        masterChange.active = !masterChange.active;
        setMasterList(masterList.map((master) => master.id === id ? masterChange : master));
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

            <CityMasterCheckbox
                cityList={cityList}
                masterList={masterList}
                checkCity={checkCity}
                checkMaster={checkMaster}
            />

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