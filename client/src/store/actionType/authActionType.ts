import {IUser, TUserStatus} from "../../interfaces";

export const AUTH_USER_MESSAGE = 'AUTH_USER_MESSAGE';
export const SET_USER_STATUS = 'SET_USER_STATUS';
export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';

export type AuthActionTypes =
    { type: typeof AUTH_USER_MESSAGE, payload: string } |
    { type: typeof SET_USER_STATUS, payload: TUserStatus } |
    { type: typeof SET_USER, payload: IUser } |
    { type: typeof RESET_USER }