import {
    SET_OPEN_MENU
} from '../actionType/appActionType';

export const setOpenMenu = (open: boolean) => ({ type: SET_OPEN_MENU, payload: open});