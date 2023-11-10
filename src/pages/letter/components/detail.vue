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
    title="模板详情">
    <el-form
      :model="form"
      ref="ruleFormRef"
      :rules="rules"
      label-position="top">
      <el-row>
        <el-form-item label="模板编号" prop="name" class="mr-6 w-68">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="模板名称" prop="account" class="w-68">
          <el-input v-model="form.account" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="模板状态" prop="status" class="mr-6 w-68">
          <el-select v-model="form.status">
            <el-option label="Test1 (机台1)" value="shanghai" />
            <el-option label="Test2 (机台2)" value="beijing" />
            <el-option label="Test3 (机台3)" value="深圳" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="常用联系人" prop="contact" class="mr-6 w-68">
          <el-input v-model="form.contact" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phone" class="w-68">
          <el-input v-model="form.phone" />
        </el-form-item>
      </el-row>
      <el-form-item label="客户备注" prop="remark" class="w-96">
        <el-input v-model="form.remark" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { FormRules, FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

const { row } = defineProps<{ row?: any }>()
// 是否是新建
const isNew = ref(!!row)

const dialogFormVisible = ref(false)
const ruleFormRef = ref<FormInstance>()

const form = reactive({
  name: '',
  account: '',
  status: '',
  role: '',
  contact: '',
  phone: '',
  remark: '',
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户名称', trigger: 'change' }],
  account: [{ required: true, message: '请输入用户账号', trigger: 'change' }],
  status: [{ required: true, message: '请选择用户状态', trigger: 'change' }],
  role: [{ required: true, message: '请选择用户角色', trigger: 'change' }],
  contact: [{ required: true, message: '请输入常用联系人', trigger: 'change' }],
  phone: [{ required: true, message: '请输入联系方式', trigger: 'change' }],
  remark: [{ required: true, message: '请输入用户备注', trigger: 'change' }],
})

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields, form)
    }
  })
}
</script>
<style scoped></style>
