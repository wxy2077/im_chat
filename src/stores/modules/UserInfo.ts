

import {ref} from 'vue'
import {defineStore}  from "pinia";


export const useUserInfo = defineStore('UserInfo', () => {

    const userInfo = ref({
        name: '卡卡罗特',
        avatar: 'https://avatars.githubusercontent.com/u/33140097',
        userId: 1,
        time: '2022-12-12 12:12:12',
    })
    return {userInfo}
})