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

export interface IOrder {
    id: number,
    date: number,
    time: string,
    hours: number,
    photoURL: string,
    count: number,
    client: string,
    order_client: {},
    order_master: {},
    order_city: {},
}

export interface IAuthUser {
    login: string,
    password: string,
}

export  interface IFetchFilterAndPaginOrders {
    word: string,
    limit: number,
    offset: number,
    sortBy: string,
    sort: string,
}

