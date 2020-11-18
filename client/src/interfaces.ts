export interface ICity {
    id?: number,
    name: string
}

export interface IMaster {
    id?: number,
    name: string,
    rating?: number,
    cityId: number,
    review?: string[],
}

export interface IAuthUser {
    login: string,
    password: string,
}

export interface IClient {
    name: string,
    email: string,
}