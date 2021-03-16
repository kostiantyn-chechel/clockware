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

export interface IOrderForCalendar {
    id: number
    date: string
    time: string
    hours: number
    photoURL: string
    order_city: {
        name: string
    }
    order_master: {
        name: string
        colorId: string
    },
    order_user: {
        name: string
    }
}

export interface IEventForCalendar {
    summary: string  // Title of the event.
    colorId: string // https://developers.google.com/calendar/v3/reference/colors
    location: string
    description: string //HTML
    start: {
        dateTime: string
        timeZone: string
    },
    end: {
        dateTime: string
        timeZone: string
    }
}
