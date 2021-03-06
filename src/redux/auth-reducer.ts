import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form"

const SET_USER_DATA = 'network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'network/auth/GET_CAPTCHA_URL';

let initialState = {
    "id": null as number | null,
    "login": null as string | null,
    "email": null as string | null,
    //залогинен да либо нет
    isAuth: false as boolean,
    isFetching: false as boolean,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            };
        default :
            return state;
    }
};

type SetAuthUserDataActionPayloadType = {
    "id": number | null
    "login": string | null
    "email": string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => (
    {
        type: SET_USER_DATA, payload: {id, email, login, isAuth}
    }
);

export const getCaptchaUrlSuccess = (captchaUrl: string | null) => (
    {
        type: GET_CAPTCHA_URL, payload: {captchaUrl}
    }
);

export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
};

export const Logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};

export const getLogin = (email: string | null, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
};

export default authReducer;