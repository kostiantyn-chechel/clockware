export type TSortIn = 'asc' | 'desc'
export type TSortOut = 'ASC' | 'DESC'
export type TSortBy = 'date' | 'time' | 'hours' | 'photo' | 'client' | 'master' | 'city' | 'id'| null
export type TUserStatus = 'client' | 'admin' | 'master' | 'notAuth'
export type TOrderStatus = 'queue' | 'inwork' | 'completed'

export interface IError {
    status?: number,
    message: string,
}

export interface IDBUser {
    id?: number
    status: TUserStatus
    name: string
    login: string
    password?: string
    salt?: string
}

export interface IUserChangeReg {
    login?: string
    name?: string
    password?: string
    salt?: string
}

export interface IMasterToCalendar {
    id: number
    name: string
    rating: number
}

export interface IMasterResToCalendar {
    id: number
    name: string
    reviews: IRating[]
}

export interface IRating {
    rating: number
}