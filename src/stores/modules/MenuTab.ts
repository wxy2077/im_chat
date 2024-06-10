

import {defineStore}  from "pinia";

export const useMenuTab = defineStore('useMenuTab', {

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