import { defineStore } from 'pinia'

export const useMenuTab = defineStore('useMenuTab', {
  state: () => {
    return {
      active: 'chat-list',
      showMenu: false
    }
  },
  actions: {
    transShowMenu() {
      this.showMenu = !this.showMenu
    }
  }
})
