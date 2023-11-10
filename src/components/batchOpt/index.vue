<template>
  <el-dropdown>
    <el-button>批量操作</el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in props.list" @click="item.onClick">
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
type Topt = {
  name: string;
  onClick: () => void;
};
const props = defineProps<{ list: Array<Topt> }>();
</script>
