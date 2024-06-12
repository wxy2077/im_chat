import { request } from '@/utils/request'

export function userLogin(params?: any, data?: any) {
    return request({ url: '/api/v1/user/login', method: 'post', params, data })
}

export function userInfo() {
    return request({ url: '/api/v1/user/info', method: 'get'})
}

export function getFriendList() {
    return request({ url: '/api/v1/user/friend', method: 'get'})
}

export function getMessage(params?: any) {
    return request({ url: '/api/v1/user/message', method: 'get', params})
}
