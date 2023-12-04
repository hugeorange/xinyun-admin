<template>
  <el-button text @click="dialogFormVisible = true">
    <slot></slot>
  </el-button>

  <el-dialog
    v-if="dialogFormVisible === true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    v-model="dialogFormVisible"
    :title="isNew ? '新建用户' : '用户详情'">
    <el-form :model="form" ref="ruleFormRef" :rules="rules" label-position="top">
      <el-row>
        <el-form-item label="用户名称" prop="username" class="mr-6 w-68">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="用户账号" prop="username" class="w-68">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="用户密码" prop="password" class="w-68">
          <el-input v-model="form.password" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="用户状态" prop="is_lock" class="mr-6 w-68">
          <el-select v-model="form.is_lock">
            <el-option label="正常" value="false" />
            <el-option label="锁定" value="true" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role" class="w-68">
          <el-select v-model="form.role">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="常用联系人" prop="contact_user" class="mr-6 w-68">
          <el-input v-model="form.contact_user" />
        </el-form-item>
        <el-form-item label="联系方式" prop="contact_type" class="w-68">
          <el-input v-model="form.contact_type" />
        </el-form-item>
      </el-row>
      <el-form-item label="用户备注" prop="remark" class="w-96">
        <el-input v-model="form.remark" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit(ruleFormRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { FormRules, FormInstance, ElMessage } from 'element-plus'
import { reactive, ref, watchEffect } from 'vue'
import { registerApi } from '@/apis/user'

const { row, onSuccess } = defineProps<{ row?: any; onSuccess?: Function }>()
// 是否是新建
const isNew = ref(!row)

const loading = ref(false)
const dialogFormVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
console.log('row-->', row)
const form = reactive({
  username: '',
  password: '',
  is_lock: 'false',
  role: 'admin',
  contact_user: '',
  contact_type: '',
  remark: '',
})

watchEffect(() => {
  if (row) {
    form.username = row.username
    form.password = row.password
    form.is_lock = row.is_lock
    form.role = row.role
    form.contact_user = row.contact_user
    form.contact_type = row.contact_type
    form.remark = row.remark
  }
})

const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户账号', trigger: 'change' }],
  password: [{ required: true, message: '请输入用户密码', trigger: 'change' }],
  is_lock: [{ required: true, message: '请选择用户状态', trigger: 'change' }],
  role: [{ required: true, message: '请选择用户角色', trigger: 'change' }],
  contact_user: [{ required: true, message: '请输入常用联系人', trigger: 'change' }],
  contact_type: [{ required: true, message: '请输入联系方式', trigger: 'change' }],
  remark: [{ required: false, message: '请输入用户备注', trigger: 'change' }],
})

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', form)
      addUserApi()
    } else {
      console.log('error submit!', fields, form)
    }
  })
}

const addUserApi = () => {
  loading.value = true
  registerApi({
    username: form.username,
    password: form.password,
    password_confirm: form.password,
    is_lock: form.is_lock,
    role: form.role,
    contact_user: form.contact_user,
    contact_type: form.contact_type,
    remark: form.remark,
  })
    .then(res => {
      ElMessage.success(res.msg)
      dialogFormVisible.value = false
      onSuccess?.()
    })
    .catch(err => {
      console.log(err)
      ElMessage.error(err.msg)
    })
    .finally(() => (loading.value = false))
}
</script>
<style scoped></style>
