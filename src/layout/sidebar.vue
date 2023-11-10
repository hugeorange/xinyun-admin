<template>
  <div class="left-side">
    <router-link to="/">
      <div class="logo">
        <el-icon color="#409EFF">
          <Platform />
        </el-icon>
        <span class="text-primary ml-1">机台管理系统</span>
      </div>
    </router-link>
    <el-menu active-text-color="#409EFF" background-color="#fff" :default-active="currRoute.path" unique-opened>
      <menu-item v-for="v in menus" :item="v" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { Platform } from "@element-plus/icons-vue";
import MenuItem from './menuItem.vue'
import { menus } from '../router/index'
import { useRoute } from 'vue-router';

const currRoute = useRoute()



</script>

<style scoped lang="scss">
.left-side {
  user-select: none;
  width: 210px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;

  .logo {
    padding: 8px;
    margin-top: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;

  }

  .el-menu {
    border-right: none;
  }


}
</style> 



