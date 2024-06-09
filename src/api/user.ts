import { request } from '@/utils/request'

export function userLogin(params?: any, data?: any) {
    return request({ url: '/api/v1/user/login', method: 'post', params, data })
}
