<template>
  <template v-if="currRoute.meta.full">
    <router-view></router-view>
  </template>

  <template v-if="!currRoute.meta.full">
    <SideBar />
    <div class="app-main">
      <Header></Header>
      <div class="page-main">
        <!-- <div class="pt-4 bg-[#F0F2F5]"></div> -->
        <router-view></router-view>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import SideBar from "./sidebar.vue";
import Header from "./header.vue";
import { useRoute } from "vue-router";

const currRoute = useRoute();
</script>

<style scoped lang="scss">
.app-main {
  margin-left: 210px;

  .page-main {
    padding-top: 68px;
    // min-height: 100vh;
    // background-color: #fff;
    margin: 0 16px;
  }
}
</style>
