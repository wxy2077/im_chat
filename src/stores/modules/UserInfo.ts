

import {defineStore}  from "pinia";
import {userInfo} from '@/api/user'

export const useUserInfo = defineStore('useUserInfo', {

    state() {
        return {
           userInfo: {}
        }
    },

    actions: {
        async fetchUserInfo() {
            const response = await userInfo();
            if (response.success) {
                localStorage.setItem("user", JSON.stringify(response.data))
                this.userInfo = response.data
            }
        }
    }

})