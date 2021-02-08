import {
    deleteAuthServerRequest,
    getServerRequest,
    postAuthServerRequest,
    putAuthServerRequest
} from "../../helpers/axios/axiosClockwareAPI";
import { FETCH_CITIES } from "../actionType/adminActionType";
import { showError } from "./orderAction";
import { ICity } from "../../interfaces";

export const fetchCities = () => {
    return async (dispatch: any) => getServerRequest('/cities')
        .then(cities => dispatch({ type: FETCH_CITIES, payload: cities }))
        .catch(() => dispatch(showError()));
};

export const addCity = (city: ICity) => {
    return async (dispatch: any) => postAuthServerRequest('/cities', city)
        .then(() => dispatch(fetchCities()))
        .catch(() => dispatch(showError()));
};

export const editCity = (city: ICity) => {
    return async (dispatch: any) => putAuthServerRequest(`/cities/${city.id}`, city)
        .then(() => dispatch(fetchCities()))
        .catch(() => dispatch(showError()));
};

export const deleteCity = (cityId: number) => {
    return async (dispatch: any) => deleteAuthServerRequest(`/cities/${cityId}`)
        .then(() => dispatch(fetchCities()))
        .catch(() => dispatch(showError()));
};