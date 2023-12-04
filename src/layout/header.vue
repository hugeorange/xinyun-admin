<template>
  <div class="page-header bg-primary">
    <el-dropdown class="ml-auto">
      <span class="mx-2">
        <el-avatar :icon="UserFilled" />
        <span class="mx-2 text-white">七尾</span>
        <el-icon>
          <arrow-down class="text-white" />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogOut">注销登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { UserFilled, ArrowDown } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import router from '../router/index'

import { logoutApi } from '../apis/user'
import { removeToken } from '@/utils'
const handleLogOut = () => {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    logoutApi()
      .then(() => {
        ElMessage.success('注销成功')
        removeToken()
        window.location.replace('/')
      })
      .catch(() => {
        ElMessage.error('注销失败')
      })
  })
}
</script>

<style scoped lang="scss">
.page-header {
  position: fixed;
  left: 210px;
  right: 0;
  height: 52px;
  color: #fff;
  display: flex;
  align-items: center;
  z-index: 999;
}
</style>
