import React, { useEffect, useState } from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Drawer from "@material-ui/core/Drawer";
import ListMenu from "./ListMenu/ListMenu";
import DatePickers from "../../component/DateTimePickers/DatePickers";
import ChartNumberOrders from "../../component/DashBoard/ChartNumberOrders";
import OrderChartByCity from "../../component/DashBoard/OrderChartByCity";
import OrderChartByMaster from "../../component/DashBoard/OrderChartByMaster";
import { dayToString, todayPlus } from "../../helpers/dateTime";
import { RootStateType } from "../../store/reducers/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { setOpenMenu } from "../../store/actions/appAction";
import { ChartDataType, getAuthServerRequest } from "../../helpers/axios/axiosClockwareAPI";
import {ICity, TOrderStatus} from "../../interfaces";
import AdminMastersTables from "../../component/AdminMastersTables/AdminMastersTables";
import CityMasterSelects from "../../component/DashBoard/CityMasterSelects";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    twoBlocks: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: theme.spacing(2),
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
    },
    root: {
        width: '100%',
        marginTop: 5,
        height: 10,
    },
}));

interface IMaster{
    id: number
    name: string
    cityId: number
}
export interface CityMasterType extends ICity { users: IMaster[] }
export interface CityForListType extends ICity { active: boolean }
export interface MasterForListType extends IMaster { active: boolean }
export interface IChartDateOrder {
    date: string
    count: number
}
export interface IChartList {
    name: string
    count: number
}
export interface IMasterTablesData {
    id: number
    name: string
    s1?: number
    s2?: number
    s3?: number
    rating: number
    status: string
}

const AdminDashboard: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();
    const [dataRange, setDateRange] = useState({
        rangeStart: todayPlus(-1),
        rangeEnd: todayPlus(1),
    });

    const [cityList, setCityList] = useState<CityForListType[]>([]);
    const [masterList, setMasterList] = useState<MasterForListType[]>([]);
    const [chartDateOrderList, setChartDateOrderList] = useState<IChartDateOrder[]>([]);
    const [chartCityList, setChartCityList] = useState<IChartList[]>([]);
    const [chartMasterList, setChartMasterList] = useState<IChartList[]>([]);
    const [masterTablesData, setMasterTablesData] = useState<IMasterTablesData[]>([]);
    const [load, setLoad] = useState<number>(0);

    useEffect(() => {
        setLoad(prev => prev + 1);
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
                        if (city.users[0]) {
                            city.users.forEach((master) => {
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
            .then(() => setLoad(prev => prev ? prev - 1 : 0))
    },[]);

    useEffect(() => {
        setLoad(prev => prev + 1);
        const cityJSON = JSON.stringify(cityList.filter((city) =>
                                                    city.active).map((city) => city.id));
        const masterJSON = JSON.stringify(masterList.filter((master) =>
                                                    master.active).map((master) => master.id));
        const URL = `/adm/filter?start=${dataRange.rangeStart}&end=${dataRange.rangeEnd}&cities=${cityJSON}&masters=${masterJSON}`;

        getAuthServerRequest(URL)
            .then(response =>{
                const listDateOrder: IChartDateOrder[] = (response as ChartDataType).listDateOrder;
                setChartDateOrderList(listDateOrder.map((item) => {
                    return {
                        date: dayToString(item.date),
                        count: item.count,
                    }
                }));

                const listCityCount = (response as ChartDataType).listCityCount;
                setChartCityList(listCityCount.map(item => {
                    return {
                        name: item.order_city.name,
                        count: item.count,
                    }
                }));

                const listMasterCount = (response as ChartDataType).listMasterCount;
                setChartMasterList(listMasterCount.map(item => {
                    return {
                        name: item.order_master.name,
                        count: item.count,
                    }
                }));

                const masterTablesList = (response as ChartDataType).listMastersTablesData;
                setMasterTablesData(masterTablesList.map(master => {
                    const sizeSet = master.master_orders.reduce((acc, item) => {
                        acc['s' + item.hours] = item.count;
                        return acc;
                    }, {});

                    return {
                        id: master.id,
                        name: master.name,
                        ...sizeSet,
                        rating: master.rating,
                        status: statusArrToString(master.status),
                    }
                }));
            })
            .then(() => setLoad(prev => prev ? prev - 1 : 0))
    }, [cityList, masterList, dataRange]);

    const handleDrawerClose = () => props.setMenuOpen(false);

    const handleDateRangeStart = (event: React.ChangeEvent<{ value: string; }>) => {
        event.preventDefault();
        setDateRange({...dataRange, rangeStart: event.target.value})
    };

    const handleDateRangeEnd = (event: React.ChangeEvent<{ value: string; }>) => {
        event.preventDefault();
        setDateRange({...dataRange, rangeEnd: event.target.value})
    };

    const checkCityList = (list: CityForListType[]) => setCityList(list);
    const checkMasterList = (list: MasterForListType[]) => setMasterList(list);

    const cityActiveById =(id: number) => cityList[cityList.findIndex((city) => city.id === id)].active;

    const masterListFromActiveCity = () => {
        return masterList.filter((master) => cityActiveById(master.cityId))
    };

    return (
        <div className={classes.paper}>
            <div className={classes.root}>
                {load > 0 ? <LinearProgress /> : null}
            </div>
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
            <CityMasterSelects
                cityList={cityList}
                cities={cityList.filter(city => city.active).map(city => city.name)}
                masterList={masterListFromActiveCity()}
                masters={masterListFromActiveCity().filter(city => city.active).map(city => city.name)}
                checkCityList={checkCityList}
                checkMasterList={checkMasterList}
            />

            <div className={classes.chartOrder}>
                <ChartNumberOrders
                    listData={chartDateOrderList}
                />
            </div>

            <div className={classes.chartBlock}>
                <div className={classes.chart}>
                    <OrderChartByCity listData={chartCityList}/>
                </div>
                <div className={classes.chart}>
                    <OrderChartByMaster listData={chartMasterList}/>
                </div>
            </div>

            <AdminMastersTables
                data={masterTablesData}
            />

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


const statusArrToString = (list: {orderStatus: TOrderStatus, count: number}[]): string => {
    let finished = 0, unfinished = 0;
    list.forEach(item => {
        if (item.orderStatus === 'completed') finished = item.count;
        if (item.orderStatus === 'inwork') unfinished += item.count;
        if (item.orderStatus === 'queue') unfinished += item.count;
    });
    return `${finished} / ${unfinished}`
};