import {CityTableType} from "./component/Tabs/CitiesTab";
import {ClientTableType} from "./component/Tabs/ClientsTab";
import {MasterTableType} from "./component/Tabs/MastersTab";
import {IRegistrationMaster} from "./component/DataPanel/MasterDataPanel";


export interface IUser {
    id: number
    status: TUserStatus
    name: string
    login: string
    token: string
    tokenTime: number
}

export interface ICity {
    id?: number,
    name: string
}

export interface IMaster {
    id: number,
    name: string,
    rating: number,
    cityId: number,
    login?: string,
    review: TReview,
}

export interface IClient {
    id?: number,
    name: string,
    login: string,
}

export type OrderClientType = {
    id: number,
    name: string,
    login: string,
}

export type OrderMasterType = {
    id: number,
    name: string,
    cityId: number,
}

export type OrderCityType = {
    id: number,
    name: string,
}

export interface IOrder {
    id: number,
    date: string,
    time: string,
    hours: number,
    photoURL: string,
    count: number,
    client: string,
    order_user: OrderClientType,
    order_master: OrderMasterType,
    order_city: OrderCityType,
}

export interface IOrderById {
    id: number,
    date: string,
    time: string,
    hours: number,
    photoURL: string,
    cost: number,
    costStatus: number,
    order_user: {
        name: string
    },
    order_master: {
        name: string
    },
    order_city: {
        name: string
    },
}

export interface IOrderPac {
    count: number,
    rows: IOrder[] | [],
}

export interface ISendOrder {
    size: string,
    date: string,
    time: string,
    cityId: number,
    masterId: number,
    clientName: string,
    clientEmail: string,
    photoURL: string,
    cost: number,
    costStatus: number,
}

export interface IClientOrder {
    id: number,
    date: string,
    time: string,
    hours: number,
    photoURL: string,
    cost: number,
    costStatus: number,
    order_city: {name: string},
    order_master: {name: string},
    review:{
        review: string,
        rating: number,
    }
}

export interface IAuthUser {
    login: string,
    password: string,
}

export interface IRegUser extends IAuthUser{
    name: string
    status: TUserStatus
}
export interface IRegistrationUser extends IRegUser{
    password2: string
}

export interface IChangeRegUser extends IAuthUser{
    id: number
    name: string
}

export interface IMastersTab {
    masters: IMaster[],
    cities: ICity[],

    fetchMasters: () => void,
    fetchFilterMasters: (name: string) => void,
    addMaster: (master: IRegistrationMaster) => void,
    editMaster: (master: IRegistrationMaster) => void,
    deleteMaster: (id: number) => void,
    addMasterMessage: (massage: string) => void,
    massage: string,
}

export interface ICitiesTab {
    cities: ICity[],

    fetchCities: () => void,
    deleteCity: (id: number) => void,
    addCity: (city: ICity) => void,
    editCity: (city: ICity) => void,
}

export interface IClientsTab {
    clients: IClient[],

    fetchClients: () => void,
    fetchFilterClients: (name: string) => void,
    deleteClient: (id: number) => void,
    addClient: (client: IClient) => void,
    editClient: (client: IClient) => void,
}

export interface IOrdersTab {
    orders: {
        count: number,
        rows: IOrder[],
    },
    ordersInfinite: {
        count: number,
        rows: IOrder[],
    },

    clearInfiniteOrders: () => void,
    deleteOrder: (id: number) => void,
    fetchFilterAndPaginOrders: (param: IFetchFilterOrders) => number,
    fetchFilterAndInfiniteOrders: (param: IFetchFilterOrders) => void,
}

export interface ITable {
    listArr: CityTableType[] | ClientTableType[] | MasterTableType[],

    clickEdit: (id: number) => void,
    clickDel: (id: number) => void,
}

export interface IFetchFilterOrders {
    word: string,
    limit: number,
    offset: number,
    sortBy: string,
    sort: string,
}

export interface IFilterData {
    name: string
}

export interface IMasterOrder {
    id: number
    date: string
    hours: number
    orderStatus: TOrderStatus
    order_user: {
        name: string
        login: string
    }
    photoURL: string
    time: string
}

export interface IOrderPayStatus {
    orderId: number
    payStatus: number
}

export interface IOrderUserStatus {
    orderId: number
    status: TOrderStatus
}

export interface ISendMasterReview {
    orderId: number
    rating: number
    review: string
}

export interface IIdToken {
    idToken: string
}

export interface IAccessToken {
    accessToken: string
}

export type ISortDirection = 'asc' | 'desc';
export type TBookingShow = 'filling' | 'select' | 'gratitude';
export type TUserStatus = 'client' | 'admin' | 'master' | 'notAuth';
export type TOrderStatus = 'queue' | 'inwork' | 'completed'
export type TReview = string[] | [];
export type TMashId = { match: {params: { id: number }}}