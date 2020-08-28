import {dialogAPI} from '../api/api';
import exp from 'constants';

const SEND_MESSAGE_SUCCESS = 'network/dialog-reducer/SEND_MESSAGE'
const GET_DIALOGS_SUCCESS = 'network/dialog-reducer/GET_DIALOGS_SUCCESS'
const PUT_UP_DIALOG_SUCCESS = 'network/dialog-reducer/PUT_UP_DIALOG'
const GET_MESSAGE_SUCCESS = 'network/dialog-reducer/GET_MESSAGE_SUCCESS'
const SET_CURRENT_DIALOG_SUCCESS = 'network/dialog-reducer/SET_CURRENT_DIALOG'
const SET_NEW_MESSAGES_COUNT_SUCCESS = 'network/dialog-reducer/SET_NEW_MESSAGES_COUNT_SUCCESS'
const SET_HAS_NEW_MESSAGES_SUCCESS = 'network/dialog-reducer/SET_HAS_NEW_MESSAGES_SUCCESS'
const SET_NEED_REFRESH_SUCCESS = 'network/dialog-reducer/SET_NEED_REFRESH_SUCCESS'
const SET_FETCHING_SUCCESS = 'network/dialog-reducer/SET_FETCHING_SUCCESS'

/*
type DialogType = {
    id: number
    name: string
}
*/

/*type MessageType = {
    id: number
    message: string
}*/

let initialState = {
    messages: [],
    dialogs: [],
    selectedDialogId: null,
    newMessagesCount: 0,
    needRefresh: false,
    currentDialogMessagesCount: 0,
    fetching: true
};

/*export type initialStateType = typeof initialState*/
const update = (state: any, action: any) => ({...state, ...action.payload})

const dialogsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_DIALOGS_SUCCESS:
        case SET_CURRENT_DIALOG_SUCCESS:
        case GET_MESSAGE_SUCCESS:
            return {...state, ...action.payload}
        case SEND_MESSAGE_SUCCESS: {
            return {...state, messages: [...state.messages, action.message]}
        }
        case SET_NEW_MESSAGES_COUNT_SUCCESS:
            return {...state, newMessagesCount: action.count}
        case SET_NEED_REFRESH_SUCCESS:
            return {...state, needRefresh: action.needRefresh}
        case SET_HAS_NEW_MESSAGES_SUCCESS:
            return {
                ...state,
                dialogs: state.dialogs.map(d => {
                    //@ts-ignore
                    if (d.id == action.userId) {
                        //@ts-ignore
                        return {...d, hasNewMessages: action.hasNewMessages}
                    } else return d
                })
            }

        case PUT_UP_DIALOG_SUCCESS: {
            return {
                // @ts-ignore
                ...state, dialogs: [state.dialogs.find(d => d.id == action.userId),
                    // @ts-ignore
                    ...state.dialogs.filter(d => d.id != action.userId)]
            }
        }

        case SET_FETCHING_SUCCESS: {
            return {...state, fetching: !state.fetching}
        }

        default:
            return state;
    }
};

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE_SUCCESS
    newMessageBody: string
}

export const getDialogsSuccess = (dialogs: any) => ({type: GET_DIALOGS_SUCCESS, payload: {dialogs}})
export const putUpDialogSuccess = (userId: any) => ({type: PUT_UP_DIALOG_SUCCESS, userId})
export const getMessagesSuccess = (messages: any, totalCount: any)=> ({type: GET_MESSAGE_SUCCESS, payload: {messages, currentDialogMessagesCount: totalCount}})
export const setCurrentDialogSuccess = (selectedDialogId: any) => ({type: SET_CURRENT_DIALOG_SUCCESS,  payload: {selectedDialogId}})
export const sendMessageSuccess = (message: any) => ({type: SEND_MESSAGE_SUCCESS, message})
export const setNewMessagesCountSuccess = (count: any)=>({type: SET_NEW_MESSAGES_COUNT_SUCCESS, count})
export const setHasNewMessagesSuccess = (userId: any,hasNewMessages: boolean )=>({type: SET_HAS_NEW_MESSAGES_SUCCESS, userId,hasNewMessages})
export const setNeedRefreshSuccess = (needRefresh: any)=>({type: SET_NEED_REFRESH_SUCCESS, needRefresh})
export const setFetchingSuccess = () => ({type: SET_FETCHING_SUCCESS})

export const getDialogs = () => async (dispatch: any) => {
    // @ts-ignore
    let dialogs = await dialogAPI.getDialog()
    dispatch(getDialogsSuccess(dialogs))
}

export const getMessages = (userId: any) => async (dispatch: any) => {
    // @ts-ignore
    let result = await dialogAPI.getMessage(userId)
    // @ts-ignore
    if ( result.messages.some(m => !m.viewed)) {
        dispatch(setNeedRefreshSuccess(true))
    }
    dispatch(getMessagesSuccess(result.messages, result.totalCount))
    dispatch(setHasNewMessagesSuccess(userId, false))
}


export const sendMessage = (userId: any, body: any) => async (dispatch: any) => {
    // @ts-ignore
    let res = await dialogAPI.sendMessage(userId, body)
    dispatch(sendMessageSuccess(res.data.message))
    dispatch(putUpDialogSuccess(userId))
}


export const startDialog = (userId: any) => async (dispatch: any, getState: any) => {
    await dialogAPI.startDialog(userId)
    // @ts-ignore
    let dialog = getState().dialogsPage.dialogs.find(d => d.id == userId)
    if (dialog) {
        dispatch(putUpDialogSuccess(userId))
    } else {
        dispatch(getDialogs())
    }
}

export const init = (userId: any) => async (dispatch: any) => {
    if (!!userId) {
        dispatch(setFetchingSuccess())
        dispatch(getMessages(userId))
        dispatch(setCurrentDialogSuccess(userId))
        await dispatch(startDialog(userId))
        dispatch(setFetchingSuccess())
        dispatch(getDialogs())
    } else {
        dispatch(getDialogs())
        dispatch(setFetchingSuccess())
    }
}

export const updateDialog = (userId: any) => (dispatch: any) => {
    if (!!userId) {
        dispatch(getMessages(userId))
        dispatch(setCurrentDialogSuccess(userId))
    } else {  dispatch(setFetchingSuccess())
        dispatch(setCurrentDialogSuccess(null))
    }
}

export const getNewMessagesCount = () => async (dispatch: any, getSate: any) => {
    let state = getSate()
    let count = await dialogAPI.getNewMessagesCount()
    if (state.newMessagesCount !== count || state.needRefresh) {
        dispatch(setNeedRefreshSuccess(false))
        dispatch(setNewMessagesCountSuccess(count))
        dispatch(getDialogs())
        if (state.selectedDialogId != null) {
            dispatch(getMessages(state.selectedDialogId))
        }
    }
}

export default dialogsReducer;