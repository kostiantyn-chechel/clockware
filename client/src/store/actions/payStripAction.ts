import {getServerRequest} from "../../helpers/axios/axiosClockwareAPI";
import {PAY_STRIP_TEST} from "../actionType/payStripActionType";

export const reqPAyStrip = () => {
    return async (dispatch: any) => getServerRequest('pay/strip')
        .then(res => dispatch({ type: PAY_STRIP_TEST, payload: res }))
};