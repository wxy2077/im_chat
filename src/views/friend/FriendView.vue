<script setup lang="ts">
import {onMounted, onUnmounted, reactive} from 'vue'
import {useMenuTab} from '@/stores/modules/MenuTab'

import {getFriendList} from "@/api/user";

import {pinyin} from 'pinyin-pro'
import {useRoute} from "vue-router";

const menuTabBar = useMenuTab()


const state = reactive({
  searchText: '',
  hotContacts: [{name: '新的朋友'}, {name: '仅聊天的朋友'}, {name: '群聊'}]
})

const alphabetList: string[] = [];
let firstNameList: Record<string, any[]> = reactive({})

onMounted(() => {
  menuTabBar.active = useRoute().path.slice(1)
  menuTabBar.transShowMenu()

  getFriendList().then((res: any) => {
    if (Array.isArray(res.data.list)) {
      res.data.list.forEach((item: any) => {
        const firstName = pinyin(item.username.charAt(0), {pattern: 'first'}).toUpperCase()
        if (!firstNameList[firstName]) {
          firstNameList[firstName] = []
        }
        firstNameList[firstName].push(item)
      })

      const sortedKeys = Object.keys(firstNameList).sort();
      const sortedFirstNameList: Record<string, any[]> = {};
      sortedKeys.forEach((key) => {
        alphabetList.push(key)
        sortedFirstNameList[key] = firstNameList[key];
      });
      firstNameList = reactive(sortedFirstNameList);
    }
  })

})

onUnmounted(() => {
  menuTabBar.transShowMenu()
})

</script>

<template>
  <van-nav-bar fixed placeholder title="好友" right-text="+"/>
  <van-search v-model="state.searchText" placeholder="搜索"/>
  <van-index-bar :index-list="alphabetList">
    <van-cell-group>
      <van-cell v-for="item in state.hotContacts" :key="item.name" :title="item.name"/>
    </van-cell-group>
    <template v-for="(groups, letter) in firstNameList" :key="letter">
      <van-index-anchor :index="letter" v-if="groups.length > 0"></van-index-anchor>
      <van-cell v-for="(item, key) in groups" :key="key">
        <template #right-icon>
          <van-image round class="user-item-img" :src="item.avatar"/>
          <span style="pannding-top: 5px; ">{{ item.username }}</span>
        </template>
      </van-cell>
    </template>
  </van-index-bar>
</template>
<style scoped>
.user-item-img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 10px;
}
</style>