import axios from 'axios';
import {
    IAuthUser,
    ICity,
    IClient,
    IFilterData,
    IMaster, IMasterOrder,
    IOrderPac,
    ISendOrder,
    IUser, TOrderStatus,
} from "../../interfaces";
import { authHeader } from "../authProcessing";
import { IReviews } from "../../containers/Review/ReviewMaster";
import { CityMasterType, IChartDateOrder } from "../../containers/Admin/AdminDashboard";

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
export type ServerPostResponseType = IUser & {message?: string};

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

export type ChartDataType = {
    listDateOrder: IChartDateOrder[]
    listCityCount: {
        cityId: number
        count: number
        order_city: {
            name: string
        }
    }[]
    listMasterCount: {
        masterId: number
        count: number
        order_master: {
            name: string
        }
    }[]
    listMasterData: {}[]
    listMastersTablesData: {
        id: number
        name: string
        master_orders: {
            hours: number
            count: number
        }[]
        rating: number
        status: string
    }[]
}
type GetAuthServerResponseType = IClient[] | IMaster[] | IOrderPac | IReviews[] | IFilterData[] | CityMasterType[] |
                                    ChartDataType | IMasterOrder[];
export const getAuthServerRequest = async (relativeURL: string): Promise<GetAuthServerResponseType> => {
    try {
        const { data } = await axios.get(relativeURL, { headers: authHeader() });
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

type PutAuthServerRequestBodyType = IMaster | ICity | IClient | {orderId: number, status: TOrderStatus};
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