<template>
  <template v-if="!item.children">
    <el-menu-item :index="getPath(item.path)">
      <router-link class="w-full" :to="getPath(item.path)">
        <div>
          <el-icon v-if="!!item.icon">
            <component :is="item.icon"></component>
          </el-icon>
          <span :class="!item.icon && 'ml-2'">{{ item.name }}</span>
        </div>
      </router-link>
    </el-menu-item>
  </template>
  <template v-else>
    <el-sub-menu :index="item.path" teleported>
      <template #title>
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <menu-item v-for="v in item.children" :item="v" :basePath="item.path" />
    </el-sub-menu>
  </template>
</template>
<script setup lang="ts">
const prop = defineProps({
  item: { required: true, type: Object },
  basePath: { required: false, type: String },
});
const getPath = (path: string) => prop.basePath ? `${prop.basePath}/${path}` : path;
</script>