export interface ICity {
    id: number,
    name: string
}

export interface IMaster {
    id: number,
    name: string,
    rating: number,
    cityId: number
}

export interface IAuthUser {
    login: string,
    password: string,
}