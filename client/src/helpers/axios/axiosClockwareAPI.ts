import axios from 'axios';
import {IAuthUser, ICity, IMaster, ISendOrder, TAuthUser} from "../../interfaces";

let baseURL;
if (process.env.NODE_ENV === 'development') { baseURL = 'http://localhost:3000'}
else { baseURL = 'https://db-clockware.herokuapp.com'}
axios.defaults.baseURL = baseURL;

type ServerGetResponseType =  IMaster[] | ICity[] | string;
export const getServerRequest = async (relativeURL: string): Promise<ServerGetResponseType> => {
    try {
        const { data } = await axios.get(relativeURL);
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

type ServerPostRequestBodyType = IAuthUser | ISendOrder | {orderId: number, rating: number, review: string};
type ServerPostResponseType = TAuthUser;
export const postServerRequest = async (
                        relativeURL: string, body: ServerPostRequestBodyType): Promise<ServerPostResponseType> => {
    try {
        const { data } = await axios.post(relativeURL, body);
        return data;
    } catch (err) {
        throw new Error(err);
    }
};