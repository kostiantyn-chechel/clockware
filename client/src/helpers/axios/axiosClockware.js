import axios from 'axios';
import { authHeader } from '../authProcessing';

let baseURL;
if (process.env.NODE_ENV === 'development') { baseURL = 'http://localhost:3000'}
else { baseURL = 'https://db-clockware.herokuapp.com'}
axios.defaults.baseURL = baseURL;

// export const getServerRequest = async (relativeURL) => {
//     try {
//         const { data } = await axios.get(relativeURL);
//         if (data.isError) {
//             throw data.data;
//         }
//         return data;
//     } catch (err) {
//         throw new Error(err);
//     }
// };

// export const postServerRequest = async (relativeURL, body) => {
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

// export const postAuthServerRequest = async (relativeURL, body) => {
//     try {
//         const { data } = await axios.post(relativeURL, body, { headers: authHeader() });
//         if (data.isError) {
//             throw data.data;
//         }
//         return data;
//     } catch (err) {
//         throw new Error(err);
//     }
// };

export const getAuthServerRequest = async (relativeURL) => {
    try {
        const { data } = await axios.get(relativeURL, { headers: authHeader() });
        if (data.isError) {
            throw data.data;
        }
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

export const putAuthServerRequest = async (relativeURL, body) => {
    try {
        const { data } = await axios.put(relativeURL, body, { headers: authHeader() });
        if (data.isError) {
            throw data.data;
        }
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

export const deleteAuthServerRequest = async (relativeURL) => {
    try {
        const { data } = await axios.delete(relativeURL, { headers: authHeader() });
        if (data.isError) {
            throw data.data;
        }
        return data;
    } catch (err) {
        throw new Error(err);
    }
};