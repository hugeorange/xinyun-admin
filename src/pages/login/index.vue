<template>
  <div class="login-container">
    <el-card class="w-100 bg-transparent rounded-4%">
      <h2 class="text-center">芯云纵横机台管理系统</h2>
      <el-form
        ref="loginFormRef"
        :model="loginData"
        :rules="loginRules"
        class="login-form">
        <el-form-item prop="username">
          <div class="p-2">
            <el-icon>
              <User />
            </el-icon>
          </div>
          <el-input
            ref="username"
            v-model="loginData.username"
            class="flex-1"
            size="large"
            placeholder=""
            name="username" />
        </el-form-item>

        <el-tooltip
          :disabled="isCapslock === false"
          content="Caps lock is On"
          placement="right">
          <el-form-item prop="password">
            <span class="p-2">
              <el-icon>
                <Lock />
              </el-icon>
            </span>
            <el-input
              v-model="loginData.password"
              class="flex-1"
              :type="passwordVisible === false ? 'password' : 'input'"
              size="large"
              name="password"
              @keyup.enter="handleLogin" />
            <span
              class="mr-2 cursor-pointer"
              @click="passwordVisible = !passwordVisible">
              <el-icon>
                <View v-if="passwordVisible" />
                <Hide v-if="!passwordVisible" />
              </el-icon>
            </span>
          </el-form-item>
        </el-tooltip>
        <el-button
          :loading="loading"
          type="primary"
          class="w-full"
          size="large"
          @click.prevent="handleLogin"
          >登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { ElForm, ElMessage } from 'element-plus'
import { User, Lock, View, Hide, CircleCheck } from '@element-plus/icons-vue'
import { loginApi } from '../../apis/user.js'
import router from '../../router'

// /**
//  * 按钮loading
//  */
const loading = ref(false)
// /**
//  * 是否大写锁定
//  */
const isCapslock = ref(false)
// /**
//  * 密码是否可见
//  */
const passwordVisible = ref(false)

// /**
//  * 登录表单引用
//  */
const loginFormRef = ref(ElForm)

const loginData = ref({
  username: '',
  password: '',
})

const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: 'blur',
        message: `请输入用户名`,
      },
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        message: `请输入密码`,
      },
    ],
    verifyCode: [
      {
        required: true,
        trigger: 'blur',
        message: `请输入验证码`,
      },
    ],
  }
})

/**
 * 登录
 */
function handleLogin() {
  loginFormRef.value.validate(valid => {
    if (valid) {
      loading.value = true
      loginApi(loginData.value)
        .then(res => {
          ElMessage.success('登录成功')
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          router.push('/')
        })
        .catch(err => {
          ElMessage.error(err.msg ?? '登录失败')
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  background: url('@/assets/images/login-bg.jpg') no-repeat center right;

  .login-form {
    padding: 30px 10px;

    .captcha {
      position: absolute;
      top: 0;
      right: 0;

      img {
        width: 120px;
        height: 48px;
        cursor: pointer;
      }
    }
  }
}

.el-form-item {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    input:-webkit-autofill {
      transition: background-color 5000s ease-in-out 0s;
      /* 通过延时渲染背景色变相去除背景颜色 */
    }
  }
}
</style>
