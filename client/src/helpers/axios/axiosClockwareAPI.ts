import axios from 'axios';
import {IAuthUser, ICity, IClient, IMaster, IOrderPac, ISendOrder, TAuthUser} from "../../interfaces";
import {authHeader} from "../authProcessing";
import {IReviews} from "../../containers/Review/ReviewMaster";

let baseURL;
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3000'
} else {
    baseURL = 'https://db-clockware.herokuapp.com'
}
axios.defaults.baseURL = baseURL;

type ServerGetResponseType = IMaster[] | ICity[] | string;
export const getServerRequest = async (relativeURL: string): Promise<ServerGetResponseType> => {
    try {
        const {data} = await axios.get(relativeURL);
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

type ServerPostRequestBodyType = IAuthUser | ISendOrder | { orderId: number, rating: number, review: string };
type ServerPostResponseType = TAuthUser;

export const postServerRequest = async (
    relativeURL: string, body: ServerPostRequestBodyType): Promise<ServerPostResponseType> => {
    try {
        const {data} = await axios.post(relativeURL, body);
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

type PostAuthServerRequestBodyType = IMaster | ICity | IClient;
export const postAuthServerRequest = async (relativeURL: string, body: PostAuthServerRequestBodyType) => {
    try {
        const { data } = await axios.post(relativeURL, body, { headers: authHeader() });
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

type GetAuthServerResponseType = IClient[] | IMaster[] | IOrderPac | IReviews[];
export const getAuthServerRequest = async (relativeURL: string): Promise<GetAuthServerResponseType> => {
    try {
        const { data } = await axios.get(relativeURL, { headers: authHeader() });
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

type PutAuthServerRequestBodyType = IMaster | ICity | IClient;
export const putAuthServerRequest = async (relativeURL: string, body: PutAuthServerRequestBodyType) => {
    try {
        const { data } = await axios.put(relativeURL, body, { headers: authHeader() });
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

export const deleteAuthServerRequest = async (relativeURL: string) => {
    try {
        const { data } = await axios.delete(relativeURL, { headers: authHeader() });
        return data;
    } catch (err) {
        throw new Error(err);
    }
};