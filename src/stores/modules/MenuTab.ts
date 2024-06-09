

import {defineStore}  from "pinia";

export const menuTab = defineStore('menuTab', {

    state: () => {
        return {
            count: 991,
            showMenu: false,
        }
    },
    actions: {
        transShowMenu() {
            this.showMenu = !this.showMenu
        }
    },
})