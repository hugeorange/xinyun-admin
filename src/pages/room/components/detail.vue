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
    :title="isNew ? '新建机台' : '机台详情'">
    <el-form :model="form" ref="ruleFormRef" :rules="rules" label-position="top">
      <el-row>
        <el-form-item v-if="!isNew" label="机台编号" prop="name" class="mr-6 w-68">
          <el-input v-model="form.id" disabled />
        </el-form-item>
        <el-form-item label="机台名称" prop="account" class="w-68">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="机台状态" prop="status" class="mr-6 w-68">
          <el-select v-model="form.status">
            <el-option label="正常" value="online" />
            <el-option label="下线" value="offline" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark" class="mr-6 w-68">
          <el-input v-model="form.remark" />
        </el-form-item>
      </el-row>
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
import { addMachineApi, updateMachineApi } from '@/apis/machine'
import { FormRules, FormInstance, ElMessage } from 'element-plus'
import { reactive, ref, watchEffect } from 'vue'

const { row, onSuccess } = defineProps<{ row?: any; onSuccess?: Function }>()
// 是否是新建
const isNew = ref(!row)

const dialogFormVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const loading = ref(false)
const form = reactive({
  id: '',
  name: '',
  status: 'online',
  remark: '',
})
watchEffect(() => {
  if (row) {
    form.id = row.id
    form.name = row.name
    form.status = row.status
    form.remark = row.remark
  }
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户名称', trigger: 'change' }],
  status: [{ required: true, message: '请选择用户状态', trigger: 'change' }],
})

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      row.id ? updateRoomInfo() : addRoomInfo()
    } else {
      console.log('error submit!', fields, form)
    }
  })
}

const addRoomInfo = () => {
  loading.value = true
  addMachineApi({
    name: form.name,
    status: form.status,
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

const updateRoomInfo = () => {
  loading.value = true
  updateMachineApi({
    machine_id: row.id,
    name: form.name,
    remark: form.remark,
    status: form.status,
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
