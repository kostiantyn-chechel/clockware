export interface ICity {
    id?: number,
    name: string
}

export interface IMaster {
    id: number,
    name: string,
    rating: number,
    cityId: number,
    review: string[],
}

export interface IClient {
    id?: number,
    name: string,
    email: string,
}

export type OrderClientType = {
    id: number,
    name: string,
    email: string,
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
    order_client: OrderClientType,
    order_master: OrderMasterType,
    order_city: OrderCityType,
}

export interface IAuthUser {
    login: string,
    password: string,
}

export interface IMastersTab {
    masters: IMaster[],
    cities: ICity[],
    fetchMasters(): void,
    addMaster(master: IMaster): void,
    editMaster(master: IMaster): void,
    deleteMaster(id: number): void,
}

export interface ICitiesTab {
    cities: ICity[],
    fetchCities(): void,
    deleteCity(id: number): void,
    addCity(city: ICity): void,
    editCity(city: ICity): void,
}

export interface IClientsTab {
    clients: IClient[],
    fetchClients(): void,
    deleteClient(id: number): void,
    addClient(client: IClient): void,
    editClient(client: IClient): void,
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
    clearInfiniteOrders(): void,
    deleteOrder(id: number): void,
    fetchFilterAndPaginOrders(param: IFetchFilterAndPaginOrders): number,
    fetchFilterAndInfiniteOrders(param: IFetchFilterAndPaginOrders): void,
}

export interface ITable {
    listArr: any[],
    clickEdit(id: number): void,
    clickDel(id: number): void,
}

export  interface IFetchFilterAndPaginOrders {
    word: string,
    limit: number,
    offset: number,
    sortBy: string,
    sort: string,
}

export type ISortDirection = 'asc' | 'desc';