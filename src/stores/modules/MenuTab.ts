

import {defineStore}  from "pinia";

export const useMenuTab = defineStore('useMenuTab', {

    state: () => {
        return {
            showMenu: false,
        }
    },
    actions: {
        transShowMenu() {
            this.showMenu = !this.showMenu
        }
    },
})