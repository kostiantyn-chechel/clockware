import axios from 'axios';
import {ICity, IMaster} from "../../interfaces";
// import {ICity} from "../../interfaces";


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


// export const postServerRequest = async (relativeURL: string, body) => {
//     try {
//         const { data } = await axios.post(relativeURL, body);
//         if (data.isError) {
//             throw data.data;
//         }
//         return data;
//     } catch (err) {
//         throw new Error(err);
//     }
// };

// export const getCityList = async () => { await axios.get<AxiosResponse<ICity[]>>('/cities').then(res => res.data)};
// //
// // export const getCityList = async () => {
// //     try {
// //         const { data } = await axios.get('/cities');
// //         return data;
// //     } catch (err) {
// //         throw new Error(err);
// //     }
// // };