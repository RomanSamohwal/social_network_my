import * as axios from 'axios';


const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {'API-KEY': '57225c64-6423-4dda-aa40-afe6f3f91875'}
    }
);


export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
        ).then(response => {
            return response.data
        })
    },
    follow(userId) {
        return instance.post(`follow/${userId}`
            , {},)

    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getUsersFriends() {
        return instance.get('users?friend=true').then(res => res.data.items)
    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status})
    },
    savePhoto(photoFile) {
        let formData = new FormData();
        formData.append('image', photoFile)
        return instance.put(`profile/photo/`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`, {withCredentials: true})
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },

    logout() {
        return instance.delete(`auth/login`)
    },

};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    },
};

export const dialogAPI = {
    getDialog() {
        return instance.get('dialogs').then(res => res.data)
    },
    startDialog(userId) {
        return instance.put(`dialogs/${userId}`).then(res => res.data)
    },
    getMessage(userId) {
        return instance.get(`dialogs/${userId}/messages`).then(res => ({
            messages: res.data.items,
            totalCount: res.data.totalCount
        }))
    },
    sendMessage(userId, body) {
        return instance.post(`dialogs/${userId}/messages`, {body}).then(res => res.data)
    },
    getNewMessagesCount() {
        return instance.get(`dialogs/messages/new/count`).then(res => res.data)
    },
    getMessagesNewerThen(userId, data) {
        return instance.get(`dialogs/${userId}/messages/newerThen?=${data}`).then(res => res.data)
    },
    deleteMessage(messageId) {
        return instance.delete(`dialogs/messages/${messageId}`).then(res => res.data)
    },

}