export type TSortIn = 'asc' | 'desc'
export type TSortOut = 'ASC' | 'DESC'
export type TSortBy = 'date' | 'time' | 'hours' | 'photo' | 'client' | 'master' | 'city' | 'id'| null
export type TUserStatus = 'client' | 'admin' | 'notAuth'

export interface IError {
    status?: number,
    message: string,
}

export interface IUser {
    id: number
    status: TUserStatus
    name: string
    login: string
    token: string
}

export interface IUserReg {
    id?: number
    login: string
    password: string
    salt: string
    status: TUserStatus
    name: string
    clientId?: number
}

export interface IUserChangeReg {
    login?: string
    name?: string
    password?: string
    salt?: string
}